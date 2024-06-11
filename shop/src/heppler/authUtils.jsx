import { isAliviableArray } from "./arrayUtils";
import { handleLogoutSuccess } from "./firebase/fcmUtils";
import { SSHOP_CONFIG } from "./setting/setting"
import moment from "moment";
/**
 * thực hiện set up thông tin login như token, thời gian tồn tại của token
 * @param {Object} data : {
 *  access_token: localStorage.getItem('AccessToken'),
      expires_time: new Date(localStorage.getItem('Expire')),
      refresh_token: localStorage.getItem('RefreshToken'),
      expires_in: localStorage.getItem('ExpireIn'),
 * }
 * @returns 
 */
const setLoggedIn = (data) => {
    if (!data) {
        localStorage.removeItem(SSHOP_CONFIG.storageUser.loggedInInfo)
        return
    }
    localStorage.setItem(SSHOP_CONFIG.storageUser.loggedInInfo, JSON.stringify(data))
}
/**
 * thực hiện set up user vào storage
 * @param {Object} user user được trả về từ backend
 * @returns 
 */
const setLoggedInUser = (user) => {
    if (!user) {
        localStorage.removeItem(SSHOP_CONFIG.storageUser.user)
        return
    }
    localStorage.setItem(SSHOP_CONFIG.storageUser.user, JSON.stringify(user))
}

const getLoggedInUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        return null;
    }
};

const getLoggedIn = () => {
    try {
        return JSON.parse(localStorage.getItem('loggedIn'));
    } catch {
        return null;
    }
};
/**
 * kiểm cha user đã được xác thực hay chưa
 * @returns {boolean}
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    const loggedInData = getLoggedIn();
  
    if (!user || !loggedInData) {
      return false;
    }
  
    return true;
  };

  /**
   * hàm thực hiện chuyển mã base64 từ payload của token về 1 đối tượng
   * @returns {Object}
   */
const getTokenPayload = () => {
    const loggedData = getLoggedIn();

    let tokenPayload = loggedData.access_token.split(".")[1];
    tokenPayload = tokenPayload.replace(/-/g,"+");
    tokenPayload = tokenPayload.replace(/_/g,"/");
    tokenPayload = atob(tokenPayload);
    return JSON.parse(tokenPayload);
}

/**
 * thực hiện lấy danh sách tên các quyền user được dùng từ permmissionRoles của user.
 * @returns {Array<String>}
 */
const getListRoles =()=> {
    const permissions = getLoggedInUser()?.permissions;
    if(!isAliviableArray(roles)) return []
    const roles = permissions.map(item => item?.name);
    return roles;
}

const logout = () => {
    const userCurrent = getLoggedInUser()
    const notificationSetting = userCurrent.notificationSetting
    handleLogoutSuccess(notificationSetting,userCurrent.userId);
    setLoggedIn(null)
    setLoggedInUser(null)
    location.href = "/";
}

export {logout, setLoggedIn, setLoggedInUser, getLoggedInUser, getLoggedIn, isUserAuthenticated, getTokenPayload, getListRoles }

