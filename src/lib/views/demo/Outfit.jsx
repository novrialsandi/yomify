import Modal from "@/lib/components/Modal";

const Outfit = ({ visible, onClose }) => {
	// const palettes = [
	// 	{ name: "Rustic Garnet", code: "#69362c" },
	// 	{ name: "Clay Ember", code: "#ad764b" },
	// 	{ name: "Rosewood", code: "#bb8b7b" },
	// 	{ name: "Sage Whisper", code: " #706f5b" },
	// 	{ name: "Ethernal Veil", code: "    #d5c5b5" },
	// ];

	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full h-full flex flex-col items-center justify-center">
				<button
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
				/>
			</div>
		</Modal>
	);
};

export default Outfit;
