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
		if (!isLoading) {
			onClick(e);
		}
	};

	return (
		<div
			className={`${className} text-white bg-[#F66A5B] text-nowrap flex items-center justify-center rounded-lg`}
		>
			<button
				className="min-w-24 w-full p-2 h-10 flex items-center justify-center"
				disabled={disabled || isLoading}
				onClick={handleClick}
			>
				{isLoading ? (
					<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
				) : (
					children
				)}
			</button>
		</div>
	);
};

export default Button;
