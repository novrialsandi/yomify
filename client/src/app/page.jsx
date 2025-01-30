"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/lib/components/Button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Hero() {
	let images = [
		"/product/1.jpg",
		"/product/2.jpg",
		"/product/3.jpg",
		"/product/4.jpg",
		"/product/5.jpg",
		"/product/6.jpg",
	];

	useEffect(() => {
		const container = document.querySelector(".container");
		if (container) {
			images.forEach((img) => {
				let image = document.createElement("img");
				image.src = img;
				container.appendChild(image);
				image.className = "imgHero object-cover scale-50 h-full w-full";
			});
		}

		const random = (min, max) => {
			return min + (max - min) * Math.random();
		};

		gsap.registerPlugin(ScrollTrigger);

		let ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: "#section-1",
					start: "top top",
					end: "bottom center",
					pin: true,
					scrub: 1,
				},
			});
			gsap.utils.toArray(".imgHero").forEach((target) => {
				// Example animation: fade in the images sequentially
				tl.to(
					target,
					{
						x: random(-2000, 2000),
						y: random(-1000, 1000),
						rotation: random(-700, 700),
						scale: 0,
					},
					0
				);
			});
		});

		// Cleanup function to kill animations when the component unmounts
		return () => ctx.revert();
	}, []);

	return (
		<>
			<section
				id="section-1"
				className="relative w-full min-h-svh flex flex-col items-center justify-center text-center bg-gradient-to-br px-6 "
			>
				<div className="absolute z-10 p-6 flex flex-col items-center">
					<motion.h1
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-7xl md:text-6xl font-bold drop-shadow-lg"
					>
						Yomi
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="mt-4 text-lg md:text-xl max-w-2xl"
					>
						Build Interactive wedding invitations, company profiles, and life
						documentation with ease.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="mt-6 flex gap-4"
					>
						<Button className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg shadow-md hover:bg-gray-200">
							Get Started
						</Button>
						<Button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:text-purple-600">
							Learn More
						</Button>
					</motion.div>
				</div>
				<div className="container grid grid-cols-2 gap-4 mt-12"></div>
			</section>

			<section className="flex min-h-svh flex-col items-center justify-center py-12 bg-black text-white px-6 ">
				<motion.h2
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-4xl font-bold mb-6"
				>
					See Yomi in Action
				</motion.h2>
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="relative w-full h-full flex justify-center overflow-hidden"
				>
					<div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-[40px] shadow-xl ">
						<div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[11px] top-[124px] rounded-s-[8px]"></div>
						<div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[11px] top-[178px] rounded-s-[8px]"></div>
						<div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[11px] top-[142px] rounded-e-[8px]"></div>
						<div className="rounded-[32px] overflow-hidden w-[284px] h-[584px] bg-white dark:bg-gray-800">
							<div className="grid grid-cols-2 h-full w-full object-cover">
								{images.map((image, index) => (
									<img
										key={index}
										src={image}
										alt=""
										className="w-full h-full"
									/>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</section>
		</>
	);
}
