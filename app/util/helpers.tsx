import { Router } from "next/router";

export const getLocalStorage = (key: string) => {
	return (typeof window !== "undefined" && localStorage.getItem(key)) || "";
};

export const setLocalStorage = (key: string, value: string) => {
	return (typeof window !== "undefined" && localStorage.setItem(key, value)) || "";
};

export const removeLocalStorage = (key: string) => {
	return typeof window !== "undefined" && localStorage.removeItem(key);
};

export const logout = () => {
	removeLocalStorage("access_token");
	removeLocalStorage("refresh_token");
	return;
};
