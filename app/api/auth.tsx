const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const redirect_uri = "http://localhost:3000/";
let codeVerifier = generateRandomString(128);

export function generateRandomString(length: number) {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export async function generateCodeChallenge() {
	function base64encode(buffer: ArrayBuffer) {
		const bytes = new Uint8Array(buffer);
		let binary = "";
		const len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	}

	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await crypto.subtle.digest("SHA-256", data);

	return base64encode(digest);
}

export async function getRedirect() {
	const state = await generateRandomString(16);
	const url = await generateCodeChallenge().then(codeChallenge => {
		const scope = "user-read-private user-read-email";

		let args = new URLSearchParams({
			response_type: "code",
			client_id: client_id!,
			scope: scope,
			redirect_uri: redirect_uri,
			state: state,
			code_challenge_method: "S256",
			code_challenge: codeChallenge,
		});

		return "https://accounts.spotify.com/authorize?" + args;
	});
	return [url, codeVerifier];
}

export async function getToken(code: string, code_verifier: string, client_id: string) {
	let body = new URLSearchParams({
		grant_type: "authorization_code",
		code: code,
		redirect_uri: redirect_uri,
		client_id: client_id!,
		code_verifier: code_verifier,
	});

	return await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: body,
	})
		.then(response => {
			if (!response.ok) {
				throw new Error("HTTP status " + response.status);
			}
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {
			console.error("Error:", error);
		});
}
