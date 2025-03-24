import React from "react";

const STATUS = {
	STOP: "STOP",
	START: "START",
	PAUSE: "PAUSE",
	OVER: "OVER",
};

const JUMP_DELTA = 5;
const JUMP_MAX_HEIGHT = 53;

export default class Game extends React.Component {
	constructor(props) {
		super(props);

		this.options = {
			fps: 60,
			skySpeed: 60,
			groundSpeed: 150,
			skyOffset: 0,
			groundOffset: 0,
			...this.props.options,
		};

		this.status = STATUS.STOP;
		this.timer = null;
		this.score = 0;
		this.highScore = window.localStorage
			? window.localStorage["highScore"] || 0
			: 0;
		this.jumpHeight = 0;
		this.jumpDelta = 0;
		this.obstaclesBase = 1;
		this.obstacles = [];
		this.currentDistance = 0;
		this.playerStatus = 0;

		// Images will be stored here once loaded
		this.images = {
			sky: null,
			ground: null,
			player: [],
			obstacle: null,
		};

		this.imagesLoaded = false;
	}

	componentDidMount() {
		if (window.innerWidth >= 680) {
			this.canvas.width = 680;
		}

		const onSpacePress = () => {
			switch (this.status) {
				case STATUS.STOP:
					this.start();
					break;
				case STATUS.START:
					this.jump();
					break;
				case STATUS.OVER:
					this.restart();
					break;
				default:
					break;
			}
		};

		window.onkeypress = (e) => {
			if (e.key === " ") {
				onSpacePress();
			}
		};

		if (this.canvas && this.canvas.parentNode) {
			this.canvas.parentNode.onclick = onSpacePress;
		}

		window.onblur = this.pause;
		window.onfocus = this.goOn;

		// Load all images
		this.__loadImages();
	}

	__loadImages() {
		// Track loaded images
		let totalImages = 7;
		let loadedImages = 0;

		const onImageLoaded = () => {
			loadedImages++;
			if (loadedImages === totalImages) {
				this.imagesLoaded = true;
				this.__draw();

				// If in STOP state, draw once to show initial scene
				if (this.status === STATUS.STOP) {
					this.__draw();
				}
			}
		};

		// Helper function to load an image
		const loadImage = (src) => {
			return new Promise((resolve) => {
				const img = new Image();
				img.onload = () => {
					resolve(img);
					onImageLoaded();
				};
				img.onerror = () => {
					console.error(`Failed to load image: ${src}`);
					// Create a placeholder image to prevent breaking
					const placeholderImg = new Image();
					placeholderImg.width = 50;
					placeholderImg.height = 50;
					resolve(placeholderImg);
					onImageLoaded();
				};
				// Use a direct path instead of require with url-loader
				img.src = src;
			});
		};

		// Load all images
		Promise.all([
			loadImage("/img/cloud.png").then((img) => (this.images.sky = img)),
			loadImage("/img/ground.png").then((img) => (this.images.ground = img)),
			loadImage("/img/dinosaur.png").then(
				(img) => (this.images.player[0] = img)
			),
			loadImage("/img/dinosaur_left.png").then(
				(img) => (this.images.player[1] = img)
			),
			loadImage("/img/dinosaur_right.png").then(
				(img) => (this.images.player[2] = img)
			),
			loadImage("/img/dinosaur_die.png").then(
				(img) => (this.images.player[3] = img)
			),
			loadImage("/img/obstacle.png").then(
				(img) => (this.images.obstacle = img)
			),
		]).catch((error) => {
			console.error("Error loading game images:", error);
		});
	}

	componentWillUnmount() {
		window.onblur = null;
		window.onfocus = null;
		window.onkeypress = null;
		this.__clearTimer();
	}

