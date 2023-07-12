// app/providers.tsx
"use client";
import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/userContext";
import NavBar from "./components/navBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: twentyFourHoursInMs,
		},
	},
});

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<ChakraProvider>
				<QueryClientProvider client={queryClient}>
					<UserProvider>
						<NavBar />
						{children}
					</UserProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
