export class CanvasUtil {
	constructor(canvas) {
		this.context = canvas.getContext("2d");
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
	}

	rect(x, y, w, h) {
		this.context.fillRect(x, y, w, h);
		this.context.strokeRect(x, y, w, h);
	}

	stroke(r, g, b, a = 1) {
		this.context.stroke();
		this.context.strokeStyle = `rgba(${r},${g},${b},${a})`;
	}

	fill(r, g, b, a = 1) {
		this.context.fill();
		this.context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;
	}

	background(r, g, b, a = 1) {
		this.fill(r, g, b, a);
		this.stroke(r, g, b, a);
		this.rect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	setScale(canvas, pixelRatio) {
		// canvas.width = canvas.clientWidth * pixelRatio;
		// canvas.height = canvas.clientHeight * pixelRatio;
		// canvas.getContext("2d").scale(pixelRatio,
		// pixelRatio);
		// const scale = window.devicePixelRatio;
		// console.log(scale);
		// canvas.width = Math.floor(300 * scale);
		// canvas.height = Math.floor(300 * scale);
		// const ctx = canvas.getContext("2d");
		// ctx.scale(scale, scale);
	}

	dot(x, y, weight = 5) {
		this.circle(x, y, weight);
	}

	circle(x, y, r) {
		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI);
	}

	line(prevx, prevy, curx, cury, strokeSize = 1) {
		this.context.lineCap = "round";
		this.context.lineWidth = strokeSize;
		this.context.beginPath();
		this.context.moveTo(prevx, prevy);
		this.context.lineTo(curx, cury);
		this.context.stroke();
	}
}
