import Modal from "@/lib/components/Modal";
import { Icon } from "@iconify/react";

const Amplop = ({ visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full">
				<button
					className="absolute z-50 size-10"
					style={{
						top: `6%`,
						left: `8%`,

						transform: "translate(-50%, -50%)",
					}}
					onClick={() => onClose()}
				>
					<Icon
						icon={"entypo:arrow-left"}
						className="w-full h-full text-[#CE4F3E] shadow-2xl stroke-1.5 stroke-[#FAF9DB]"
					/>
				</button>
				<img
					src="/demo/active/amplop.png"
					alt=""
					className="w-full h-auto max-h-svh"
				/>
			</div>
		</Modal>
	);
};

export default Amplop;
