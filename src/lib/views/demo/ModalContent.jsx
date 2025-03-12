import Modal from "@/lib/components/Modal";
import Camera from "./Camera";
import List from "./List";
import Bottle from "./Bottle";
import Outfit from "./Outfit";
import Map from "./Map";
import Date from "./Date";

const ModalContent = ({
	contents,
	modalContent,
	toggleModal,
	openedContent,
}) => {
	return (
		<>
			{contents
				.filter((item) => item.name !== "music")
				.map((item) => {
					if (item.name === "list") {
						return (
							<List
								key={item.name}
								openedContent={openedContent}
								contents={contents}
								visible={modalContent[item.name]}
								onClose={() => toggleModal(item.name)}
							/>
						);
					} else if (item.name === "camera") {
						return (
							<Camera
								key={item.name}
								item={item}
								visible={modalContent[item.name]}
								onClose={() => toggleModal(item.name)}
							/>
						);
					} else if (item.name === "date") {
						return (
							<Date
								key={item.name}
								item={item}
								visible={modalContent[item.name]}
								onClose={() => toggleModal(item.name)}
							/>
						);
					} else if (item.name === "bottle") {
						return (
							<Bottle
								key={item.name}
								item={item}
								visible={modalContent[item.name]}
								onClose={() => toggleModal(item.name)}
							/>
						);
					} else if (item.name === "outfit") {
						return (
							<Outfit
								key={item.name}
								item={item}
								visible={modalContent[item.name]}
								onClose={() => toggleModal(item.name)}
							/>
						);
					} else if (item.name === "map") {
						return (
							<Map
								key={item.name}
								item={item}
								visible={modalContent[item.name]}
								onClose={() => toggleModal(item.name)}
							/>
						);
					} else {
						return (
							<Modal
								key={item.name}
								visible={modalContent[item.name]}
								position="center"
								onClose={() => toggleModal(item.name)}
							>
								<div className="text-white flex flex-col justify-center items-center p-6">
									<div className="whitespace-pre-line">
										{item.contents ? item.contents : item.detail}
									</div>
								</div>
							</Modal>
						);
					}
				})}
		</>
	);
};

export default ModalContent;
