"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const Modal = ({
	position = "right",
	className,
	children,
	visible,
	onClose = () => {},
	preventClose = false,
	padding = "p-4",
}) => {
	const modalRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (preventClose) {
				return;
			} else if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose(); // Changed from onClose(false) to just onClose()
			}
		};

		// Only add the event listener if the modal is visible
		if (visible) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose, preventClose, visible]); // Added visible to dependency array

	useEffect(() => {
		if (visible) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [visible]);

	const getInitialPosition = () => {
		switch (position) {
			case "left":
				return { x: "-100%" };
			case "right":
				return { x: "100%" };
			case "top":
				return { y: "-100%" };
			case "bottom":
				return { y: "100%" };
			case "center":
				return { scale: 0.9, opacity: 0 };
			default:
				return { x: "100%" };
		}
	};

	const getAnimatePosition = () => {
		switch (position) {
			case "left":
			case "right":
				return { x: "0%" };
			case "top":
			case "bottom":
				return { y: "0%" };
			case "center":
				return { scale: 1, opacity: 1 };
			default:
				return { x: "0%" };
		}
	};

	const getExitPosition = () => {
		switch (position) {
			case "left":
				return { x: "-100%" };
			case "right":
				return { x: "100%" };
			case "top":
				return { y: "-100%" };
			case "bottom":
				return { y: "100%" };
			case "center":
				return { scale: 0.9, opacity: 0 };
			default:
				return { x: "100%" };
		}
	};

	const getModalPosition = () => {
		switch (position) {
			case "left":
				return "items-center justify-start";
			case "right":
				return "items-center justify-end";
			case "top":
				return "items-start justify-center";
			case "bottom":
				return "items-end justify-center";
			case "center":
				return "items-center justify-center";
			default:
				return "items-center justify-end";
		}
	};

	const handleClose = () => {
		if (!preventClose) {
			onClose(); // Changed from onClose(false) to just onClose()
		}
	};

	return (
		<AnimatePresence mode="wait">
			{visible && (
				<motion.div
					key="modal-overlay"
					className={`fixed  inset-0 z-[50] flex min-h-svh max-h-svh bg-black/80 ${padding} ${getModalPosition()}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					<motion.div
						key="modal-content"
						ref={modalRef}
						className={`modal-content z-10  ${className} relative my-8 min-w-[300px] max-w-[512px] overflow-hidden rounded-lg `}
						initial={getInitialPosition()}
						animate={getAnimatePosition()}
						exit={getExitPosition()}
						transition={{ type: "tween", duration: 0.3 }}
					>
						{!preventClose && (
							<Icon
								icon="mingcute:close-fill"
								className="absolute z-50 right-2 top-2 text-white text-2xl cursor-pointer"
								onClick={handleClose}
							/>
						)}
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
