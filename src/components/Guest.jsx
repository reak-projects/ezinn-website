import { forwardRef } from "react";

const Guest = forwardRef(function Guest({ hasKey = false }, ref) {
  return (
    <group ref={ref} position={[-4, 0, 3]}>
      {/* Head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#FCFCFB" roughness={0.3} />
      </mesh>

      {/* Body / Torso */}
      <mesh position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.26, 0.65, 8, 16]} />
        <meshStandardMaterial color="#283338" roughness={0.5} />
      </mesh>

      {/* Luggage (Rolling suitcase) */}
      <group position={[0.45, 0.35, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.32, 0.55, 0.24]} />
          <meshStandardMaterial color="#E8A05B" roughness={0.4} />
        </mesh>
        {/* Luggage Handle */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.04, 0.3, 0.04]} />
          <meshStandardMaterial color="#283338" />
        </mesh>
        {/* Wheels */}
        <mesh position={[-0.1, -0.3, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.05, 12]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[0.1, -0.3, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.05, 12]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      </group>

      {/* Room Keycard in hand (Visible upon completion) */}
      {hasKey && (
        <mesh position={[-0.35, 1.1, 0.2]} rotation={[0.2, -0.4, 0.3]}>
          <boxGeometry args={[0.12, 0.08, 0.01]} />
          <meshStandardMaterial color="#06858F" emissive="#06858F" emissiveIntensity={0.6} />
        </mesh>
      )}
    </group>
  );
});

export default Guest;
