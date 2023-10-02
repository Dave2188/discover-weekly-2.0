"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import { useQuery } from "react-query";
import { fetchTopArtists } from "./api/profile";
import { convertTrackIds, getLocalStorage } from "./util/helpers";
import {
	createDiscoverWeekly2,
	getArtistTopTracks,
	getNewDiscoverPLaylist,
	getSimilarArtists,
	search,
} from "./api/playlist";

export default function Home() {
	const { user, setUser } = useContext<any>(UserContext);
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const [topArtists, setTopArtists] = useState<any>(null);
	const [loggedOut, setLoggedOut] = useState<boolean>(false);
	const [tracks, setTracks] = useState<any>(null);

	const {
		data: topData,
		error: topError,
		isLoading: topIsLoading,
		refetch: topRefetch,
		isFetching: topIsFetching,
	} = useQuery("fetchTopArtists", fetchTopArtists, {
		enabled: false,
		onSuccess: data => {
			return setTopArtists(data);
		},
	});

	if (topError) {
		return alert(`{Error: ${topError}`);
	}

	const handleClick = () => {
		topRefetch();
	};

	useEffect(() => {
		if (!getLocalStorage("access_token")) {
			setTopArtists(null);
		}
	}, []);

	const { data, error, isFetching, refetch } = useQuery("getMix", () => createDiscoverWeekly2(user.id, topData), {
		enabled: false,
		onSuccess: data => {
			console.log(data);
		},
	});

	const handleMixClick = () => {
		refetch();
	};

	console.log(topData);
	console.log(data);
	// console.log(convertTrackIds(data));
	return (
		<>
			<main className="flex flex-col items-center justify-between min-h-screen p-24">
				<div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
					<div>
						<h1 className="mb-2 underline ">Top Artists</h1>
						{topIsFetching ? (
							<h2>Getting your top artists......</h2>
						) : (
							<>
								{" "}
								{topData?.items?.map((artist: any, index: any) => (
									<div key={index}>
										<h2>{artist.name}</h2>
										{/* <p>{artist.genres.join(", ")}</p> */}
									</div>
								))}
							</>
						)}

						<button className="mt-5 text-black bg-white" onClick={handleClick}>
							click me
						</button>
					</div>
					{topData && (
						<div>
							<h1 className="mb-2 underline ">Discover Weekly 2.0</h1>
							{isFetching ? (
								<h2>Getting your blend......</h2>
							) : (
								<>
									{tracks?.tracks?.items?.map((track: any, index: any) => (
										<div key={index}>
											<h2>
												{track.artists[0].name}: {track.name}
											</h2>
											{/* <p>{artist.genres.join(", ")}</p> */}
										</div>
									))}
								</>
							)}

							<button className="mt-5 text-black bg-white" onClick={handleMixClick}>
								Get new Playlist
							</button>
						</div>
					)}
				</div>
			</main>
		</>
	);
}
