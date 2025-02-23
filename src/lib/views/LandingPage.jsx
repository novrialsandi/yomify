"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
	const router = useRouter();

	return (
		<div className="min-h-svh bg-[#EEE9D2] flex flex-col justify-center items-center p-4">
			<div className="font-bold text-7xl">Yomify</div>
			<img
				src="/meta.png"
				alt="Meta"
				onClick={() => router.push("/demo")}
				className="cursor-pointer size-[80%]"
			/>
		</div>
	);
};

export default LandingPage;
