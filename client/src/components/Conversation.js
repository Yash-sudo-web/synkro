import axios from "axios";
import { useEffect, useState } from "react";
import iconuser from "../assets/user.png";
const Conversation = ({ conversation, currentUser}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios.get("https://synkro-backend.vercel.app/api/user/getUser/"+friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="flex items-center p-2 cursor-pointer mt-5 ">
      <img
        className="w-[48px] h-[48px] rounded-full object-cover mr-5"
        src={user?.profilePicture ? user.profilePicture : iconuser}
        alt=""
      />
      <span className=" font-medium text-white text-3xl">{user?.userName.split(' ')[0]}</span>
    </div>
  );
};

export default Conversation;
