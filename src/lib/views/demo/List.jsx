import Modal from "@/lib/components/Modal";

const ModalList = ({ contents, openedContent, visible, onClose }) => {
	return (
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="text-white flex flex-col justify-center items-center p-6">
				<div className="flex flex-col items-center justify-center text-white text-center py-4 px-6">
					<h2 className="text-xl font-semibold mb-4">Wedding Details</h2>
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-gray-300">
								<th className="px-4 py-2 text-center">Discovered</th>
								<th className="px-4 py-2 text-center">Detail</th>
							</tr>
						</thead>
						<tbody>
							{contents
								.filter((item) => !item.trivia)
								.map((item, i) => (
									<tr key={i} className="border-b border-gray-300">
										<td className="px-4 h-10 py-1.5 flex items-center justify-center">
											{openedContent[item.name] ? (
												<img src={item.img} alt="" className="h-full w-auto" />
											) : (
												"????"
											)}
										</td>
										<td className="px-4 h-10">
											{openedContent[item.name] ? item.detail : "????"}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</Modal>
	);
};

export default ModalList;
