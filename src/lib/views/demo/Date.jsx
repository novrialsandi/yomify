import Modal from "@/lib/components/Modal";

const Date = ({ item, visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full">
				<button
					className="absolute "
					style={{
						top: `4%`,
						left: `8%`,
						width: `8%`,
						height: "5%",
						transform: "translate(-50%, -50%)",
					}}
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
