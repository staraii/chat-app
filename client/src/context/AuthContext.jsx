import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({ username: "", role: "", token: "" });
	const [isDark, setIsDark] = useState(true);

	const login = (user) => {
		//console.log(user)
		setIsLoggedIn(true);
		setUser({
			username: user.username,
			role: user.role,
			token: user.token,
		});
	};

	const logout = () => {
		setIsLoggedIn(false);
		setUser({});
	};

	const setTheme = () => {
		setIsDark(!isDark);
		const theme = (isDark ? "dark" : "light");
		document.querySelector("#appTheme").dataset.darkmode = `${theme}`;
	}
	return (
		<AuthContext.Provider value={{ isLoggedIn, user, username: user.username, login, logout, isDark, setTheme }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
