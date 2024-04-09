import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	resolve: {
		alias: {
			src: "/src",
			components: "/src/components",
			hooks: "/src/hooks",
			service: "/src/service",
			utils: "/src/utils",
			views: "/src/views",
			context: "/src/context",
		},
	},
});
