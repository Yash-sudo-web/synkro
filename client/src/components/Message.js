import iconuser from '../assets/user.png';
const Message = ({ message, own, user, friend }) => {

  const timefunc = (timestamp)=>{
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    
  }

  return (
    <>
      
      {own?
      <>
      <div className="flex flex-col mt-5 items-end">
      <div className="flex items-center">
        <div className="text-xs text-[#9b9b9b] pr-4">{timefunc(message.createdAt)}</div>
        <p className="text-white font-semibold pr-3">You</p>
        <div className="pr-8"><img className="w-[48px] h-[48px] rounded-full object-cover" src={user?.profilePicture ? user.profilePicture : iconuser} alt="pfp"/></div>
      </div>
      <div className="pr-8 pt-4"><div className='p-3 rounded-b-2xl rounded-tl-2xl bg-[#77cc3a]'>{message.text}</div></div>
      </div>
  </>:
    <>
    <div className="flex flex-col mt-5 items-start">
    <div className="flex items-center">
    <div className="pl-8"><img className="w-[48px] h-[48px] rounded-full object-cover" src={friend?.profilePicture ? friend.profilePicture : iconuser} alt="pfp"/></div>
      <p className="text-white font-semibold pl-3">{friend?.userName}</p>
      <div className="text-xs text-[#9b9b9b] pl-4">{timefunc(message.createdAt)}</div>
    </div>
    <div className="pl-8 pt-4"><div className='p-3 rounded-b-2xl rounded-tr-2xl bg-[#1f1f23] text-white'>{message.text}</div></div>
</div>
  </>
        }
      
    </>
  );
}

export default Message;