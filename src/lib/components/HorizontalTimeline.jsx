import React, { useState, useEffect, useRef } from "react";

const HorizontalTimeline = ({ timelineData }) => {
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
							<div
								className={`w-4 h-4 rounded-full transition-all duration-300 ${
									activeIndex === index
										? "bg-[#86B595] scale-125"
										: "bg-gray-300"
								}`}
							></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HorizontalTimeline;
