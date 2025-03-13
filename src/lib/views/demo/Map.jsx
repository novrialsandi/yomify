import Modal from "@/lib/components/Modal";

const Date = ({ item, visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="relative w-full">
				{/* <button
					className="absolute top-4 left-6 size-12 "
					onClick={() => onClose()}
				/> */}
				<img
					src="/demo/active/map.png"
					alt=""
					className="w-full h-auto max-h-svh"
				/>
				<div className="size-20  absolute"></div>
				<a
					href="https://www.google.com/maps/place/Ndalem+Hanoman/@-7.7935397,110.3693196,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a59f1b125f11b:0xc4edf781ca003a86!8m2!3d-7.7935397!4d110.3718945!16s%2Fg%2F11vjpvrj_9?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D"
					target="_blank"
					rel="noreferrer"
					className="whitespace-pre-line absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-40 "
				></a>
			</div>
		</Modal>
	);
};

export default Date;
