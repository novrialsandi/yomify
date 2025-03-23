import { driver } from "driver.js";
import { getCookie } from "./cookie";

const runDriverTour = (steps) => {
	const driverObj = driver({
		disableActiveInteraction: true,
		allowClose: !getCookie("intro") ? false : true,
		popoverClass: "driverjs-theme",
		showProgress: true,
		stagePadding: 0,
		steps: steps,
	});
	driverObj.drive();
};

export default runDriverTour;
