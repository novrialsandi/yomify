import fetchApi from "@/lib/api/fetchApi";
import Modal from "@/lib/components/Modal";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getCookie, setCookie } from "@/lib/helpers/cookie";
import TextInput from "@/lib/components/TextInput";
import Button from "@/lib/components/Button";
import TextArea from "@/lib/components/TextArea";

const randomId = Date.now().toString();
const randomNumber = Math.floor(Math.random() * 90000) + 10000; // Generate 5-digit random number

if (!getCookie("session")) {
	setCookie("session", {
		user_id: randomId,
		name: `demo_${randomNumber}`,
	});
}

const Laptop = ({ visible, onClose }) => {
	const chatContainerRef = useRef(null);
	const pathname = usePathname();
	const slug = pathname.split("/").pop();
	const session = getCookie("session");
	const [chats, setChats] = useState([]);
	const [message, setMessage] = useState(() => {
		return {
			message: "",
			user_id: session.user_id,
			name: session.name,
		};
	});

	const [loadingPost, setLoadingPost] = useState(false);
	const [loadingRoom, setLoadingRoom] = useState(false);

	const getUserColor = (userId) => {
		const colors = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];
		const hash = userId
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		return colors[hash % colors.length];
	};

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
			<div className="relative w-full flex flex-col gap-2 aspect-9/16  max-h-svh bg-[#EFE7D2]">
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
				<div className="relative  flex flex-col gap-2 w-full h-full justify-between">
					<img
						src="/demo/active/chat-header.webp"
						alt=""
						className=" w-full h-auto"
					/>
					<div
						className="flex overflow-y-auto h-full flex-col space-y-2 px-4 "
						ref={chatContainerRef}
					>
						{loadingRoom ? (
							<div className="w-full h-full flex items-center  justify-center">
								<div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
							</div>
						) : chats.length > 0 ? (
							chats.map((chat, index) => {
								const isMe = chat.user_id === session.user_id;
								const userColor = getUserColor(chat.user_id);

								return (
									<div
										key={index}
										className={`flex w-full ${
											isMe ? "justify-end" : "justify-start"
										}`}
									>
										<div
											className={`px-2 py-1 max-w-[75%] rounded-t-xl ${
												isMe
													? "bg-[#E4B893] rounded-l-xl"
													: "bg-[#FCF9DA] rounded-r-xl"
											}`}
										>
											<p
												style={{ color: userColor }}
												className={`${isMe ? "text-right" : ""}`}
											>
												{chat.name}
											</p>
											<p className="text-black/80 whitespace-pre-line">
												{chat.message}
											</p>
										</div>
									</div>
								);
							})
						) : (
							<p className="text-gray-400 h-full text-center flex items-center justify-center">
								No messages yet.
							</p>
						)}
					</div>
					<div className=" flex items-end gap-2 w-full bg-[#B99D75] px-3 py-2">
						<TextArea
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
				</div>
			</div>
		</Modal>
	);
};

export default Laptop;
