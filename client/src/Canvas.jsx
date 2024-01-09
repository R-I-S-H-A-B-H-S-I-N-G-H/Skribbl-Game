import React, { useRef, useEffect } from "react";
import { CanvasUtil } from "./util/CanvasUtil";

const Canvas = (props) => {
	const { canvasHeight, canvasWidth, onUpdate, connData } = props;
	const canvasRef = useRef(null);
	const canvasInstance = useRef();
	const prevMouseRef = useRef();
	const mouseStateRef = useRef({ mouseUp: true, mouseDown: false });

	useEffect(() => {
		if (!canvasInstance.current || !connData) return;
		const { px, py, x, y, stroke } = connData;
		canvasInstance.current.stroke(100, 100, 100);
		canvasInstance.current.line(px, py, x, y, stroke);
	}, [connData]);

	useEffect(() => {
		if (!canvasRef.current) return;
		console.log("dd");
		canvasInstance.current = new CanvasUtil(canvasRef.current);
		canvasInstance.current.background(100, 100, 100, 0.6);
	}, [canvasRef]);

	function mouseMoveHandler(e) {
		if (mouseStateRef.current.mouseDown) drawLine(e);
	}

	function drawLine(e) {
		const { clientX, clientY } = e;
		if (!prevMouseRef.current)
			prevMouseRef.current = { prevX: clientX, prevY: clientY };

		const { prevX, prevY } = prevMouseRef.current;
		const canvasRect = canvasRef.current.getBoundingClientRect();
		const x = clientX - canvasRect.left;
		const y = clientY - canvasRect.top;

		const px = prevX - canvasRect.left;
		const py = prevY - canvasRect.top;
		const stroke = 8;
		canvasInstance.current.stroke(100, 100, 100);
		onUpdate({ px, py, x, y, stroke });
		canvasInstance.current.line(px, py, x, y, stroke);

		prevMouseRef.current = { prevX: clientX, prevY: clientY };
	}

	function mouseDownHandler(e) {
		mouseStateRef.current.mouseDown = true;
		mouseStateRef.current.mouseUp = false;
	}
	function mouseUpHandler(e) {
		prevMouseRef.current = null;
		mouseStateRef.current.mouseDown = false;
		mouseStateRef.current.mouseUp = true;
	}
	return (
		<canvas
			onMouseMove={mouseMoveHandler}
			onMouseDown={mouseDownHandler}
			onMouseUp={mouseUpHandler}
			height={canvasHeight}
			width={canvasWidth}
			ref={canvasRef}
			{...props}
		/>
	);
};

export default Canvas;
