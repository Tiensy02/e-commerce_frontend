import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routes from './routers/Router'
import { messaging } from './heppler/firebase/firebaseConfig'
import { getToken, onMessage } from "firebase/messaging"
import { useEffect } from 'react'

function App() {

  useEffect(() => { 
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
    getToken(messaging, {vapidKey: "BHy2NoGMctqKYls5ct9DIDquqBKbKAG1cut9VakoevPfgqUnWfPWW4qmb12K8vdYBWzW0VwNJf9Iesf4MRLdAVY"}).then(token => {
      console.log("token: " + token);
      
    });
    onMessage(messaging,(payload) => {
      console.log("Message received.", payload)
    })

  }, [])

  return (
   <>
   <BrowserRouter>
   <Routes></Routes>
   </BrowserRouter>
   </>
  )
}

export default App
