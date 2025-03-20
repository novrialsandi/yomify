"use client";

import React from "react";
import { SiWhatsapp, SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import Button from "../components/Button";

const LandingPage = () => {
	const services = [
		{
			title: "Wedding Invitations",
			description:
				"Create unforgettable digital wedding invitations with interactive storytelling.",
			img: "/demo/base/bottle.webp",
		},
		{
			title: "Company Profiles",
			description:
				"Showcase your brand with a unique, interactive presentation of your company.",
			img: "/demo/base/paper.webp",
		},
		{
			title: "Life Documentation",
			description:
				"Preserve memories with interactive visual stories that come to life.",
			img: "/demo/base/camera.webp",
		},
	];

	return (
		<>
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="min-h-svh bg-[#EEE9D2] flex flex-col gap-6 justify-center items-center p-4"
			>
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className="text-center text-7xl font-bold"
				>
					Yomify
				</motion.div>
				<motion.img
					src="/meta.webp"
					alt="Meta"
					className="size-[80%]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				/>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="text-center text-4xl font-bold"
				>
					Interactive Web Experiences
				</motion.div>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="text-lg text-center"
				>
					Engage your audience with clickable visuals that reveal event details,
					stories, and more.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<Button>
						<a
							href="/demo"
							target="_blank"
							rel="noreferrer"
							className="h-full w-full flex items-center justify-center"
						>
							Try Demo
						</a>
					</Button>
				</motion.div>
			</motion.div>

			{/* Services Section */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className="min-h-lvh bg-[#9AC0AF] flex flex-col gap-8 justify-center items-center p-8"
			>
				<h2 className="text-3xl font-semibold text-center text-white">
					Our Service
				</h2>

				{services.map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: index * 0.2 }}
						className="min-w-full bg-white/50 rounded-2xl shadow-lg p-4 gap-4 flex flex-col items-center"
					>
						<h3 className="text-center text-xl font-semibold text-gray-800">
							{item.title}
						</h3>
						<img src={item.img} alt={item.title} className="h-16" />
						<p className="text-gray-600 text-center">{item.description}</p>
					</motion.div>
				))}

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1 }}
					className="text-center text-white"
				>
					*The illustrations for this product are paid as we{" "}
					<span className="text-[#F66A5B]"> do not use </span>
					AI-generated images.
				</motion.div>
			</motion.div>

			{/* Contact Section */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className="bg-[#F5D79B] w-full flex flex-col justify-center items-center py-6 px-4 space-y-4"
			>
				<h2 className="text-3xl font-semibold text-center">Contact Us</h2>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-2"
				>
					<p className="text-lg text-gray-800 flex justify-center items-center gap-2">
						<SiGmail className="text-red-500" />
						<a href="mailto:novrialsandi@gmail.com" className="hover:underline">
							novrialsandi@gmail.com
						</a>
					</p>
					<p className="text-lg text-gray-800 flex justify-center items-center gap-2">
						<SiWhatsapp className="text-green-500" />
						<a
							href="https://wa.me/6285183192969"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline"
						>
							+62 851-8319-2969
						</a>
					</p>
				</motion.div>
				<p className="text-sm text-gray-600 text-center">
					Copyright © {new Date().getFullYear()} Yomify. All rights reserved.
				</p>
			</motion.div>
		</>
	);
};

export default LandingPage;
