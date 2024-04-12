import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

const API_URL = "http://localhost:3000/api/channels";


const headers = (token) => {
	const headers = {
		"Content-Type": "application/json",
		authorization: `Bearer ${token}`
	};
	return headers;
};

const useGetChannels = (token) => {
	return useQuery({
		queryKey: ["allChannels"],
		queryFn: () => axios.get(`${API_URL}`, { headers: headers(token) })
	})
};

const useGetChannelById = (id) => {
	return useQuery({
		queryKey: ["channelId"],
		queryFn: () => axios.get(`$${API_URL}/${id}`, { headers }),
	});
};

const usePutChannel = (data) => {
	return useQuery({
		queryKey: ["putChannel"],
		queryFn: () => axios.put(`${API_URL}`, { headers, data }),
	});
};

const usePostMessage = (id, data) => {
	return useQuery({
		queryKey: ["postMessage"],
		queryFn: () => axios.post(`${API_URL}/${id}`, { headers, data }),
	});
};

const useDeleteChannel = (id) => {
	return useQuery({
		queryKey: ["deleteChannel"],
		queryFn: () => axios.delete(`${API_URL}/${id}`, { headers }),
	});
};

export {
	useGetChannels,
	useGetChannelById,
	usePutChannel,
	usePostMessage,
	useDeleteChannel,
};
