import Modal from "@/lib/components/Modal";

const ModalList = ({ isVisible, contents, openedContent }) => {
	return (
		<Modal visible={isVisible} preventClose position="center">
			<div className="flex flex-col items-center justify-center text-white text-center py-4 px-6">
				<h2 className="text-xl font-semibold mb-4">Content Details</h2>
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b border-gray-300">
							<th className="px-4 py-2 text-center">Object</th>
							<th className="px-4 py-2 text-center">Description</th>
						</tr>
					</thead>
					<tbody>
						{contents.map((item, i) => (
							<tr key={i} className="border-b border-gray-300">
								<td className="px-4 h-10 py-1.5 flex items-center justify-center">
									{openedContent[item.name] ? (
										<img src={item.img} alt="" className="h-full w-auto" />
									) : (
										"????"
									)}
								</td>
								<td className="px-4 h-10">
									{openedContent[item.name] ? (
										item.name === "globe" ? (
											<a
												href="https://www.google.com/maps/place/Ndalem+Hanoman/@-7.7935397,110.3693196,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a59f1b125f11b:0xc4edf781ca003a86!8m2!3d-7.7935397!4d110.3718945!16s%2Fg%2F11vjpvrj_9?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D"
												target="_blank"
												rel="noreferrer"
											>
												{item.detail}
											</a>
										) : (
											item.detail
										)
									) : (
										"????"
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Modal>
	);
};

export default ModalList;
