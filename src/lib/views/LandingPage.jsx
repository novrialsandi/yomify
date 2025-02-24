"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Carousel from "../components/Carausel";
import Button from "../components/Button";
import { SiWhatsapp, SiGmail } from "react-icons/si";

const LandingPage = () => {
	const router = useRouter();

	const services = [
		{
			title: "Wedding Invitations",
			description:
				"Create unforgettable digital wedding invitations with interactive storytelling.",
			img: "/demo/base/botol.png",
		},
		{
			title: "Company Profiles",
			description:
				"Showcase your brand with a unique, interactive presentation of your company.",
			img: "/demo/other/paper.png",
		},
		{
			title: "Life Documentation",
			description:
				"Preserve memories with interactive visual stories that come to life.",
			img: "/demo/base/camera.png",
		},
		{
			title: "To Pay Illustrator",
			description:
				"The illustrations for this product are paid as we do not use AI-generated images.",
			img: "/demo/other/pictures.png",
		},
	];

	return (
		<>
			<div className="min-h-svh bg-[#EEE9D2] flex flex-col gap-6 justify-center items-center p-4">
				<div className="text-center text-7xl font-bold ">Yomify</div>
				<img src="/meta.png" alt="Meta" className="cursor-pointer size-[80%]" />
				<div className="text-center text-4xl font-bold ">
					Interactive Web Experiences
				</div>
				<p className="text-lg text-center ">
					Engage your audience with clickable visuals that reveal event details,
					stories, and more.
				</p>
			</div>
			<div className="min-h-lvh bg-[#9AC0AF] flex flex-col gap-8 justify-center items-center p-8">
				<h2 className="text-3xl font-semibold text-center">
					Why Choose Our Service?
				</h2>
				<div className="w-[calc(100vw-64px)] max-w-[calc(544px-48px)]">
					<Carousel>
						{services.map((item, index) => (
							<div
								key={index} // Make sure each service item has a unique id
								className="min-w-full bg-white h-[260px] rounded-2xl shadow-lg p-6 gap-4 flex flex-col items-center"
							>
								<h3 className="text-center text-xl font-semibold mb-3 text-gray-800">
									{item.title}
								</h3>
								<img src={item.img} alt={item.title} className="h-24" />
								<p className="text-gray-600 text-center">{item.description}</p>
							</div>
						))}
					</Carousel>
				</div>
				<Button
					onClick={() => router.push("/demo")}
					class="squishy squishy-candy"
				>
					Try Demo
				</Button>
			</div>
			<div className="bg-[#F5D79B] w-full flex flex-col justify-center items-center py-8 px-4 space-y-6">
				<h2 className="text-3xl font-bold text-center text-gray-800">
					Ready to Make Your Story Interactive?
				</h2>
				<p className="text-lg text-center text-gray-700 max-w-xl">
					Let us bring your vision to life with immersive web experiences.
				</p>
				<div className="text-center space-y-2">
					<p className="text-lg text-gray-800 flex justify-center items-center gap-2">
						<SiGmail className="text-red-500 " />
						<a
							href="mailto:novrialsandi@gmail.com"
							className=" hover:underline"
						>
							novrialsandi@gmail.com
						</a>
					</p>
					<p className="text-lg text-gray-800 flex justify-center items-center gap-2">
						<SiWhatsapp className="text-green-500 " />
						<a
							href="https://wa.me/6285183192969"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline"
						>
							+62 851-8319-2969
						</a>
					</p>
				</div>
				<p className="text-sm text-gray-600 text-center">
					Copyright © {new Date().getFullYear()} Yomify. All rights reserved.
				</p>
			</div>
		</>
	);
};

export default LandingPage;
