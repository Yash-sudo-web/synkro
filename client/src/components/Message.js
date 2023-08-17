import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div className={`flex flex-col mt-5 ${own ? "items-end" : ""}`}>
      <div className="flex">
        <img
          className="w-8 h-8 rounded-full object-cover mr-2"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className={`p-2 rounded-2xl ${own ? "bg-gray-200" : "bg-blue-500 text-white"} max-w-xs`}>
          {message.text}
        </p>
      </div>
      <div className="text-xs mt-2">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;