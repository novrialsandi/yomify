"use client";

import React, { useState } from "react";

export default function Hero() {
	const [selectedFruit, setSelectedFruit] = useState("home");

	const fruitStyles = {
		home: {
			backgroundColor: "#FF7070",
			color: "#cc1918",
			bgImage:
				"https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/100/FFFFFF/external-apple-sports-and-awards-smashingstocks-glyph-smashing-stocks.png",
		},
		demo: {
			backgroundColor: "#f7e35b",
			color: "#fdff8f",
			bgImage: "https://img.icons8.com/glyph-neue/100/1A1A1A/citrus.png",
		},
		contact: {
			backgroundColor: "#fdff8f",
			color: "#ff2557",

			bgImage:
				"https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/100/FFFFFF/external-Strawberry-food-smashingstocks-glyph-smashing-stocks.png",
		},
		faq: {
			backgroundColor: "#ff2557",
			color: "#ffba36",

			bgImage: "https://img.icons8.com/pastel-glyph/100/FFFFFF/citrus-1.png",
		},
	};

	const handleFruitClick = (fruit) => {
		setSelectedFruit(fruit);
	};

	return (
		<div
			className=" min-h-svh flex flex-col justify-between items-center"
			style={{ backgroundColor: fruitStyles[selectedFruit].backgroundColor }}
		>
			<div>halo</div>
			<div className="">
				<div className="relative overflow-hidden">
					<div className="flex">
						{Object.entries(fruitStyles).map(([fruit, style]) => (
							<div
								key={fruit}
								onClick={() => handleFruitClick(fruit)}
								className={`flex items-center transition-all duration-300 rounded-lg p-4 cursor-pointer ${
									selectedFruit === fruit ? "w-80" : "w-16"
								} `}
								style={{ backgroundColor: style.color }}
							>
								<img src={style.bgImage} alt={fruit} className="min-w-8 h-8" />
								<h1
									className={`ml-4 font-bold text-white transition-opacity duration-300 ${
										selectedFruit === fruit ? "opacity-100" : "opacity-0 hidden"
									}`}
								>
									{fruit.toUpperCase()}
								</h1>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
