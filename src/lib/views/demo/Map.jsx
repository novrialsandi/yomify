import Modal from "@/lib/components/Modal";
import { Icon } from "@iconify/react";

const Date = ({ visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full">
				<button
					className="absolute z-50 size-10"
					style={{
						top: `3%`,
						left: `4%`,
					}}
					onClick={() => onClose()}
				>
					<Icon
						icon={"entypo:arrow-left"}
						className="w-full h-full text-[#CE4F3E]  stroke-1.5 stroke-[#FAF9DB]"
					/>
				</button>
				<img
					src="/demo/active/map.webp"
					alt=""
					className="w-full h-auto max-h-svh"
				/>
				<div className="size-20  absolute"></div>
				<a
					href="https://www.google.com/maps/place/Ndalem+Hanoman/@-7.7935397,110.3693196,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a59f1b125f11b:0xc4edf781ca003a86!8m2!3d-7.7935397!4d110.3718945!16s%2Fg%2F11vjpvrj_9?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D"
					target="_blank"
					rel="noreferrer"
					className="whitespace-pre-line absolute "
					style={{
						top: `51%`,
						left: `50%`,
						width: `28%`,
						height: "30%",
						transform: "translate(-50%, -50%)",
					}}
				></a>
			</div>
		</Modal>
	);
};

export default Date;
