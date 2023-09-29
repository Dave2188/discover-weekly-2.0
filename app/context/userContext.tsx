import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext<User | {}>({});

interface User {
	// user_id: number;
	// signedIn: boolean;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User>({});

	const clearUser = () => {
		return setUser({});
	};

	return <UserContext.Provider value={{ user, setUser, clearUser }}>{children}</UserContext.Provider>;
};
