import React from "react";

export default function Guest({ position = [0, -0.6, 0], color = "#06858F" }) {
	return (
		<group position={position}>
			<mesh position={[0, 0.6, 0]}>
				<boxGeometry args={[0.6, 1.0, 0.4]} />
				<meshStandardMaterial color={color} />
			</mesh>
			<mesh position={[0, 1.4, 0]}>
				<sphereGeometry args={[0.22, 16, 16]} />
				<meshStandardMaterial color="#FCFCFB" />
			</mesh>
		</group>
	);
}
