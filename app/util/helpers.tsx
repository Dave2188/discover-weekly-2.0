import { Router } from "next/router";
import { TopTrack, TopTracks } from "./types";

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

export const getArtistsFromUserTopTracks = (TopTracks: TopTracks) => {
	const artists = [];

	for (let artist of TopTracks.items) {
		artists.push(artist.id);
	}
	return artists;
};

export const getRandomInt = (max: number) => {
	return Math.floor(Math.random() * (max + 1));
};

export const returnTwoItems = (array: string[]) => {
	const twoItems = [];
	const firstRandomNumber = getRandomInt(19);
	let secondRandomNumber;

	do {
		secondRandomNumber = getRandomInt(19);
	} while (secondRandomNumber === firstRandomNumber);

	if (array[firstRandomNumber] !== undefined) {
		twoItems.push(array[firstRandomNumber]);
	}

	if (array[secondRandomNumber] !== undefined) {
		twoItems.push(array[secondRandomNumber]);
	}

	// console.log(twoItems);

	return twoItems;
};

export const createUri = (id: string) => {
	return `spotify:track:${id}`;
};

export const convertTrackIds = (trackIds: string[]) => {
	let converted: any = [];
	if (trackIds) {
		converted = trackIds.map(track => {
			return createUri(track);
		});
	}

	return converted;
};
