import Modal from "@/lib/components/Modal";

const Outfit = ({ item, visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="text-white flex flex-col justify-center items-center p-6">
				<div>Outfit</div>
			</div>
		</Modal>
	);
};

export default Outfit;
