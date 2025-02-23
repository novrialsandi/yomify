"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
	const router = useRouter();

	return (
		<div className="min-h-svh bg-[#EEE9D2] flex items-center p-4">
			<img
				src="/meta.png"
				alt="Meta"
				onClick={() => router.push("/demo")}
				className="cursor-pointer"
			/>
		</div>
	);
};

export default LandingPage;
