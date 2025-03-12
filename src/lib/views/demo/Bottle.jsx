import React from "react";

const Bottle = ({ item }) => {
	return (
		<div className=" whitespace-pre-line">
			{item.contents ? item.contents : item.detail}
		</div>
	);
};

export default Bottle;
