export type TopTrack = {
	external_urls: ExternalUrl;
	followers: Followers;
	genres: string[];
	href: string;
	id: string;
	images: images[];
	name: string;
	uri: string;
};

type ExternalUrl = {
	spotify: string;
};

type Followers = {
	href: string | null;
	total: number;
};

type images = {
	height: number;
	url: string;
	width: number;
};
