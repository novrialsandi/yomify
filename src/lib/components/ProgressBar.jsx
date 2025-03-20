import React from "react";
import { useState, useEffect } from "react";

const ProgressBar = ({
	progress = 0,
	height = 8,
	backgroundColor = "#e0e0e0",
	fillColor = "#3b82f6",
	animated = true,
	showPercentage = true,
	className = "",
	labelPosition = "right", // 'right', 'center', 'inside'
	rounded = true,
	striped = false,
}) => {
	const [currentProgress, setCurrentProgress] = useState(0);

	useEffect(() => {
		// Animate the progress change
		if (animated) {
			const timer = setTimeout(() => {
				if (currentProgress < progress) {
					setCurrentProgress(Math.min(currentProgress + 1, progress));
				} else if (currentProgress > progress) {
					setCurrentProgress(Math.max(currentProgress - 1, progress));
				}
			}, 10);
			return () => clearTimeout(timer);
		} else {
			setCurrentProgress(progress);
		}
	}, [currentProgress, progress, animated]);

	// Ensure progress is within 0-100 range
	const clampedProgress = Math.min(100, Math.max(0, currentProgress));

	const containerStyles = {
		backgroundColor,
		borderRadius: rounded ? "9999px" : "0",
		height: `${height}px`,
		position: "relative",
		overflow: "hidden",
		opacity: 0.8,
	};

	const fillStyles = {
		height: "100%",
		width: `${clampedProgress}%`,
		backgroundColor: fillColor,
		transition: animated ? "width 0.3s ease" : "none",
		borderRadius: rounded ? "9999px" : "0",
		backgroundImage: striped
			? "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)"
			: "none",
		backgroundSize: striped ? "1rem 1rem" : "auto",
	};

	const renderLabel = () => {
		if (!showPercentage) return null;

		const labelStyles = {};
		const labelClass =
			labelPosition === "inside"
				? "absolute inset-0 flex items-center justify-center text-white font-medium text-sm"
				: "text-sm font-medium ml-2";

		return (
			<div className={labelClass} style={labelStyles}>
				{clampedProgress}%
			</div>
		);
	};

	return (
		<div className={`flex flex-col gap-2 items-center w-full p-8 ${className}`}>
			{labelPosition === "left" && renderLabel()}
			<div className="flex-grow w-full" style={containerStyles}>
				<div style={fillStyles}>
					{labelPosition === "inside" && renderLabel()}
				</div>
			</div>
			{(labelPosition === "right" || labelPosition === "center") &&
				renderLabel()}
		</div>
	);
};

export default ProgressBar;
