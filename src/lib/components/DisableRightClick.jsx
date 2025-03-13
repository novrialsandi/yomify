import { useEffect } from "react";

const DisableRightClick = ({ children }) => {
	useEffect(() => {
		const handleContextMenu = (event) => event.preventDefault();
		const handleSelectStart = (event) => event.preventDefault();

		document.addEventListener("contextmenu", handleContextMenu);
		document.addEventListener("selectstart", handleSelectStart);

		return () => {
			document.removeEventListener("contextmenu", handleContextMenu);
			document.removeEventListener("selectstart", handleSelectStart);
		};
	}, []);

	return <div style={{ userSelect: "none" }}>{children}</div>;
};

export default DisableRightClick;
