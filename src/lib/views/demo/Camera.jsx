import Carousel from "@/lib/components/Carausel";
import Modal from "@/lib/components/Modal";

const Camera = ({ item, visible, onClose }) => {
	return (
		<Modal
			position="center"
			padding="p-0"
			preventClose
			visible={visible}
			onClose={onClose}
		>
			<div className="text-white relative flex flex-col justify-center items-center">
				<div className="relative w-screen aspect-19/12 max-w-[calc(544px-48px)]">
					<button
						className="absolute z-50 left-3 top-8 size-6"
						onClick={() => onClose()}
					/>
					<img
						src="/demo/active/photo.png"
						alt=""
						className="absolute aspect-19/12 z-40"
					/>

					<Carousel hideArrow={true}>
						{item.contents.map((content, i) => (
							<div
								key={i} // Make sure each service item has a unique id
								className="min-w-full aspect-19/12 rounded-2xl shadow-lg gap-4 flex flex-col justify-center items-center"
							>
								<img
									src={content.img}
									alt={content.alt}
									className="h-full w-auto p-6"
								/>
							</div>
						))}
					</Carousel>
				</div>
			</div>
		</Modal>
	);
};

export default Camera;
