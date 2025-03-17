import Modal from "@/lib/components/Modal";
import { Icon } from "@iconify/react";

const Outfit = ({ visible, onClose }) => {
	const palettes = [
		{ name: "Rustic Garnet", code: "#69362c" },
		{ name: "Clay Ember", code: "#ad764b" },
		{ name: "Rosewood", code: "#bb8b7b" },
		{ name: "Sage Whisper", code: " #706f5b" },
		{ name: "Ethernal Veil", code: "    #d5c5b5" },
	];

	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative bg-[#F5F1D7] text-[#FCF9DA] aspect-12/19 w-full h-full flex flex-col items-center justify-center">
				<div className="flex flex-col w-full h-full">
					<div className="bg-[#71705C]">
						<div className="flex pt-4 pb-1 px-6 justify-between">
							<button onClick={() => onClose()} className="size-8">
								<Icon
									icon={"entypo:arrow-left"}
									className="w-full text-4xl h-full text-[#CE4F3E] shadow-2xl stroke-1.5 stroke-[#FAF9DB]"
								/>
							</button>
							<div className="text-3xl italic font-bold">Dresscode</div>
						</div>
						<div className="px-8 pb-2 text-xl">
							We kindly encourage our favourite people to dress in our color
							palette on our{" "}
							<span className="text-[#F5D485]">special day.</span>
						</div>
					</div>
					<div className="flex gap-4 py-4 flex-col items-center h-full justify-between">
						{palettes.map((color, index) => {
							return (
								<div
									key={index}
									className="w-[80%] h-full flex justify-between p-2 rounded-full px-4"
									style={{ backgroundColor: `${color.code}` }}
								>
									<div className="flex items-center gap-1">
										<div className="w-1 h-1 rounded-full bg-[#FCF9DA]"></div>
										{color.name}
									</div>
									<div className="flex items-center">{color.code}</div>
								</div>
							);
						})}
						<div className="text-[#71705C] text-3xl font-extrabold">
							Ethereal Elegance
						</div>
					</div>
				</div>
				{/* <button
					className="absolute "
					style={{
						top: `5%`,
						left: `10%`,
						width: `8%`,
						height: "4%",
						transform: "translate(-50%, -50%)",
					}}
					onClick={() => onClose()}
				/>
				<img
					src="/demo/active/dresscode.png"
					alt=""
					className="w-full h-auto max-h-svh"
				/> */}
			</div>
		</Modal>
	);
};

export default Outfit;
