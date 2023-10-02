import { TopTrack } from "../util/types";
import axios from "./interceptors";

export async function getProfile() {
	try {
		const response = await axios.get("/me");
		return response.data;
	} catch (error) {
		console.log(error);
		return;
	}
}

export async function fetchTopArtists() {
	const type = "artists";
	const time_range = "medium_term";
	const limit = 10;
	const offset = 0;

	try {
		const response = await axios.get(`/me/top/${type}`, {
			params: {
				time_range,
				limit,
				offset,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching top artists:", error);
	}
}

export async function createNewPlaylist(user_id: string) {
	const name = "DiscoverWeekly_2.0";
	const description = "A second chance at this weeks discoveries";
	const isPublic = false;
	console.log(user_id);
	try {
		const response = await axios.post(
			`/users/${user_id}/playlists`,
			{
				name: name,
				description: description,
				public: isPublic,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status >= 200 && response.status < 300) {
			console.log("playlist created");
		}

		return response.data.id;
	} catch (error) {
		console.log(error);
	}
}
