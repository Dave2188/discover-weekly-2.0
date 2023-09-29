import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../util/helpers";
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

axios.interceptors.request.use(config => {
	const accessToken = getLocalStorage("access_token");
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

axios.interceptors.response.use(
	res => {
		return res;
	},
	async function (error) {
		const originalRequest = error.config;
		const refreshToken = localStorage.getItem("refresh_token");

		if (error.response && error.response.status === 401 && !originalRequest._retry && refreshToken) {
			originalRequest._retry = true;

			let body = new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: refreshToken,
				client_id: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
			});

			try {
				const res = await axios({
					method: "POST",
					url: "https://accounts.spotify.com/api/token",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					data: body,
				});

				if (res.status === 200) {
					setLocalStorage("access_token", res.data.access_token);
					originalRequest.headers["Authorization"] = `Bearer ${res.data.access_token}`;
					return axios(originalRequest);
				}
			} catch (err) {
				console.error("Token refresh failed", err);
			}
		}
		return Promise.reject(error);
	}
);
export default axios;
