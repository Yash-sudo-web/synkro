import React, { useEffect, useState,useRef } from 'react';
import iconuser from "../assets/user.png";
import bg from "../assets/peakpx.jpg";
import axios from 'axios';
import Conversation from './Conversation';
import Message from './Message';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
const Main = () => {
  const userToken = document.cookie.split('=')[1];
  const [currentUser, setCurrentUser] = useState(userToken);
  const [currentConvo, setCurrentConvo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [Arrivalmessage, setArrivalmessage] = useState(null)
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef()

  useEffect(() => {
    socket.current=io('ws://localhost:5000');
    socket.current.on('getMessage', (data) => {
      setArrivalmessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  useEffect(() => {
    Arrivalmessage && currentConvo?.members.includes(Arrivalmessage.sender) && setMessages((prev) => [...prev, Arrivalmessage]);
  }, [Arrivalmessage, currentConvo]);


  useEffect(() => {
    socket.current.emit('addUser', currentUser);
    socket.current.on('getUsers', (users) => {
      console.log(users);
    });
  }, [currentUser]);
  
  

  const handleSubmit = async () => {
    const message = {
      sender: currentUser,
      text: newMessage,
      conversationId: currentConvo._id
    };

    const receiverId = currentConvo.members.find(member => member !== currentUser);

    socket.current.emit('sendMessage', {
      senderId: currentUser,
      receiverId,
      text: newMessage
    });

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
      
      <div className='flex items-center justify-center w-screen h-screen bg-[#18181b]'>
        <div className='flex items-start justify-start min-w-[85%] min-h-[95%] bg-[#101012]'>
          <div className='bg-[#101012] min-w-[25%] min-h-[95vh] border-r-2 border-[#18181b]'>
            <div className='bg-[#101012] min-w-[25%] min-h-[6vh] flex items-center'>
              <Link to='/user'><img src={iconuser} alt="User Icon" style={{ width: '48px', height: '48px' }}></img></Link>
            </div>
            <div className='text-white'>Searchbar</div>
            <div className='min-w-[25%] bg-[#0a0a0a]'>
              {conversations.map((conversation) => (
                <div key={conversation.id} onClick={() => setCurrentConvo(conversation)}>
                  <Conversation conversation={currentConvo} currentUser={currentUser} />
                </div>
              ))}
            </div>
          </div>
          <div className=' min-w-[75%] min-h-[95vh]'>
            
            <div className='flex flex-col' style={{ backgroundImage: `url(${bg})` }}>
          {currentConvo ? <>

          <div className='min-h-[88vh]'>
          {messages.map((message) => (
                  <Message message={message} own={message.sender === currentUser} />
              ))}
              <div className='flex justify-between mb-2' >
          <textarea 
          className='w-[90%] h-[10vh] bg-white text-black'
          placeholder='Type your message here'  
          onChange={(e)=>setNewMessage(e.target.value)}
          value={newMessage}  
            ></textarea>
            <button onClick={handleSubmit} className='bg-blue-500 w-[10%] hover:bg-blue-300'>Send</button>
          </div>
        </div>
          
          </> : <div className='text-white text-6xl h-[95vh] font-extrabold flex flex-col items-center justify-center'> <div className='animate-bounce tracking-tight flex flex-col items-center justify-center'><p>Welcome to Synkro</p><p className='pt-4 text-[#a2fe65] text-2xl '>Open a conversation to start chatting.</p></div></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
