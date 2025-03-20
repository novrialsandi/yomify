import React, { useState, useRef, useEffect } from "react";
// import { iconSvg } from '../Icons/icon';

const TextInput = ({
	isFullwidth = true,
	name = "",
	id = `id-${Date.now()}`,
	className = "",
	type = "text",
	placeholder = "Type here ...",
	pattern = "",
	value: initialValue = "",
	errorMsg = "",
	label = "",
	size = "small", // small, medium, large
	hasIconLeft = "",
	hasIconRight = "",
	isCheckbox = false,
	isPasswordField = false,
	debounceTime = null, // in milliseconds
	isRequired = false,
	onKeyDown = () => {},
	onChange = () => {},
	onFocus = () => {},
	onBlur = () => {},
}) => {
	const [value, setValue] = useState(initialValue);
	const [inputType, setInputType] = useState(type);
	const fieldRef = useRef(null);
	const timerRef = useRef(null);

	const sizeDataClass = {
		small: "h-8",
		medium: "h-10",
		large: "h-12",
	};

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const debounce = (e) => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			setValue(e.target.value);
			onChange(e);
		}, debounceTime);
	};

	const handleChange = (e) => {
		if (debounceTime) {
			debounce(e);
		} else {
			setValue(e.target.value);
			onChange(e);
		}
	};

	const togglePasswordVisibility = (e) => {
		e.preventDefault();
		setInputType((prevType) => (prevType === "password" ? "text" : "password"));
		fieldRef.current.focus();
	};

	return (
		<div
			className={`${
				isFullwidth ? "w-full" : ""
			} text-black flex flex-col space-y-2`}
		>
			{label && (
				<label
					suppressHydrationWarning
					htmlFor={id}
					className="flex items-center "
				>
					{label}
					{isRequired && <span className="ml-1 font-bold text-red-400">*</span>}
				</label>
			)}
			<div className={`relative ${label ? "mt-1" : ""}`}>
				{hasIconLeft && (
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4">
						{hasIconLeft}
					</div>
				)}
				<input
					suppressHydrationWarning
					id={id}
					name={name}
					placeholder={placeholder}
					type={inputType}
					pattern={pattern}
					value={initialValue}
					ref={fieldRef}
					autoComplete="off"
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={handleChange}
					className={`flex w-full text-lg items-center rounded-lg border  outline-0 hover:border-primary focus:border-active focus:ring-0 ${className} ${
						errorMsg ? "border-error text-error" : ""
					} ${sizeDataClass[size]} ${hasIconLeft ? "pl-12" : "pl-4"} ${
						hasIconRight || isPasswordField ? "pr-10" : "pr-4"
					}`}
					required={isRequired}
				/>
				{isPasswordField && (
					<div className="absolute inset-y-0 right-0 flex items-center px-4">
						<button onClick={togglePasswordVisibility}>
							{/* {inputType === 'password' ? iconSvg.eyeOpenSvg : iconSvg.eyeCloseSvg} */}
						</button>
					</div>
				)}
				{hasIconRight && !isPasswordField && (
					<div
						className={`absolute inset-y-0 right-0 flex items-center px-4 ${
							!isCheckbox ? "pointer-events-none" : ""
						}`}
					>
						{hasIconRight}
					</div>
				)}
			</div>
			{errorMsg && (
				<p className="mt-1 text-red-500 transition duration-150 ease-in-out">
					{errorMsg}
				</p>
			)}
		</div>
	);
};

export default TextInput;