	__draw() {
		if (!this.canvas || !this.imagesLoaded) {
			return;
		}

		const { options, images } = this;

		let level = Math.min(200, Math.floor(this.score / 100));
		let groundSpeed = (options.groundSpeed + level) / options.fps;
		let skySpeed = options.skySpeed / options.fps;
		let obstacleWidth = images.obstacle ? images.obstacle.width : 0;
		let playerWidth = images.player[0] ? images.player[0].width : 0;
		let playerHeight = images.player[0] ? images.player[0].height : 0;

		const ctx = this.canvas.getContext("2d");
		const { width, height } = this.canvas;

		ctx.clearRect(0, 0, width, height);
		ctx.save();

		// Sky
		this.options.skyOffset =
			this.options.skyOffset < width
				? this.options.skyOffset + skySpeed
				: this.options.skyOffset - width;

		if (images.sky) {
			ctx.translate(-this.options.skyOffset, 0);
			ctx.drawImage(images.sky, 0, 0);
			ctx.drawImage(images.sky, images.sky.width, 0);
		}

		// Ground
		this.options.groundOffset =
			this.options.groundOffset < width
				? this.options.groundOffset + groundSpeed
				: this.options.groundOffset - width;

		if (images.ground) {
			ctx.translate(this.options.skyOffset - this.options.groundOffset, 0);
			ctx.drawImage(images.ground, 0, 76);
			ctx.drawImage(images.ground, images.ground.width, 76);
		}

		// Dinosaur
		ctx.translate(this.options.groundOffset, 0);

		if (images.player[this.playerStatus]) {
			ctx.drawImage(images.player[this.playerStatus], 80, 64 - this.jumpHeight);
		}

		// Update jump height/speed
		this.jumpHeight = this.jumpHeight + this.jumpDelta;
		if (this.jumpHeight <= 1) {
			this.jumpHeight = 0;
			this.jumpDelta = 0;
		} else if (this.jumpHeight < JUMP_MAX_HEIGHT && this.jumpDelta > 0) {
			this.jumpDelta =
				this.jumpHeight * this.jumpHeight * 0.001033 -
				this.jumpHeight * 0.137 +
				5;
		} else if (this.jumpHeight >= JUMP_MAX_HEIGHT) {
			this.jumpDelta = -JUMP_DELTA / 2.7;
		}

		// Score
		let scoreText =
			(this.status === STATUS.OVER ? "GAME OVER  " : "") +
			Math.floor(this.score);
		ctx.font = "Bold 18px Arial";
		ctx.textAlign = "right";
		ctx.fillStyle = "#595959";
		ctx.fillText(scoreText, width - 30, 23);

		if (this.status === STATUS.START) {
			this.score += 0.5;
			if (this.score > this.highScore) {
				this.highScore = this.score;
				if (window.localStorage) {
					window.localStorage["highScore"] = this.score;
				}
			}
			this.currentDistance += groundSpeed;
			if (this.score % 4 === 0) {
				this.playerStatus = (this.playerStatus + 1) % 3;
			}
		}

		if (this.highScore) {
			ctx.textAlign = "left";
			ctx.fillText("HIGH  " + Math.floor(this.highScore), 30, 23);
		}

		// Obstacles
		if (this.obstacles.length === 0 && this.status === STATUS.START) {
			this.obstacles = this.__obstaclesGenerate();
		}

		let pop = 0;
		for (let i = 0; i < this.obstacles.length; ++i) {
			if (this.currentDistance >= this.obstacles[i].distance) {
				let offset =
					width -
					(this.currentDistance - this.obstacles[i].distance + groundSpeed);
				if (offset > 0 && images.obstacle) {
					ctx.drawImage(images.obstacle, offset, 84);
				} else {
					++pop;
				}
			} else {
				break;
			}
		}

		for (let i = 0; i < pop; ++i) {
			this.obstacles.shift();
		}

		if (this.obstacles.length < 5 && this.status === STATUS.START) {
			this.obstacles = this.obstacles.concat(this.__obstaclesGenerate());
		}

		// Collision detection
		if (this.obstacles.length > 0) {
			let firstOffset =
				width -
				(this.currentDistance - this.obstacles[0].distance + groundSpeed);
			if (
				90 - obstacleWidth < firstOffset &&
				firstOffset < 60 + playerWidth &&
				64 - this.jumpHeight + playerHeight > 84
			) {
				this.stop();
			}
		}

		ctx.restore();
	}

	__obstaclesGenerate() {
		let res = [];
		for (let i = 0; i < 10; ++i) {
			let random = Math.floor(Math.random() * 100) % 60;
			random = ((Math.random() * 10) % 2 === 0 ? 1 : -1) * random;
			res.push({
				distance: random + this.obstaclesBase * 200,
			});
			++this.obstaclesBase;
		}
		return res;
	}

	__setTimer() {
		this.__clearTimer(); // Ensure no duplicate timers
		this.timer = setInterval(() => this.__draw(), 1000 / this.options.fps);
	}

	__clearTimer() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	__clear() {
		this.score = 0;
		this.jumpHeight = 0;
		this.currentDistance = 0;
		this.obstacles = [];
		this.obstaclesBase = 1;
		this.playerStatus = 0;
	}

	start = () => {
		if (this.status === STATUS.START) {
			return;
		}

		this.status = STATUS.START;
		if (this.imagesLoaded) {
			this.__setTimer();
			this.jump();
		} else {
			// Wait for images to load
			const checkImagesInterval = setInterval(() => {
				if (this.imagesLoaded) {
					clearInterval(checkImagesInterval);
					this.__setTimer();
					this.jump();
				}
			}, 100);
		}
	};

	pause = () => {
		if (this.status === STATUS.START) {
			this.status = STATUS.PAUSE;
			this.__clearTimer();
		}
	};

	goOn = () => {
		if (this.status === STATUS.PAUSE) {
			this.status = STATUS.START;
			this.__setTimer();
		}
	};

	stop = () => {
		if (this.status === STATUS.OVER) {
			return;
		}
		this.status = STATUS.OVER;
		this.playerStatus = 3;
		this.__clearTimer();
		this.__draw();
		this.__clear();
	};

	restart = () => {
		this.obstacles = this.__obstaclesGenerate();
		this.start();
	};

	jump = () => {
		if (this.jumpHeight > 2) {
			return;
		}
		this.jumpDelta = JUMP_DELTA;
		this.jumpHeight = JUMP_DELTA;
	};

	render() {
		return (
			<canvas
				id="canvas"
				ref={(ref) => (this.canvas = ref)}
				height={160}
				width={340}
			/>
		);
	}
}
