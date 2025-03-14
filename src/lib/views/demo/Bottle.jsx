import Modal from "@/lib/components/Modal";

const Bottle = ({ visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full h-full flex flex-col items-center justify-center">
				<button
					className="absolute left-1/2 top-[75%] translate-x-[-50%] size-20 w-32"
					style={{
						top: `81%`,
						left: `50%`,
						width: `33%`,
						height: "12%",
						transform: "translate(-50%, -50%)",
					}}
					onClick={onClose}
				/>
				<img
					src="/demo/intro.jpeg"
					alt=""
					className="w-full h-auto max-h-svh"
				/>
			</div>
		</Modal>
	);
};

export default Bottle;
