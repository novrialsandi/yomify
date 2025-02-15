"use client";

import React from "react";

const Button = ({
	className = "",
	size = "medium", // small, medium
	isLoading = false,
	disabled = false,
	onClick = () => {},
	primary = true,
	btnToggleClass = "",
	children,
}) => {
	const handleClick = (e) => {
		if (e && typeof e.stopPropagation === "function") {
			e.stopPropagation();
		}
		onClick(e);
	};

	const sizeDataClass = {
		small: "h-8",
		medium: "h-10",
		large: "h-12",
	};

	return (
		<div>
			<button
				className={`${className} min-w-10 text-nowrap ${
					disabled ? "cursor-wait" : ""
				} ${
					primary
						? "bg-primary hover:bg-hover active:bg-active disabled:bg-disabled"
						: "border-[1px] border-border/dark bg-background/componnent-input placeholder:text-icon/disabled hover:bg-color/background/component-card active:bg-[#22262E] dark:text-text/light"
				} ${btnToggleClass} flex h-10 items-center justify-center rounded-lg p-2 ${
					sizeDataClass[size]
				} transition duration-150 ease-in-out`}
				disabled={disabled || isLoading}
				onClick={handleClick}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
