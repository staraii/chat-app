import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "context/AuthContext.jsx";
import { ChatProvider } from "context/ChatContext.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<ChatProvider>
				<QueryClientProvider client={queryClient}>
					<App />
					{/* <ReactQueryDevtools initialIsOpen={false} /> */}
				</QueryClientProvider>
			</ChatProvider>
		</AuthProvider>
	</React.StrictMode>
);
