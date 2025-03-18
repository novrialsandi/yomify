import Modal from "@/lib/components/Modal";
import { Icon } from "@iconify/react";

const Amplop = ({ visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative h-max text-[#86B595] bg-[#F1EDCA]  aspect-12/19 flex flex-col justify-center items-center">
				<button
					className="absolute z-50 size-10"
					style={{
						top: `3%`,
						left: `5%`,
					}}
					onClick={() => onClose()}
				>
					<Icon
						icon={"entypo:arrow-left"}
						className="w-full h-full text-[#CE4F3E]  stroke-1.5 stroke-[#FAF9DB]"
					/>
				</button>

				<div className="flex flex-col  h-full justify-center gap-8 items-center text-center">
					<img src="/demo/active/nickname.png" alt="" className="w-[50%]" />
					<div className="flex flex-col items-center text-xl gap-2">
						<div>
							<div className="text-3xl">ROMEO PURWANTO</div>
							<div>01 Januari 1991</div>
						</div>
						<img
							src="/demo/active/sign.png"
							alt=""
							className="w-[30%] h-auto"
						/>
						<div>
							<div className="text-3xl">JULIET LESTARI</div>
							<div>01 Januari 1991</div>
						</div>
					</div>

					<div>
						<div>with full hearts,</div>
						<div>joyfully invite you to their wedding</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default Amplop;
