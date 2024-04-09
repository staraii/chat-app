import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
	const [inChannel, setInChannel] = useState("");
	const [messages, setMessages] = useState([]);
	const [channels, setChannels] = useState([]);

	const joinChannel = (user, channel) => {
		

	};


	return (
		<ChatContext.Provider
			value={{ inChannel, messages, channels, joinChannel}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatContext;
