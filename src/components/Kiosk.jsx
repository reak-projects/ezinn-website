import React from "react";

export default function Kiosk({ position = [2.5, -0.6, 0.8] }) {
	return (
		<group position={position}>
			<mesh position={[0, 0.3, 0]}>
				<boxGeometry args={[0.9, 1.2, 0.6]} />
				<meshStandardMaterial color="#283338" />
			</mesh>
			<mesh position={[0, 0.7, 0.31]}>
				<boxGeometry args={[0.7, 0.5, 0.02]} />
				<meshStandardMaterial color="#FCFCFB" emissive="#06858F" emissiveIntensity={0.2} />
			</mesh>
		</group>
	);
}
