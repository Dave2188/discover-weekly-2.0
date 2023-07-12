import axios from "axios";
import { getLocalStorage } from "../util/helpers";
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers.common["authorization"] = `Bearer ${getLocalStorage("access_token")}`;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers["Access-Control-Allow-Origin"] = "http://localhost:3000/";
axios.defaults.headers["Access-Control-Allow-Credentials"] = true;

export async function getProfile() {
	try {
		let accessToken = localStorage.getItem("access_token");

		const response = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
	return;
}
