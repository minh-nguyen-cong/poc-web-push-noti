import './App.css';
import { requestForToken, onMessageListener } from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [token, setToken] = useState('');

  // Add a state to animate the bell icon
  const [newNotification, setNewNotification] = useState(false);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        setNotification({ title: payload.notification.title, body: payload.notification.body });
        setNewNotification(true);
        setTimeout(() => setNewNotification(false), 3000); // Reset animation state
        console.log('Received foreground message: ', payload);
      })
      .catch((err) => console.log('failed: ', err));
  }, []);

  const handleRequestPermission = () => {
    requestForToken()
      // The requestForToken function in firebase.js needs to be updated to return the token
      // For now, we assume it's been updated or we'll handle the token from the console log
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
        }
      })
      .catch((err) => console.log('Error getting token: ', err));
  };

  return (
    <div className="App">
      <div className="container">
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`bell-icon ${newNotification ? 'animate' : ''}`}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>

        <h1>Web Push Notifications</h1>
        <p className="subtitle">A Firebase Cloud Messaging PoC</p>

        {notification?.title && (
          <div className="card">
            <div className="notification-display">
              <h3>{notification.title}</h3>
              <p>{notification.body}</p>
            </div>
          </div>
        )}

        <button onClick={handleRequestPermission}>Enable Notifications</button>

        {token && (
          <div className="card">
            <div className="token-display">
              <p>Your FCM Token:</p>
              <code>{token}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;