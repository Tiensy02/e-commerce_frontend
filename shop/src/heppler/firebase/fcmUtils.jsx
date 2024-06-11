import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseConfig";
import { getLoggedInUser } from "../authUtils";
import { fetchJSON, fetchText } from "../api";
import { USER_API } from "../setting/apiConstant";


const DEFAULT_VAPID_KEY = 'BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4'
const ENDPOINT = 'https://fcmregistrations.googleapis.com/v1'
const DATABASE_NAME = 'firebase-messaging-database';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'firebase-messaging-store';
let dbPromise


const arrayToBase64 = array => {
    const uint8Array = new Uint8Array(array);
    const base64String = btoa(String.fromCharCode(...uint8Array));
    return base64String.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getHeaders({
    appConfig,
    installations
}) {
    const authToken = await installations.getToken();

    return new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-goog-api-key': appConfig.apiKey,
        'x-goog-firebase-installations-auth': `FIS ${authToken}`
    });
}

function getBody({
    p256dh,
    auth,
    endpoint,
    vapidKey
}) {
    const body = {
        web: {
            endpoint,
            auth,
            p256dh
        }
    };

    if (vapidKey !== DEFAULT_VAPID_KEY) {
        body.web.applicationPubKey = vapidKey;
    }

    return body;
}
function getEndpoint({ projectId }) {
    return `${ENDPOINT}/projects/${projectId}/registrations`;
}

async function requestGetToken(
    firebaseDependencies,
    subscriptionOptions
) {
    const headers = await getHeaders(firebaseDependencies);
    const body = getBody(subscriptionOptions);

    const subscribeOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    };

    let responseData;
    try {
        const response = await fetch(
            getEndpoint(firebaseDependencies.appConfig),
            subscribeOptions
        );
        responseData = await response.json();
    } catch (err) {
        console.log("errror")
    }

    if (responseData.error) {
        const message = responseData.error.message;
        console.log(message)
    }

    if (!responseData.token) {
        console.log("errror")
    }

    return responseData.token;
}


async function requestDeleteToken(
    firebaseDependencies,
    token
) {
    const headers = await getHeaders(firebaseDependencies);

    const unsubscribeOptions = {
        method: 'DELETE',
        headers
    };

    try {
        const response = await fetch(
            `${getEndpoint(firebaseDependencies.appConfig)}/${token}`,
            unsubscribeOptions
        );
        const responseData = await response.json();
        if (responseData.error) {
            const message = responseData.error.message;
            console.log(message)
        }
    } catch (err) {
        console.log("errror")
    }
}

function getDbPromise() {
    if (!dbPromise) {
        dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

            request.onerror = event => {
                reject(event.target.error);
            };

            request.onsuccess = event => {
                const db = event.target.result;
                resolve(db);
            };

            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (event.oldVersion === 0) {
                    db.createObjectStore(OBJECT_STORE_NAME);
                }
            };
        });
    }
    return dbPromise;
}
function getKey({ appConfig }) {
    return `clientGet! ${appConfig.appId}`;
}
async function dbSet(firebaseDependencies, tokenDetails) {
    const key = getKey(firebaseDependencies);
    const db = await getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    await tx.objectStore(OBJECT_STORE_NAME).put(tokenDetails, key);
    await tx.done;
    return tokenDetails;
}

async function getNewToken(firebaseDependencies, subscriptionOptions) {
    const token = await requestGetToken(firebaseDependencies, subscriptionOptions);
    const tokenDetails = {
        token,
        createTime: Date.now(),
        subscriptionOptions
    };
    await dbSet(firebaseDependencies, tokenDetails);
    return tokenDetails.token;
}

const createToken = async () => {
    getToken(messaging, { vapidKey: 'BHy2NoGMctqKYls5ct9DIDquqBKbKAG1cut9VakoevPfgqUnWfPWW4qmb12K8vdYBWzW0VwNJf9Iesf4MRLdAVY' }).then(currenToken => {
        console.log(currenToken)
    })
}

const handleLoginSuccess = async () => {
    const userCurrent = getLoggedInUser();
    let notificationSetting = userCurrent?.notificationSetting;

    if(notificationSetting == null ) {
        notificationSetting = {
            "email":userCurrent.userEmail
        }
    }

    const subscriptionOptions = await getSubscriptionOptions();
    const token = await getNewToken(messaging.firebaseDependencies, subscriptionOptions);

    console.log("new token ", token);
    
    notificationSetting = {...notificationSetting, "push-notification":token}    
    const data = {
        notificationSetting
    }
    
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

   fetchText(USER_API.UPDATE_NOTIFICATION_SETTING + userCurrent.userId,option).then((value)=> {
    const res = JSON.parse(value)
    userCurrent.notificationSetting = res
    localStorage.setItem("user", JSON.stringify(userCurrent))
   })

    
}
const handleLogoutSuccess = async (notificationSetting,userId) => {
    try {
        requestDeleteToken(messaging.firebaseDependencies, notificationSetting['push-notification'])
        notificationSetting = {...notificationSetting,"push-notification":""}
        const data = {
            notificationSetting
        }
        console.log(data);
        
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    
        await fetchJSON(USER_API.UPDATE_NOTIFICATION_SETTING + userId,option)

    } catch(error) {
        console.error(error)
    }
}

async function getSubscriptionOptions() {
    
    const subscription = await messaging.swRegistration.pushManager.getSubscription()
    
    

    const subscriptionOptions = {
        vapidKey: messaging.vapidKey,
        swScope: messaging.swRegistration.scope,
        endpoint: subscription.endpoint,
        auth: arrayToBase64(subscription.getKey('auth')),
        p256dh: arrayToBase64(subscription.getKey('p256dh'))
    };
    return subscriptionOptions
}

export { createToken, handleLoginSuccess, handleLogoutSuccess };


