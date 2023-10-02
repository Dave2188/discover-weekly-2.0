import { Console } from "console";
import { convertTrackIds, getArtistsFromUserTopTracks, returnTwoItems } from "../util/helpers";
import { TopTrack, TopTracks } from "../util/types";
import axios from "./interceptors";
import { createNewPlaylist } from "./profile";

export async function search(genres: string, artist?: string, query?: string) {
	const type = "tracks";
	const market = "Us";
	const limit = 5;
	const offset = 0;

	try {
		const response = await axios.get("/search", {
			params: {
				offset: offset,
				limit: limit,
				market: market,
				type: type,
				q: `artist:${artist} genre:${genres}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export async function getNewDiscoverPLaylist(topTracks: TopTracks) {
	const similarArtists = [];
	const tracks: string[] = [];

	let artists = getArtistsFromUserTopTracks(topTracks);

	for (let id of artists) {
		try {
			const related = await getSimilarArtists(id);
			similarArtists.push(...returnTwoItems(related));
		} catch (error) {
			console.log(error);
		}
	}

	for (let id of similarArtists) {
		try {
			const artistTopTracks = await getArtistTopTracks(id);
			tracks.push(...returnTwoItems(artistTopTracks));
		} catch (error) {
			console.log(error);
		}
	}

	return tracks;
}

export async function getSimilarArtists(artistId: string) {
	let similarArtists = [];

	console.log("Grabbing related artists...");

	const response = await axios.get(`/artists/${artistId}/related-artists`);

	for (let artist of response.data.artists) {
		similarArtists.push(artist.id);
	}

	return similarArtists;
}

export async function getArtistTopTracks(artistId: string) {
	const market = "Us";
	let trackList = [];

	console.log("Grabbing related artist top tracks...");

	const response = await axios.get(`artists/${artistId}/top-tracks`, {
		params: {
			market: market,
		},
	});

	for (let track of response.data.tracks) {
		if (track.id === undefined) {
			continue;
		}
		// console.log(track.id);
		trackList.push(track.id);
	}

	return trackList;
}

export async function getTrack(id: string) {
	const market = "US";

	console.log("Grabbing track...");

	const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
		params: {
			market: market,
		},
	});

	return response.data;
}

export async function addPlaylistTracks(array: string[], playlist_id: string) {
	const uris = array;
	const position = 0;

	try {
		const response = await axios.post(
			`playlists/${playlist_id}/tracks`,
			{
				uris: array,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export async function createDiscoverWeekly2(user_id: string, topTracks: TopTracks) {
	const playlistId = await createNewPlaylist(user_id);
	console.log(playlistId);
	const trackIds: string[] = await getNewDiscoverPLaylist(topTracks);

	const trackUris = convertTrackIds(trackIds);

	const discoverWeekly = await addPlaylistTracks(trackUris, playlistId);

	return discoverWeekly;
}
