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
		channelNames,
		setChannelNames,
		currentChannel,
		setChannelMod,
		setCurrentChannel,
	} = useChat();
	// AuthContext
	const { user } = useAuth();

	return (
		<section className={styles.section}>
			<ChannelsList />
			<UsersInChannel />
		</section>
	);
}

export default CurrentChannel;
