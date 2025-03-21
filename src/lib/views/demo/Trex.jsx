import Modal from "@/lib/components/Modal";

const Trex = ({ visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="text-white flex flex-col justify-center items-center p-6">
				{/* {here} */}
			</div>
		</Modal>
	);
};

export default Trex;
