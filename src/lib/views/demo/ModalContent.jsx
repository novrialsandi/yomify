import Modal from "@/lib/components/Modal";
import Camera from "./Camera";
import { setCookie, getCookie } from "@/lib/helpers/cookie";

const ModalContent = ({ contents, modalContent, toggleModal, toggleMusic }) => {
	const boarding = getCookie("boarding");

	return (
		<>
			{contents
				.filter((item) => item.name !== "music")
				.map((item) => (
					<Modal
						key={item.name}
						visible={modalContent[item.name]}
						position="center"
						onClose={() => toggleModal(item.name)}
						preventClose={!boarding}
					>
						<div className="text-white flex flex-col justify-center items-center p-6">
							{/* <div className="text-xl font-semibold mb-4">
								<img src={item.img} alt="" className="h-32 w-auto" />
							</div> */}
							{item.name === "globe" ? (
								<a
									href="https://www.google.com/maps/place/Ndalem+Hanoman/@-7.7935397,110.3693196,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a59f1b125f11b:0xc4edf781ca003a86!8m2!3d-7.7935397!4d110.3718945!16s%2Fg%2F11vjpvrj_9?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D"
									target="_blank"
									rel="noreferrer"
									className=" whitespace-pre-line text-blue-500 underline"
								>
									{item.detail}
								</a>
							) : item.name === "camera" ? (
								<Camera item={item} />
							) : item.name === "bottle" ? (
								<>
									<div className=" whitespace-pre-line">
										{item.contents ? item.contents : item.detail}
									</div>

									{!boarding && (
										<>
											<br />

											<button
												onClick={() => {
													if (!modalContent.music) {
														toggleMusic();
													}
													toggleModal(item.name);
													// setBoarding(true);
													setCookie("boarding", true);
												}}
												className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
											>
												✅ Accept Invitation
											</button>
										</>
									)}
								</>
							) : (
								<div className=" whitespace-pre-line">
									{item.contents ? item.contents : item.detail}
								</div>
							)}
						</div>
					</Modal>
				))}
		</>
	);
};

export default ModalContent;
