import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:9090");
//socket.on("news", (data: any) => console.log(data));

const Chat: React.FC = (): JSX.Element => {
  const [data, setData] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState<any[]>([]);
  const sendMessage = () => {
    socket.emit("send_message", message);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      return sendMessage();
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage([...receivedMessage, data]);
    });
  }, [receivedMessage]);

  return (
    <div>
      Chat
      <div className="border-2 border-purple-200 p-4 w-[30rem] h-[30rem]">
        <div className=" bg-gray-200 h-[80%]">
          <div>
            {receivedMessage.map((res) => (
              <div>{res}</div>
            ))}
          </div>
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            className="w-[80%] h-12 mr-2 border-2 border-green-300 hover:border-orange-200 px-2"
            onChange={handleChange}
            onKeyDown={handleClick}
          />
          <button
            className="border bg-green-200 px-4 py-2"
            onClick={sendMessage}
          >
            {" "}
            Send{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
