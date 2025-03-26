import Modal from "@/lib/components/Modal";
import Game from "@/lib/components/trex/Game";
import { Icon } from "@iconify/react";

const Trex = ({ visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative text-white flex flex-col justify-center items-center py-10">
				<button
					className="absolute z-50 size-10"
					style={{ top: `0%`, left: `0%` }}
					onClick={() => {
						onClose();
					}}
				>
					<Icon
						icon="entypo:arrow-left"
						className="w-full h-full text-[#CE4F3E] stroke-1.5 stroke-[#FAF9DB]"
					/>
				</button>
				<Game />
			</div>
		</Modal>
	);
};

export default Trex;
