import Modal from "@/lib/components/Modal";
import { Icon } from "@iconify/react";

const Date = ({ visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full ">
				<button
					className="absolute z-50 size-12"
					style={{
						top: `4%`,
						left: `7%`,

						transform: "translate(-50%, -50%)",
					}}
					onClick={() => onClose()}
				>
					<Icon
						icon={"entypo:arrow-left"}
						className="w-full h-full text-[#CE4F3E]  stroke-1.5 stroke-[#FAF9DB]"
					/>
				</button>
				<div
					className="absolute bg-[#F6D69D] -z-10"
					style={{
						width: `100%`,
						height: "75%",
					}}
				></div>
				<div
					className="absolute bg-[#D04E40] -z-10"
					style={{
						bottom: "0%",
						width: `100%`,
						height: "25%",
					}}
				></div>
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
					src="/demo/active/date.webp"
					alt=""
					className="w-full h-auto max-h-svh"
				/>
			</div>
			{/* <Modal position="center" visible={visible} onClose={onClose} preventClose>
            <div className="relative flex flex-col justify-between items-center text-center aspect-12/19 bg-[#F6D58C] ">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div
                        className="text-[#FCF9DA] text-9xl font-bold"
                        style={{
                            textShadow: `
            4px 4px 0 #D04E40,  
            -4px -4px 0 #D04E40,  
            -4px 4px 0 #D04E40,  
            4px -4px 0 #D04E40`,
                        }}
                    >
                        31
                    </div>
                    <div>FEBRUARI</div>
                    <div>2025</div>
                </div>
                <div className="p-4 italic w-full text-4xl bg-[#D04E40] text-[#FCF9DA]">
                    <div>09:00 - 11:00</div>
                    <div>WIB</div>
                </div>
            </div> */}
		</Modal>
	);
};

export default Date;
