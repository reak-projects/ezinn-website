import React from "react";

export default function Hotel({ position = [0, -0.6, -4] }) {
	return (
		<group position={position}>
			<mesh position={[-2, 0.6, 0]}>
				<boxGeometry args={[3, 1.2, 0.5]} />
				<meshStandardMaterial color="#283338" />
			</mesh>
			<mesh position={[2, 0.6, 0]}>
				<boxGeometry args={[3, 1.2, 0.5]} />
				<meshStandardMaterial color="#283338" />
			</mesh>
			<mesh position={[0, 0.2, 0.6]}>
				<boxGeometry args={[6.5, 0.6, 1.5]} />
				<meshStandardMaterial color="#06858F" />
			</mesh>
		</group>
	);
}
