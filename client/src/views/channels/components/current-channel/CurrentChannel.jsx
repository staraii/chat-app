import ChannelsList from "../channels-list/ChannelsList.jsx";
import UsersInChannel from "../users-in-channel/UsersInChannel.jsx";
import styles from "./current-channel.module.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useChat } from "context/ChatContext.jsx";
import { useAuth } from "context/AuthContext.jsx";
import axios from "axios";

// Base url för endpoints
const API_URL = "http://localhost:3000/api/channels";

// Instans av socket, namespace channels
const socket = io("http://localhost:3000/channels", {
	autoConect: false,
});

function CurrentChannel() {
	//Chat Context
	const {
		setChannelsData,
		channelsData,
		setChannelNames,
		currentChannel,
		setChannelMod,
	} = useChat();
	// AuthContext
	const { user } = useAuth();

	//Auth header
	const headers = {
		"Content-Type": "application/json",
		authorization: `Bearer ${user.token}`,
	};

	// Hanterar moderator för vald kanal
	const handleChannelMod = (data) => {
		let thisChannel;
		if (data) {
			thisChannel = data.find(
				(channel) => channel.channelName === currentChannel
			);
		} else {
			thisChannel = channelsData.find(
				(channel) => channel.channelName === currentChannel
			);
		}
		
		console.log(thisChannel.ownedBy)
		setChannelMod(thisChannel.ownedBy);
	};
	// Genererar en array med kanalernas namn som [key] och _id som value
	const handleChannelNames = (data) => {
		setChannelNames([
			...data.map((ch) => {
				return { [ch.channelName]: ch._id };
			}),
		]);
	};
	// Funktion för att hantera hämtad kanal data, kör efter varje fetch
	const handleChannelsData = (data) => {
		handleChannelNames(data);
		handleChannelMod(data);
	};

	// Hämtar alla kanaler
	const getChannels = async () => {
		const response = await axios.get(`${API_URL}`, { headers });
		const data = await response.data;
		if (data) {
			setChannelsData(data);
			handleChannelsData(data);
		}
	};
	useEffect(() => {
		getChannels();
	}, []);
	return (
		<section className={styles.section}>
			<ChannelsList />
			<UsersInChannel />
		</section>
	);
}

export default CurrentChannel;
