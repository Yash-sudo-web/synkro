import React, { useEffect, useState,useRef } from 'react';
import iconuser from "../assets/user.png";
import addfriend from "../assets/addfriend.png";
import addfriendgreen from "../assets/addfriendgreen.png";
import search from "../assets/search.png";
import logout from "../assets/logout.png"
import axios from 'axios';
import Conversation from './Conversation';
import Message from './Message';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import "../index.css";

const Mainn = () => {

const userToken = document.cookie.split('=')[1];
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(userToken);
  const [currentConvo, setCurrentConvo] = useState(null);
  const [currentConvoHeader, setCurrentConvoHeader] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [Arrivalmessage, setArrivalmessage] = useState(null)
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef()

  useEffect(() => {

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/getUser/"+currentUser);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser]);
    

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

    // const getConvoHeader = async () => {
    //   const friendId = currentConvo.members.find((m) => m !== currentUser);
    //   try {
    //     const res = await axios.get(`http://localhost:5000/api/conversation/${currentConvo._id}`);
    //     setCurrentConvoHeader(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  
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
      <div className="flex items-center justify-center w-screen h-screen bg-[#18181b]">
        <div className="flex flex-col w-[85%] h-[90%] bg-[#101012] rounded-2xl">
          <div className="w-full h-1/8 relative border-b border-[#34343d] rounded-t-2xl flex items-center">
            <div className="absolute left-[4%] cursor-text w-[18%] h-[50%] bg-[#18181b] rounded-3xl flex flex-row items-center text-[#4d4d59] text-sm font-bold">
              <div className="absolute left-[7%]">
                <img
                  src={search}
                  style={{ width: "20px", height: "20px" }}
                ></img>
              </div>
              <p className="left-[19%] absolute">search</p>
            </div>
            <div className='text-white font-bold absolute right-[14%] w-[10%] h-[50%] bg-[#18181b] flex flex-row items-center cursor-pointer rounded-2xl'>
              <div className='absolute left-[12%]'><img src={addfriendgreen} style={{width:'24px',height:'24px'}}></img></div>
              <p className='absolute left-[35%]'>add friend</p>
            </div>
            <div
              className="absolute right-1/10 cursor-pointer"
              onClick={handleLogout}
            >
              <img className='ho' src={logout} style={{ width: "32px", height: "32px" }}></img>
            </div>
            <div className="absolute right-3/100 cursor-pointer">
              <Link to="/user">
                <img
                  className="rounded-3xl"
                  src={
                    user && user.profilePicture ? user.profilePicture : iconuser
                  }
                  style={{ width: "48px", height: "48px" }}
                ></img>
              </Link>
            </div>
          </div>
          <div className="w-full h-full rounded-b-2xl flex flex-row">
            <div className="w-1/4 h-full border-r border-[#34343d]">
              <p className="font-bold text-white text-4xl pt-[7%] pl-[15%]">
                chats
              </p>
              <div className="pt-[5%]">
                {conversations.map((conversation) => (
                  <div
                    className="pl-[13%]"
                    key={conversation.id}
                    onClick={() => setCurrentConvo(conversation)}
                  >
                    <Conversation
                      conversation={conversation}
                      currentUser={currentUser}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-3/4 h-full flex justify-center relative">
              {currentConvo?<div className="text-white">placeholder</div>:null}
              <div className={`w-[90%] bg-[#18181b] absolute rounded-2xl overflow-y-auto ${currentConvo ? 'h-[75%] top-[15%]' : 'h-[90%] top-[5%]'}`}>
                {currentConvo ? (
                  <>
                    {messages.map((message) => (
                      <Message
                        message={message}
                        own={message.sender === currentUser}
                      />
                    ))}
                    <textarea
                      className="w-[90%] h-[10vh] bg-white text-black"
                      placeholder="Type your message here"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 w-[10%] hover:bg-blue-300"
                    >
                      Send
                    </button>
                  </>
                ) : (
                  <div className="text-white text-6xl font-extrabold h-full w-full flex flex-col items-center justify-center">
                    <div className="animate-bounce tracking-tight flex flex-col items-center justify-center">
                      <p>Welcome to Synkro</p>
                      <p className="pt-4 text-[#a2fe65] text-2xl ">
                        Open a conversation to start chatting.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainn