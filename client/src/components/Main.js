import React, { useEffect, useState } from 'react';
import iconuser from "../assets/user.png";
import axios from 'axios';
import Conversation from './Conversation';
import Message from './Message';

const Main = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [currentConvo, setCurrentConvo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const handleLogout = () => {
    document.cookie = 'token=; max-age=-60';
    window.location.href = '/';
  }
  const handleSubmit = async () => {
    const message = {
      sender: currentUser,
      text: newMessage,
      conversationId: currentConvo._id
    };

    const receiverId = currentConvo.members.find(member => member !== currentUser);

    try {
      const res = await axios.post('http://localhost:5000/api/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const getUserConversations = async () => {
      try {
        const userToken = document.cookie.split('=')[1];
        setCurrentUser(userToken);

        const response = await axios.get(`http://localhost:5000/api/conversation/${userToken}`);
        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUserConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/${currentConvo?._id}`);
        setMessages(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    if(currentConvo != null){getMessages();}
  }, [currentConvo]);


  return (
    <>
      <div>
        {/* <button onClick={handleLogout} className='w-[100px] h-[100px] bg-white'>Logout</button> */}
      </div>
      <div className='flex items-center justify-center w-screen h-screen bg-[#0a0a0a]'>
        <div className='flex items-start justify-start min-w-[85%] min-h-[95%] bg-black'>
          <div className='bg-black min-w-[25%] min-h-[95vh]'>
            <div className='bg-[#a2fe65] min-w-[25%] min-h-[6vh] flex items-center border-b-2'>
              <img src={iconuser} alt="User Icon" style={{ width: '48px', height: '48px' }}></img>
            </div>
            <div className='text-white border-b-2'>Searchbar</div>
            <div className='min-w-[25%] bg-[#0a0a0a]'>
              {conversations.map((conversation) => (
                <div key={conversation.id} onClick={() => setCurrentConvo(conversation)}>
                  <Conversation conversation={conversation} currentUser={currentUser} />
                </div>
              ))}
            </div>
          </div>
          <div className='bg-gray-500 min-w-[75%] min-h-[95vh]'>
          {currentConvo ? <>
          <div>
          {messages.map((message) => (
                  <Message message={message} own={message.sender === currentUser} />
              ))}</div>
          <div>
          <textarea 
          className='w-[100%] h-[10vh] bg-white text-black'
          placeholder='Type your message here'  
          onChange={(e)=>setNewMessage(e.target.value)}
          value={newMessage}  
            ></textarea>
            <button onClick={handleSubmit}>Send</button>
          </div>
          </> : <span className='text-white'>Open a conversation to start a chat.</span>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
