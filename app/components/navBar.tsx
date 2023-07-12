/* eslint-disable no-unused-vars */
import { useContext, ReactNode, useEffect } from "react";
import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { UserContext } from "../context/userContext";
import { getRedirect, getToken } from "../auth/auth";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getLocalStorage } from "../util/helpers";
import { getProfile } from "../api/profile";
// import { getProfile } from "../api/profile";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children, href }: { children: ReactNode; href: string | undefined }) => (
	<Link
		px={2}
		py={1}
		rounded={"md"}
		_hover={{
			textDecoration: "none",
			bg: useColorModeValue("gray.200", "gray.700"),
		}}
		href={href}
	>
		{children}
	</Link>
);

export default function Navar() {
	let code: string | null;
	let verifier: string | null;
	if (typeof window !== "undefined") {
		const urlParams = new URLSearchParams(window.location.search);
		code = urlParams.get("code");
		verifier = localStorage.getItem("code_verifier");
	}

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const router = useRouter(); // @ts-expect-error
	const { user, setUser } = useContext(UserContext);

	const { data } = useQuery(
		["token"],
		async (): Promise<any> => {
			if (code && verifier) {
				return await getToken(code, localStorage.getItem("code_verifier")!, process.env.NEXT_PUBLIC_CLIENT_ID!);
			}
		},
		{
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: 0,
			onSuccess: data => {
				console.log("onSuccess data:", data); // log the data
				if (!data) return;
				console.log("Storing tokens in localStorage");
				localStorage.setItem("access_token", data.access_token);
				localStorage.setItem("refresh_token", data.refresh_token);
				localStorage.removeItem("code_verifier");
				router.replace("/");
				getProfile().then(data => setUser(data));
			},
			onError: () => {
				alert();
			},
		}
	);

	const handleSignIn = async () => {
		const [url, code_verifier] = await getRedirect();
		window.localStorage.setItem("code_verifier", code_verifier);
		return router.push(url);
	};
	console.log(user);
	return (
		<>
			<Box bg={useColorModeValue("gray.100", "black")} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>{user.display_name}</Box>
						<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
							<NavLink href="#">{`${user?.followers?.total} Followers`}</NavLink>
							<NavLink href={`${user?.external_urls?.spotify}`}>{"My Spotify"}</NavLink>
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						<Button margin={5} onClick={toggleColorMode}>
							{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
						</Button>
						{user.display_name ? (
							<Menu>
								<MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
									<Avatar size={"md"} src={user?.images[1].url} />
								</MenuButton>
								<MenuList>
									<MenuItem>Link 1</MenuItem>
									<MenuItem>Link 2</MenuItem>
									<MenuDivider />
									<MenuItem>Link 3</MenuItem>
								</MenuList>
							</Menu>
						) : (
							<Button onClick={handleSignIn}>Sign in</Button>
						)}
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map(link => (
								<NavLink href="#" key={link}>
									{link}
								</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>

			{/* <Box p={4}>Main Content Here</Box> */}
		</>
	);
}
