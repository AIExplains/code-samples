// App.js
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  return (
    <div className="App">
      <header>
        <h1>React Firebase Chat</h1>
        {user ? <button onClick={signOut}>Sign Out</button> : null}
      </header>
      <main>
        {user ? (
          <ChatRoom db={db} user={user} />
        ) : (
          <SignIn signIn={signIn} />
        )}
      </main>
    </div>
  );
}

export default App;

/******************************************************/ 
// ChatRoom.js
import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';

function ChatRoom({ db, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const unsubscribe = db
      .collection('messages')
      .orderBy('createdAt')
      .limit(100)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(data);
      });

    return () => unsubscribe();
  }, [db]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    await db.collection('messages').add({
      text: newMessage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    });

    setNewMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} user={user} />
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;

/******************************************************/ 
// ChatMessage.js
import React from 'react';

function ChatMessage({ message, user }) {
  const { text, uid, photoURL, displayName } = message;
  const messageClass = uid === user.uid ? 'sent' : 'received';

  return (
    <li className={`message ${messageClass}`}>
      <img src={photoURL || 'https://via.placeholder.com/50'} alt="Avatar" />
      <div>
        <p>{displayName}</p>
        <p>{text}</p>
      </div>
    </li>
  );
}

export default ChatMessage;


/******************************************************/ 
// SignIn.js
import React from 'react';

function SignIn({ signIn }) {
  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;