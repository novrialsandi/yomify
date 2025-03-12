import Carousel from "@/lib/components/Carausel";
import Modal from "@/lib/components/Modal";

const Camera = ({ item, visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="text-white flex flex-col justify-center items-center p-6">
				<div className="w-[calc(100vw-64px)] max-w-[calc(544px-48px)]">
					<Carousel>
						{item.contents.map((content, i) => (
							<div
								key={i} // Make sure each service item has a unique id
								className="min-w-full  h-[260px] rounded-2xl shadow-lg p-6 gap-4 flex flex-col justify-center items-center"
							>
								<img src={content.img} alt={content.alt} className="h-24" />
							</div>
						))}
					</Carousel>
				</div>
			</div>
		</Modal>
	);
};

export default Camera;
