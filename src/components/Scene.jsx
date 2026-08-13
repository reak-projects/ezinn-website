import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const COLORS = {
	bg: "#EEEEEE",
	dark: "#283338",
	teal: "#06858F",
	orange: "#E8A05B",
	white: "#FCFCFB",
};

function lerp(a, b, t) {
	return a + (b - a) * t;
}

export default function Scene() {
	const hotel = useRef();
	const guest = useRef();
	const kiosk = useRef();
	const key = useRef();
	const scroll = useScroll();
	const triggered = useRef({ kiosk: false, key: false });

	useFrame((state, delta) => {
		const p = scroll.offset; // 0 - 1

		// hotel sits in the back, slight parallax
		if (hotel.current) {
			hotel.current.position.z = lerp(-2, -6, p * 0.3);
			hotel.current.rotation.y = lerp(0, 0.05, p);
		}

		// guest enters between 0.15 - 0.30
		if (guest.current) {
			const t = THREE.MathUtils.clamp((p - 0.15) / 0.15, 0, 1);
			guest.current.position.x = lerp(-3.5, -1.2, t);
			guest.current.position.z = lerp(2, 0.8, t);
			guest.current.rotation.y = lerp(0.2, -0.2, t);
		}

		// reception empty reveal shift between 0.30 - 0.45
		if (kiosk.current) {
			const tReveal = THREE.MathUtils.clamp((p - 0.45) / 0.15, 0, 1);
			kiosk.current.position.x = lerp(2.5, 1.2, tReveal);
			kiosk.current.position.z = lerp(0.8, 0.2, tReveal);
			kiosk.current.rotation.y = lerp(0.2, 0, tReveal);

			// approach from 60-75%
			const tApproach = THREE.MathUtils.clamp((p - 0.6) / 0.15, 0, 1);
			kiosk.current.position.x = lerp(1.2, 0.6, tApproach);
			kiosk.current.position.z = lerp(0.2, -0.2, tApproach);
		}

		// key appears during check-in 75-90%
		if (key.current) {
			const tKey = THREE.MathUtils.clamp((p - 0.75) / 0.15, 0, 1);
			key.current.position.y = lerp(-0.6, 0.6, tKey);
			key.current.rotation.z += delta * 1.2;
			key.current.position.x = lerp(0.6, -1.2, tKey);
		}

		// Trigger a GSAP pop when kiosk reveals
		if (p > 0.45 && !triggered.current.kiosk) {
			triggered.current.kiosk = true;
			if (kiosk.current) {
				gsap.fromTo(kiosk.current.scale, { x: 0.6, y: 0.6, z: 0.6 }, { x: 1, y: 1, z: 1, duration: 0.6, ease: "power2.out" });
			}
		}

		// Trigger key spin/pop when check-in completes
		if (p > 0.75 && !triggered.current.key) {
			triggered.current.key = true;
			if (key.current) {
				gsap.fromTo(key.current.rotation, { z: 1.4 }, { z: 0.4, duration: 0.7, ease: "elastic.out(1,0.6)" });
				gsap.to(key.current.position, { y: 0.6, duration: 0.7, ease: "power2.out" });
			}
		}

		// subtle camera parallax via global scene rotation
		state.scene.rotation.y = lerp(0, -0.06, p);
	});

	return (
		<>
			<fog attach="fog" args={[COLORS.bg, 6, 18]} />

			{/* floor */}
			<mesh rotation-x={-Math.PI / 2} position={[0, -1.1, 0]} receiveShadow>
				<planeGeometry args={[40, 40]} />
				<meshStandardMaterial color={COLORS.white} metalness={0.1} roughness={0.9} />
			</mesh>

			{/* hotel / reception background */}
			<group ref={hotel} position={[0, -0.6, -4]}>
				<mesh position={[-2, 0.6, 0]}>
					<boxGeometry args={[3, 1.2, 0.5]} />
					<meshStandardMaterial color={COLORS.dark} />
				</mesh>
				<mesh position={[2, 0.6, 0]}>
					<boxGeometry args={[3, 1.2, 0.5]} />
					<meshStandardMaterial color={COLORS.dark} />
				</mesh>
				<mesh position={[0, 0.2, 0.6]}>
					<boxGeometry args={[6.5, 0.6, 1.5]} />
					<meshStandardMaterial color={COLORS.teal} />
				</mesh>
			</group>

			{/* kiosk */}
			<group ref={kiosk} position={[2.5, -0.6, 0.8]}>
				<mesh position={[0, 0.3, 0]}>
					<boxGeometry args={[0.9, 1.2, 0.6]} />
					<meshStandardMaterial color={COLORS.dark} />
				</mesh>
				<mesh position={[0, 0.7, 0.31]}>
					<boxGeometry args={[0.7, 0.5, 0.02]} />
					<meshStandardMaterial color={COLORS.white} emissive={COLORS.teal} emissiveIntensity={0.2} />
				</mesh>
			</group>

			{/* guest */}
			<group ref={guest} position={[-3.5, -0.6, 2]}>
				<mesh position={[0, 0.6, 0]}>
					<boxGeometry args={[0.6, 1.0, 0.4]} />
					<meshStandardMaterial color={COLORS.teal} />
				</mesh>
				<mesh position={[0, 1.4, 0]}>
					<sphereGeometry args={[0.22, 16, 16]} />
					<meshStandardMaterial color={COLORS.white} />
				</mesh>
				<mesh position={[-0.6, 0.1, 0.2]} rotation={[0, 0, -0.2]}>
					<boxGeometry args={[0.3, 0.3, 0.18]} />
					<meshStandardMaterial color={COLORS.orange} />
				</mesh>
			</group>

			{/* room key */}
			<mesh ref={key} position={[0.6, -0.6, -0.2]} rotation={[0, 0, 0.4]}>
				<boxGeometry args={[0.9, 0.05, 0.5]} />
				<meshStandardMaterial color={COLORS.orange} metalness={0.2} />
			</mesh>
		</>
	);
}
