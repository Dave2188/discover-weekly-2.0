import axios, { Axios } from "axios";
import { getLocalStorage, setLocalStorage } from "../util/helpers";

axios.interceptors.response.use(
	res => {
		return res;
	},
	async function (error) {
		const originalRequest = error.config;
		let refreshTokenError, res;
		let body = new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: getLocalStorage("refresh_token"),
			client_id: `${process.env.CLIENT_ID}`,
		});
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			res = await axios({
				method: "POST",
				url: "https://accounts.spotify.com/api/token",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				data: body,
			}).then(() => {});
		}
	}
);
