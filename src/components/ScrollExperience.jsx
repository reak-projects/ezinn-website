import React from "react";
import { ScrollControls } from "@react-three/drei";

export default function ScrollExperience({ pages = 6, children }) {
	return <ScrollControls pages={pages}>{children}</ScrollControls>;
}
