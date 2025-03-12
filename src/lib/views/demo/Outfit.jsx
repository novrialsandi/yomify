"use client";

import Modal from "@/lib/components/Modal";

const Outfit = ({ item, visible, onClose }) => {
	const palettes = [
		{ name: "Rustic Garnet", code: "#69362c" },
		{ name: "Clay Ember", code: "#ad764b" },
		{ name: "Rosewood", code: "#bb8b7b" },
		{ name: "Sage Whisper", code: " #706f5b" },
		{ name: "Ethernal Veil", code: "    #d5c5b5" },
	];

	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full h-full flex flex-col items-center justify-center">
				{/* <div className="w-full h-full bg-[#f5efd6] ">
					<div className="bg-[#706f5b] p-4 gap-2 flex flex-col items-center">
						<div className="flex justify-between w-full">
							<button
								onClick={onClose}
								className="text-[#f5efd6] hover:opacity-80 transition-opacity"
							>
								<svg
									width="36"
									height="36"
									viewBox="0 0 36 36"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M25 7.5L10 20L25 32.5"
										stroke="#f5efd6"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
							<h1 className="text-[#f5efd6] text-4xl font-light italic">
								Dresscode
							</h1>
						</div>

						<div className="text-[#f5efd6] text-2xl leading-tight">
							We kindly encourage our favourite people to dress in our color
							palette on our{" "}
							<span className="text-[#F0D083]">special day.</span>
						</div>
					</div>

					<div className="p-4 space-y-4">
						{palettes.map((palette) => (
							<div
								key={palette.name}
								className="flex items-center justify-between rounded-full px-4 py-4 "
								style={{ backgroundColor: palette.code }}
							>
								<div className="flex items-center">
									<div className="w-2 h-2 bg-[#f5efd6] rounded-full mr-2"></div>
									<span className="text-[#f5efd6] text-xl">{palette.name}</span>
								</div>
								<span className="text-[#f5efd6] text-xl">{palette.code}</span>
							</div>
						))}
					</div>

					<div className="pb-4  text-center">
						<h3 className="text-[#706f5b] text-4xl font-bold">
							Ethereal Elegance
						</h3>
					</div>
				</div> */}
				<button
					className="absolute top-4 left-6 size-12 "
					onClick={() => onClose()}
				/>
				<img
					src="/demo/active/dresscode.png"
					alt=""
					className="w-full h-auto max-h-svh"
				/>
			</div>
		</Modal>
	);
};

export default Outfit;
