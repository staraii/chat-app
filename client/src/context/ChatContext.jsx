import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
	const [onlineInChannel, setOnlineInChannel] = useState([]);
	const [messagesInChannel, setMessagesInChannel] = useState([]);
	const [channelsData, setChannelsData] = useState([]);
	const [currentChannel, setCurrentChannel] = useState("");
	const [channelNames, setChannelNames] = useState([]);
	const [channelMod, setChannelMod] = useState("");
	

	// Genererar en array med kanalernas namn som [key] och _id som value
	const handleChannelNames = (data) => {
		const chNames = [
			...data.map((ch) => {
				return { [ch.channelName]: ch._id };
			}),
		];
		setCurrentChannel(chNames[0]["Main"]);
		setChannelNames([...chNames]);
	};

	function handleFetchedData(data) {
		setChannelsData([...data]);
		handleChannelNames(data);
	}

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
				handleFetchedData,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatContext;
