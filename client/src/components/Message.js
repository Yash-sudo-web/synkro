import { format } from "timeago.js";
import iconuser from '../assets/user.png';
const Message = ({ message, own, user, friend }) => {
  return (
    <>
      
      {own?
      <>
      <div className="flex flex-col mt-5 items-end">
      <div className="flex flex-col pl-5">
      <div className="flex flex-row">
      <div className="text-xs mt-2 text-white">{format(message.createdAt)}</div>
      <p className="text-white">{user?.userName}</p>
      <img className="w-[48px] h-[48px] rounded-full object-cover mr-2" src={user?.profilePicture ? user.profilePicture : iconuser} alt="pfp"/>
      </div>
      <div>
      <div className='pt-2 pb-2 rounded-2xl bg-[#77cc3a] min-w-[20px]'>{message.text}</div>
      </div>
    </div>
    </div></>:
    <>
    <div className="flex flex-col mt-5">
    <div className="flex">
    <img className="w-8 h-8 rounded-full object-cover mr-2" src={friend?.profilePicture ? friend.profilePicture : iconuser} alt="pfp"/>
    <p className="text-white">{friend?.userName}</p>
    <div className="text-xs mt-2 text-white">{format(message.createdAt)}</div>
    <div className='p-2 rounded-2xl bg-[#1f1f23] text-white max-w-xs'>
      {message.text}
    </div>
  </div></div>
  </>
        }
      
    </>
  );
}

export default Message;