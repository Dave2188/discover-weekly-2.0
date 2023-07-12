import React, { createContext, useState } from "react";

export const UserContext = createContext<User | {}>({});

interface User {
	// user_id: number;
	// signedIn: boolean;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User>({});

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
