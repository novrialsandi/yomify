import Modal from "@/lib/components/Modal";

const Map = ({ item, visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="text-white flex flex-col justify-center items-center p-6">
				<div className="text-xl font-semibold mb-4">
					<img src={item.img} alt="" className="h-32 w-auto" />
				</div>
				<a
					href="https://www.google.com/maps/place/Ndalem+Hanoman/@-7.7935397,110.3693196,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a59f1b125f11b:0xc4edf781ca003a86!8m2!3d-7.7935397!4d110.3718945!16s%2Fg%2F11vjpvrj_9?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D"
					target="_blank"
					rel="noreferrer"
					className="whitespace-pre-line text-blue-500 underline"
				>
					{item.detail}
				</a>
			</div>
		</Modal>
	);
};

export default Map;
