import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
	const [onlineInChannel, setOnlineInChannel] = useState([]);
	const [messagesInChannel, setMessagesInChannel] = useState([]);
	const [channelsData, setChannelsData] = useState([]);
	const [currentChannel, setCurrentChannel] = useState("Main");
	const [channelNames, setChannelNames] = useState([]);
	const [channelMod, setChannelMod] = useState("");

	return (
		<ChatContext.Provider
			value={{
				onlineInChannel,
				setOnlineInChannel,
				messagesInChannel,
				setMessagesInChannel,
				channelsData,
				setChannelsData,
				currentChannel,
				setCurrentChannel,
				channelNames,
				setChannelNames,
				setChannelMod,
				channelMod,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatContext;
