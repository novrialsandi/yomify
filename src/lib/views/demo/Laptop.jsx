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

	const getChatRoom = async () => {
		try {
			const req = await fetchApi.get(`/chat-rooms/${slug}`);
			setChats(req.data.messages);
		} catch (error) {
			console.error("API Error:", error);
		}
	};

	const postMessage = async () => {
		try {
			const req = await fetchApi.post(`/chat-rooms/${slug}`, message);

			setChats(req.data.chat_room.messages);
			setMessage((prev) => ({ ...prev, message: "" }));
		} catch (error) {
			console.error("API Error:", error);
		}
	};

	console.log(chats);

	useEffect(() => {
		if (visible) {
			getChatRoom();
		}
	}, [visible]);

	useEffect(() => {
		// Scroll to bottom when new messages arrive
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chats]);

	return (
		<Modal position="center" visible={visible} onClose={onClose}>
			<div className="relative w-full text-white p-4">
				<div
					className="flex flex-col space-y-2 max-h-[400px] py-2 h-full overflow-y-auto"
					ref={chatContainerRef}
				>
					{chats.length > 0 ? (
						chats.map((chat, index) => {
							const isMe = chat.user_id === session;

							return (
								<div
									key={index}
									className={`p-2 w-full rounded-lg ${
										isMe
											? "bg-blue-500 ml-auto text-right"
											: "bg-gray-700 text-left"
									}`}
								>
									<p className="text-sm text-gray-300">{chat.name}</p>
									<p className="text-white">{chat.message}</p>
								</div>
							);
						})
					) : (
						<p className="text-gray-400 text-center">No messages yet.</p>
					)}
				</div>
				<div className="space-y-2">
					<TextInput
						onChange={(e) =>
							setMessage((prev) => ({
								...prev,
								message: e.target.value,
							}))
						}
					/>
					<Button onClick={() => postMessage()} disabled={!message.message}>
						Kirim
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default Laptop;
