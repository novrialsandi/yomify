import fetchApi from "@/lib/api/fetchApi";
import Modal from "@/lib/components/Modal";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "@/lib/helpers/cookie";
import TextInput from "@/lib/components/TextInput";
import Button from "@/lib/components/Button";

const Laptop = ({ visible, onClose }) => {
	const chatContainerRef = useRef(null);
	const pathname = usePathname();
	const slug = pathname.split("/").pop();
	const session = getCookie("session");
	const [chats, setChats] = useState([]);
	const [message, setMessage] = useState({
		message: "",
		user_id: session.user_id,
		name: session.name,
	});
	const [loadingPost, setLoadingPost] = useState(false);
	const [loadingRoom, setLoadingRoom] = useState(false);

	const getChatRoom = async () => {
		try {
			setLoadingRoom(true);
			const req = await fetchApi.get(`/chat-rooms/${slug}`);
			setChats(req.data.messages);
		} catch (error) {
			console.error("API Error:", error);
		} finally {
			setLoadingRoom(false);
		}
	};

	const postMessage = async () => {
		try {
			setLoadingPost(true);

			const req = await fetchApi.post(`/chat-rooms/${slug}`, message);

			setChats(req.data.chat_room.messages);
			setMessage((prev) => ({ ...prev, message: "" }));
		} catch (error) {
			console.error("API Error:", error);
		} finally {
			setLoadingPost(false);
		}
	};

	useEffect(() => {
		if (visible) {
			getChatRoom();
		}
	}, [visible]);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chats]);

	return (
		<Modal position="center" visible={visible} onClose={onClose} preventClose>
			<div className="relative w-full h-full bg-[#EFE7D2]">
				<button
					className="absolute z-50"
					style={{
						top: `3%`,
						left: `10%`,
						width: `15%`,
						height: "4%",
						transform: "translate(-50%, -50%)",
					}}
					onClick={() => onClose()}
				/>
				<div className="w-full flex flex-col h-full justify-center gap-2 ">
					<div className="flex flex-col w-full gap-2 h-auto max-h-svh">
						<img
							src="/demo/active/chat-header.png"
							alt=""
							className="w-full h-auto"
						/>
						<div
							className="flex flex-col space-y-2  aspect-12/18 f-full px-4 overflow-y-auto"
							ref={chatContainerRef}
						>
							{loadingRoom ? (
								<div className="w-full flex items-center aspect-12/18 justify-center">
									<div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
								</div>
							) : chats.length > 0 ? (
								chats.map((chat, index) => {
									const isMe = chat.user_id === session.user_id;

									return (
										<div
											key={index}
											className={`flex w-full ${
												isMe ? "justify-end" : "justify-start"
											}`}
										>
											<div
												className={`py-0.5 px-2 max-w-[75%] rounded-lg ${
													isMe
														? "bg-[#E4B893] text-right"
														: "bg-[#FCF9DA] text-left"
												}`}
											>
												<p className="text-sm text-black/60">{chat.name}</p>
												<p className="text-black/80">{chat.message}</p>
											</div>
										</div>
									);
								})
							) : (
								<p className="text-gray-400 text-center aspect-12/18 flex items-center justify-center">
									No messages yet.
								</p>
							)}
						</div>
					</div>

					<div>
						<div className="flex gap-2 w-full bg-[#B99D75] px-3 py-2">
							<TextInput
								value={message.message}
								onChange={(e) =>
									setMessage((prev) => ({
										...prev,
										message: e.target.value,
									}))
								}
							/>
							<Button
								size="small"
								className="max-w-24"
								onClick={() => postMessage()}
								disabled={!message.message || loadingPost}
								isLoading={loadingPost}
							>
								Send
							</Button>
						</div>
						<div className="bg-[#9C7031]"></div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default Laptop;
