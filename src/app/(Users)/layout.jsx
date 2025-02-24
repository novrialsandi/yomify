import pgJson from "../../../package.json";

import React from "react";

const UserLayout = ({ children }) => {
	return (
		<div className="max-w-[544px] w-full relative overflow-hidden">
			{children}
			<div className="relative flex w-full justify-end">
				<div className="fixed bottom-0 text-xs z-20 px-1 bg-white/50 rounded-tl-md">
					v{pgJson.version}
				</div>
			</div>
		</div>
	);
};

export default UserLayout;
