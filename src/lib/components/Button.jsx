import React from "react";

const Button = ({
	className = "",
	isLoading = false,
	disabled = false,
	onClick = () => {},
	children,
}) => {
	const handleClick = (e) => {
		if (e && typeof e.stopPropagation === "function") {
			e.stopPropagation();
		}
		onClick(e);
	};

	return (
		<div
			className={`${className} text-white bg-[#F66A5B] text-nowrap flex  items-center justify-center rounded-lg  `}
		>
			<button
				className="min-w-24 w-full p-2 h-10"
				disabled={disabled || isLoading}
				onClick={handleClick}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
