import React, { useEffect, useState,useRef } from 'react';
import iconuser from "../assets/user.png";
import close from "../assets/close.png"
import addfriendg from "../assets/addfriend.png"
import search from "../assets/search.png";
import logout from "../assets/logout.png"
import send from "../assets/send.png";
import axios from 'axios';
import Conversation from './Conversation';
import Message from './Message';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import "../index.css";


const Main = () => {

  const userToken = document.cookie.split('=')[1];
  const [friendopen, setfriendopen] = useState(false)
  const [profileopen, setprofileopen] = useState(false)
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(userToken);
  const [currentConvo, setCurrentConvo] = useState(null);
  const [currentConvoHeader, setCurrentConvoHeader] = useState(null);
  const [messages, setMessages] = useState([]);
  const [friend, setfriend] = useState(null)
  const [conversations, setConversations] = useState([]);
  const [Arrivalmessage, setArrivalmessage] = useState(null)
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef()
  const scrollRef = useRef();

  useEffect(() => {

    const getUser = async () => {
      try {
        const res = await axios.get("https://synkro-backend.azurewebsites.net/api/user/getUser/"+currentUser);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser]);
    
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    const addfriend = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("https://synkro-backend.azurewebsites.net/api/conversation", {
          senderId: currentUser,
          receiverId: friend,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      if(currentConvo == null){
        return;}
      const friendId = currentConvo.members.find((m) => m !== currentUser);
      const getUser = async () => {
        try {
          const res = await axios.get("https://synkro-backend.azurewebsites.net/api/user/getUser/"+friendId);
          setCurrentConvoHeader(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, [currentConvo]);
  
  const handleLogout = () => { 
    if (window.confirm("This action will log you out!!") === true) {
      document.cookie = 'token=; max-age=-60';
      window.location.href = '/';
    } else {
      return;
    }
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
      const res = await axios.post('https://synkro-backend.azurewebsites.net/api/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const getUserConversations = async () => {
      try { 
        const response = await axios.get(`https://synkro-backend.azurewebsites.net/api/conversation/${userToken}`);
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
        const response = await axios.get(`https://synkro-backend.azurewebsites.net/api/messages/${currentConvo?._id}`);
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
      {friendopen && (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-10 flex items-center justify-center z-30">
      <div className="bg-gray-900 w-[25%] h-[25%] rounded-lg p-6 border flex flex-col items-center border-gray-700 relative">
        <p className='font-semibold text-3xl text-white pb-2'>Add Friends</p>
        <p className='text-white text-xl'>Enter your friend's Unique ID</p>
        <form className='h-full w-full flex flex-col items-center'>
        <input onChange={(e)=>setfriend(e.target.value)} value={friend} required className='w-[80%] h-[40%] bg-[#18181b] text-[#5d5d6d] border rounded-2xl pl-6 mt-4' placeholder='Unique ID'></input>
        <button onClick={addfriend} className='bg-[#a2fe65] rounded-3xl w-[30%] h-[40%] mt-4 flex items-center justify-center cursor-pointer hover:bg-[#77cc3a]'><p className='text-black font-semibold text-xl'>Add Friend</p></button>
        </form>
        <div onClick={()=>setfriendopen(false)} className='cursor-pointer absolute right-[5%]'><img className='w-[24px] h-[24px]' src={close}></img></div>
        <div className='text-white pt-2'>This is your unique Id: {currentUser}</div>
      </div>
    </div>
  )}
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
            <div onClick={()=>setfriendopen(true)} className='text-white font-bold absolute right-[16%] w-[10%] h-[50%] bg-[#18181b] flex flex-row items-center cursor-pointer rounded-2xl'>
              <div className='absolute left-[12%]'><img src={addfriendg} style={{width:'24px',height:'24px'}}></img></div>
              <p className='absolute left-[35%]'>Add Friend</p>
            </div>
            <div
              className="absolute right-[12%] cursor-pointer"
              onClick={handleLogout}
            >
              <img src={logout} style={{ width: "32px", height: "32px" }}></img>
            </div>

            <div onClick={()=>setprofileopen(true)} className="absolute flex flex-row items-center right-[4%] cursor-pointer">
                <img
                  className="rounded-3xl"
                  src={
                    user?.profilePicture ? user.profilePicture : iconuser
                  }
                  style={{ width: "48px", height: "48px" }}
                ></img>
                <p className="text-white font-bold text-xl pl-3">{user?.userName.split(' ')[0]}</p>
            </div>
          </div>
          <div className="w-full h-full rounded-b-2xl flex flex-row">
            <div className="w-1/4 h-full border-r border-[#34343d]">
              <p className="font-semibold text-white text-4xl pt-[7%] pl-[15%]">
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
              {currentConvoHeader?<div className="text-white w-[90%] h-[15%] flex flex-row items-center"><img className='w-[48px] h-[48px] rounded-3xl' src={currentConvoHeader?.profilePicture ? currentConvoHeader?.profilePicture : iconuser}></img><p className='pl-5 font-semibold text-2xl'>{currentConvoHeader.userName}</p></div>:null}
              <div className={`w-[90%] bg-[#18181b] absolute rounded-2xl ${currentConvo ? 'h-[75%] top-[15%]' : 'h-[90%] top-[5%]'}`}>
                {currentConvo ? (<>
                  <div className='h-[85%] overflow-y-auto'>
                    {messages.map((message) => (
                      <div ref={scrollRef}>
                      <Message
                        user={user}
                        friend={currentConvoHeader}
                        message={message}
                        own={message.sender === currentUser}
                      />
                      </div>
                    ))}
                  </div>
                  <div className='w-[100%] h-[15%] bg-[#1f1f23] rounded-b-2xl flex flex-row relative'>
                  <input
                  className="w-[90%] h-[100%] bg-[#1f1f23] text-[white] rounded-b-2xl pl-6"
                  placeholder="Write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></input>
                <div onClick={handleSubmit} className='rounded-3xl w-[6%] h-[65%] right-[2%] top-[15%] absolute flex items-center cursor-pointer bg-[#77cc3a]'><img className='absolute w-[32px] h-[32px] left-[23%]' src={send}></img></div>
                </div>
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

export default Main
