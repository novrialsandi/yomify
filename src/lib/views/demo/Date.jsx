import Modal from "@/lib/components/Modal";

const Date = ({ item, visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full">
				<button
					className="absolute top-4 left-6 size-12 "
					onClick={() => onClose()}
				/>
				<img
					src="/demo/active/date.png"
					alt=""
					className="w-full h-auto max-h-svh"
				/>
			</div>
		</Modal>
	);
};

export default Date;
