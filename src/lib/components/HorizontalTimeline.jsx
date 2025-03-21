import { useState, useEffect, useRef } from "react";

const timelineData = [
	{
		id: 1,
		title: "Meet",
		date: "Nov 2024",
		content:
			"Fate brought us together in the most unexpected way. Our first meeting was filled with laughter, curiosity, and the spark of something special. Little did we know, this was the beginning of a beautiful journey that would lead us to where we are today.",
		img: "/demo/active/stage1.png",
	},
	{
		id: 2,
		title: "Date",
		date: "Desember 2024",
		content:
			"As time passed, our bond grew stronger. Each moment spent together became a cherished memory, filled with love, understanding, and dreams of the future. From late-night talks to shared adventures, our love story flourished in the simplest yet most meaningful ways.",
		img: "/demo/active/stage2.png",
	},
	{
		id: 3,
		title: "Commit",
		date: "Januari 2025",
		content:
			"With hearts full of love and certainty, we took the next step—choosing to walk this journey hand in hand for a lifetime. This commitment is not just a promise but a vow to cherish, support, and love each other through every season of life.",
		img: "/demo/active/stage3.png",
	},
];

const HorizontalTimeline = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const timelineRef = useRef(null);
	const nodeRefs = useRef([]);
	const [lineStyle, setLineStyle] = useState({ left: "0px", width: "0px" });

	useEffect(() => {
		if (nodeRefs.current[activeIndex] && nodeRefs.current[0]) {
			const startNode = nodeRefs.current[0];
			const activeNode = nodeRefs.current[activeIndex];
			const timeline = timelineRef.current;

			if (startNode && activeNode && timeline) {
				const startRect = startNode.getBoundingClientRect();
				const activeRect = activeNode.getBoundingClientRect();
				const timelineRect = timeline.getBoundingClientRect();

				const leftOffset =
					startRect.left - timelineRect.left + startRect.width / 2;
				const activeOffset =
					activeRect.left - timelineRect.left + activeRect.width / 2;

				setLineStyle({
					left: `${leftOffset}px`,
					width: `${activeOffset - leftOffset}px`,
				});
			}
		}
	}, [activeIndex]);

	const handleNodeClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className="w-full ">
			<div className="relative " ref={timelineRef}>
				<div
					className="h-1 bg-[#86B595] absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
					style={{ left: lineStyle.left, width: lineStyle.width }}
				></div>
				{/* Timeline nodes */}
				<div className="flex justify-between relative">
					{timelineData.map((item, index) => (
						<div
							key={item.id}
							className="flex w-full flex-col items-center cursor-pointer"
							onClick={() => handleNodeClick(index)}
							ref={(el) => (nodeRefs.current[index] = el)}
						>
							<img
								src={item.img}
								alt=""
								className={`size-12 rounded-full transition-transform duration-300 ${
									activeIndex === index ? "animate-wiggle" : ""
								}`}
							/>
						</div>
					))}
				</div>
			</div>
			{timelineData[activeIndex] && (
				<div className="flex flex-col items-center gap-4 mt-4">
					<div>
						<h3 className="text-2xl font-bold">
							{timelineData[activeIndex].title}
						</h3>
						<h4 className=" text-gray-600">{timelineData[activeIndex].date}</h4>
					</div>
					<p className="text-center">{timelineData[activeIndex].content}</p>
				</div>
			)}
		</div>
	);
};

export default HorizontalTimeline;
