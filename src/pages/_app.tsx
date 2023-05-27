import FullPageLoader from "@/components/loaders/fullpage";
import magic from "@/lib/magic";
import "@/styles/globals.css";
import { motion } from "framer-motion";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(true);
	const { pathname, push: routerPush, events: routerEvents } = useRouter();

	useEffect(() => {
		if (!loading) return;

		const m = typeof window !== "undefined" && magic();
		if (!m) return setLoading(false);

		m.user.isLoggedIn().then((res) => {
			if (!res && pathname !== "/login") routerPush("/login");
			else if (res && pathname === "/login") routerPush("/");
			else setLoading(false);
		});
	}, [routerPush, loading, pathname]);

	useEffect(() => {
		const handleRouteChange = () => setLoading(false);
		routerEvents.on("routeChangeComplete", handleRouteChange);
		routerEvents.on("routeChangeError", handleRouteChange);

		return () => {
			routerEvents.off("routeChangeComplete", handleRouteChange);
			routerEvents.off("routeChangeError", handleRouteChange);
		};
	}, [routerEvents]);

	return (
		<>
			{loading ? (
				<div className="flex items-center justify-center h-screen">
					<FullPageLoader />
				</div>
			) : (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<style jsx global>
						{`
							html {
								font-family: ${inter.style.fontFamily};
							}
						`}
					</style>
					<Component {...pageProps} />
				</motion.div>
			)}
		</>
	);
}
