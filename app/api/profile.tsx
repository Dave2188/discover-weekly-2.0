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

export async function search(genres: string, artist?: string, query?: string) {
	const type = "tracks";
	const market = "UM";
	const limit = 5;
	const offset = 0;

	try {
		const response = await axios.get("/search", {
			params: {
				offset: 0,
				limit: 5,
				market: "US",
				type: "track",
				q: `artist:${artist} genre:${genres}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
}
