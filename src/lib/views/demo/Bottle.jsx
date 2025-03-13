import Modal from "@/lib/components/Modal";

const Bottle = ({ item, visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="text-white flex flex-col justify-center items-center p-6">
				<div className=" whitespace-pre-line">
					{item.contents ? item.contents : item.detail}
				</div>
				{/* <img
					src="/demo/active/Botol.png"
					alt=""
					className="w-full h-auto max-h-svh"
				/> */}
			</div>
		</Modal>
	);
};

export default Bottle;
