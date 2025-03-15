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
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="relative w-full text-white p-4">
				<div
					className="flex flex-col space-y-2  max-h-[400px] h-svh py-2  overflow-y-auto"
					ref={chatContainerRef}
				>
					{loadingRoom ? (
						<div className="w-full flex items-center h-svh justify-center">
							<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
						<p className="text-gray-400 text-center h-svh flex items-center justify-center">
							No messages yet.
						</p>
					)}
				</div>
				<div className="space-y-2">
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
						onClick={() => postMessage()}
						disabled={!message.message || loadingPost}
						isLoading={loadingPost}
					>
						Kirim
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default Laptop;
