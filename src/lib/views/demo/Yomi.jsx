import Modal from "@/lib/components/Modal";
import Game from "@/lib/components/trex/Game";
import { Icon } from "@iconify/react";

const Yomi = ({ visible, onClose, item }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative text-white flex flex-col justify-center items-center p-6">
				<button
					className="absolute z-50 size-10"
					style={{ top: `5%`, left: `5%` }}
					onClick={() => {
						onClose();
					}}
				>
					<Icon
						icon="entypo:arrow-left"
						className="w-full h-full text-[#CE4F3E] stroke-1.5 stroke-[#FAF9DB]"
					/>
				</button>
				<img src="/demo/active/yomi.webp" alt="" />
			</div>
		</Modal>
	);
};

export default Yomi;
