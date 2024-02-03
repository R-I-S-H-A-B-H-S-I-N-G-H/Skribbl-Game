import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
	const { canvasHeight, canvasWidth, onUpdate, connData, backgroundColor, strokeColor } = props;
	const canvasRef = useRef(null);
	const canvasUtilRef = useRef(null);

	useEffect(() => {
		if (canvasUtilRef.current) return;
		canvasUtilRef.current = window.CanvasUtil.getCanvasInstance(canvasRef.current);
		setBackGround(backgroundColor.r, backgroundColor.g, backgroundColor.b);
		canvasUtilRef.current.onMouseMove((e) => {
			const { up } = e;
			if (!up) onMouseDown(e);
		});
	});

	function onMouseDown(e) {
		const { px, py, x, y } = e;
		const stroke = 10;
		setStrokeColor(strokeColor.r, strokeColor.g, strokeColor.b);
		drawLine(px, py, x, y, stroke);
		const colorInfo = {
			strokeColor,
			backgroundColor,
		};
		onUpdate({ px, py, x, y, stroke, colorInfo });
	}

	function setStrokeColor(r, g, b) {
		if (!canvasUtilRef.current) return;
		canvasUtilRef.current.stroke(r, g, b);
	}

	function setBackGround(r, g, b, a = 1) {
		if (!canvasUtilRef.current) return;
		canvasUtilRef.current.background(r, g, b, a);
	}

	function drawLine(x1, y1, x2, y2, stroke = 2) {
		if (!canvasUtilRef.current) return;
		canvasUtilRef.current.line(x1, y1, x2, y2, stroke);
	}

	// receiving data
	useEffect(() => {
		if (!canvasUtilRef.current || !connData) return;
		const { px, py, x, y, stroke, colorInfo } = connData;
		const { backgroundColor, strokeColor } = colorInfo;
		setStrokeColor(strokeColor.r, strokeColor.g, strokeColor.b);
		drawLine(px, py, x, y, stroke);
	}, [connData]);

	return <canvas height={canvasHeight} width={canvasWidth} ref={canvasRef} {...props} />;
};

export default Canvas;
