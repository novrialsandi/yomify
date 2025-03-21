import HorizontalTimeline from "@/lib/components/HorizontalTimeline";
import Modal from "@/lib/components/Modal";
import { Icon } from "@iconify/react";
import { useState } from "react";

const Amplop = ({ visible, onClose }) => {
	const [story, setStory] = useState(false);

	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative aspect-9/16  w-auto text-[#86B595] bg-[#F1EDCA] flex flex-col justify-center items-center">
				<button
					className="absolute z-50 size-10"
					style={{ top: `3%`, left: `5%` }}
					onClick={() => {
						onClose();
						setStory(false);
					}}
				>
					<Icon
						icon="entypo:arrow-left"
						className="w-full h-full text-[#CE4F3E] stroke-1.5 stroke-[#FAF9DB]"
					/>
				</button>

				{story ? (
					<div className="flex flex-col w-full h-full justify-around gap-8 items-center text-center p-8">
						<h2 className="text-3xl font-bold w-full">Our Love Story</h2>

						<HorizontalTimeline />

						<button
							className="px-2 py-1 bg-[#86B595] text-white rounded-lg"
							onClick={() => setStory(false)}
						>
							Back to Invitation
						</button>
					</div>
				) : (
					// Tampilan Undangan
					<div className="flex flex-col h-full justify-center gap-8 items-center text-center">
						<img src="/demo/active/nickname.webp" alt="" className="w-[50%]" />
						<div className="flex flex-col items-center text-xl gap-2">
							<div>
								<div className="text-3xl">ROMEO PURWANTO</div>
								<div>01 Januari 1991</div>
							</div>
							<img
								src="/demo/active/sign.webp"
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

						<button
							className="px-2 py-1 bg-[#86B595] text-white rounded-lg"
							onClick={() => setStory(true)}
						>
							Read Our Story
						</button>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default Amplop;
