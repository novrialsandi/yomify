import Carousel from "@/lib/components/Carausel";
import Modal from "@/lib/components/Modal";
import { Icon } from "@iconify/react";

const Camera = ({ item, visible, onClose }) => {
	return (
		<Modal
			position="center"
			padding="p-0"
			preventClose
			visible={visible}
			onClose={onClose}
		>
			<div className="relative text-white ">
				<button
					className="absolute z-50 size-8"
					style={{
						top: `17%`,
						left: `3%`,
					}}
					onClick={() => onClose()}
				>
					<Icon
						icon={"entypo:arrow-left"}
						className="w-full h-full text-[#CE4F3E]  stroke-1.5 stroke-[#FAF9DB]"
					/>
				</button>

				<Carousel hideArrow={true}>
					{item.contents.map((content, i) => (
						<div
							key={i}
							className="aspect-19/12 flex flex-col justify-center items-center"
						>
							<img
								src={content.img}
								alt={content.alt}
								className="h-full w-auto py-8"
							/>
						</div>
					))}
				</Carousel>
			</div>
		</Modal>
	);
};

export default Camera;
