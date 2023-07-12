"use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface NameProps {
// 	codeVerifier?: string;
// 	url?: string;
// 	client: string;
// }

// export default function Test({ codeVerifier, url, client }: NameProps) {
// 	const router = useRouter();
// 	const urlParams = new URLSearchParams(window.location.search);
// 	let code = urlParams.get("code");
// 	const secret = client;
// 	const redirect_uri = "http://localhost:3000/";

// 	useEffect(() => {
// 		async function getToken() {
// 			console.log(codeVerifier);

// 			let body = new URLSearchParams({
// 				grant_type: "authorization_code",
// 				code: code!,
// 				redirect_uri: redirect_uri!,
// 				client_id: secret!,
// 				code_verifier: codeVerifier!,
// 			});

// 			console.log(secret);

// 			let response = await fetch("https://accounts.spotify.com/api/token", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/x-www-form-urlencoded",
// 				},
// 				body: body,
// 			})
// 				.then(response => {
// 					if (!response.ok) {
// 						throw new Error("HTTP status " + response.status);
// 					}
// 					return response.json();
// 				})
// 				.then(data => {
// 					console.log(data);
// 					return localStorage.setItem("access_token", data.access_token);
// 				})
// 				.catch(error => {
// 					console.error("Error:", error);
// 				});
// 		}
// 		getToken();
// 	});

// 	return (
// 		<div>
// 			<h1>Hello Root and MetaData Name</h1>
// 			<button
// 				type="button"
// 				className="p-6 mt-20 !cursor-pointer bg-lime-500"
// 				onClick={() => {
// 					console.log("redirecting...");
// 					if (url) {
// 						router.push(url);
// 					}
// 				}}
// 			>
// 				redirect
// 			</button>
// 			<button type="button" className="p-6 mt-20 ml-10  !cursor-pointer bg-lime-500" onClick={() => {}}>
// 				test
// 			</button>
// 		</div>
// 	);
// }
