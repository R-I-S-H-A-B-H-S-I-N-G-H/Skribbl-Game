import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
	const { canvasheight, canvaswidth, onupdate = () => {}, conndata, backgroundcolor = {}, strokecolor = {} } = props;
	const canvasRef = useRef(null);
	const canvasUtilRef = useRef(null);
	const mouseState = useRef({});

	useEffect(() => {
		if (canvasUtilRef.current) return;
		canvasUtilRef.current = window.CanvasUtil.getCanvasInstance(canvasRef.current);
		setBackGround(backgroundcolor.r, backgroundcolor.g, backgroundcolor.b);
		canvasUtilRef.current.onMouseMove((e) => {
			mouseState.current = e;
		});
	});

	const onMouseDown = (e) => {
		const { px, py, x, y } = e;
		const stroke = 10;
		setStrokeColor(strokecolor.r, strokecolor.g, strokecolor.b);
		drawLine(px, py, x, y, stroke);
		const colorInfo = {
			strokeColor: strokecolor,
			backgroundColor: backgroundcolor,
		};
		onupdate({ px, py, x, y, stroke, colorInfo });
	};

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
		if (!canvasUtilRef.current || !conndata) return;
		const { px, py, x, y, stroke, colorInfo } = conndata;
		const { backgroundColor, strokeColor } = colorInfo;
		setStrokeColor(strokeColor.r, strokeColor.g, strokeColor.b);
		drawLine(px, py, x, y, stroke);
	}, [conndata]);

	function onMouseMove() {
		const { up } = mouseState.current;
		if (!up) onMouseDown(mouseState.current);
	}
	return <canvas onMouseMove={onMouseMove} height={canvasheight} width={canvaswidth} ref={canvasRef} {...props} />;
};

export default Canvas;
