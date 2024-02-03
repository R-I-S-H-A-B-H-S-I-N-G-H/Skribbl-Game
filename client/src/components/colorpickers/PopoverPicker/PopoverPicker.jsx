import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import useClickOutside from "../../../hooks/useClickOutside";
import styles from "./PopoverPicker.module.css";

export const PopoverPicker = ({ color, onChange }) => {
	const popover = useRef();
	const [isOpen, toggle] = useState(false);

	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);

	return (
		<div className={styles.picker}>
			{/* <h1>COLOR PICKERS</h1> */}
			<div
				className={styles.swatch}
				style={{
					backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
				}}
				onClick={() => toggle(true)}
			/>

			{isOpen && (
				<div className={styles.popover} ref={popover}>
					{/* <HexColorPicker color={color} onChange={onChange} /> */}
					<RgbaColorPicker color={color} onChange={onChange} />
				</div>
			)}
		</div>
	);
};
