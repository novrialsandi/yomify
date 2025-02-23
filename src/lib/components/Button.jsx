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
			className={`${className} text-white bg-[#F66A5B] min-w-24 px-2 text-nowrap flex h-10 items-center justify-center rounded-lg p-2 `}
		>
			<button disabled={disabled || isLoading} onClick={handleClick}>
				{children}
			</button>
		</div>
	);
};

export default Button;
