import axios from "axios";
import { useEffect, useState } from "react";
import iconuser from "../assets/user.png";
const Conversation = ({ conversation, currentUser}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/getUser/"+friendId);
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
        className="w-14 h-14 rounded-full object-cover mr-5"
        src={user?.profilePicture ? user.profilePicture : iconuser}
        alt=""
      />
      <span className="font-semibold text-white text-3xl">{user?.userName.split(' ')[0]}</span>
    </div>
  );
};

export default Conversation;
