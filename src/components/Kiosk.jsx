import { forwardRef } from "react";

const Kiosk = forwardRef(function Kiosk({ isHighlighted = false, checkInStep = 0 }, ref) {
  return (
    <group ref={ref} position={[2.5, 0, -1]}>
      {/* Base Stand */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.16, 32]} />
        <meshStandardMaterial color="#283338" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Main Body */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.65, 1.9, 0.35]} />
        <meshStandardMaterial color="#283338" metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Kiosk Side Accent Trims (Primary Teal) */}
      <mesh position={[-0.34, 1.1, 0]}>
        <boxGeometry args={[0.03, 1.88, 0.36]} />
        <meshStandardMaterial color="#06858F" />
      </mesh>
      <mesh position={[0.34, 1.1, 0]}>
        <boxGeometry args={[0.03, 1.88, 0.36]} />
        <meshStandardMaterial color="#06858F" />
      </mesh>

      {/* Main Screen */}
      <mesh position={[0, 1.5, 0.18]}>
        <boxGeometry args={[0.52, 0.72, 0.02]} />
        <meshStandardMaterial
          color="#06858F"
          emissive="#06858F"
          emissiveIntensity={checkInStep > 0 ? 0.8 : 0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Screen Frame Bezel */}
      <mesh position={[0, 1.5, 0.17]}>
        <boxGeometry args={[0.58, 0.78, 0.02]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Passport / ID Scanner Slot */}
      <mesh position={[0, 1.02, 0.18]}>
        <boxGeometry args={[0.42, 0.08, 0.04]} />
        <meshStandardMaterial
          color={checkInStep === 2 ? "#E8A05B" : "#111827"}
          emissive={checkInStep === 2 ? "#E8A05B" : "#000000"}
          emissiveIntensity={checkInStep === 2 ? 0.8 : 0}
        />
      </mesh>

      {/* Payment Terminal Slot */}
      <mesh position={[0, 0.82, 0.18]}>
        <boxGeometry args={[0.38, 0.12, 0.05]} />
        <meshStandardMaterial
          color={checkInStep === 3 ? "#E8A05B" : "#1F2937"}
          emissive={checkInStep === 3 ? "#E8A05B" : "#000000"}
          emissiveIntensity={checkInStep === 3 ? 0.8 : 0}
        />
      </mesh>

      {/* Room Key Dispenser Slot */}
      <mesh position={[0, 0.6, 0.18]}>
        <boxGeometry args={[0.3, 0.05, 0.04]} />
        <meshStandardMaterial
          color={checkInStep === 4 ? "#E8A05B" : "#111827"}
          emissive={checkInStep === 4 ? "#E8A05B" : "#000000"}
          emissiveIntensity={checkInStep === 4 ? 0.9 : 0}
        />
      </mesh>

      {/* Keycard emerging from slot during Step 4 */}
      {checkInStep === 4 && (
        <mesh position={[0, 0.6, 0.22]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.14, 0.09, 0.01]} />
          <meshStandardMaterial color="#06858F" emissive="#06858F" emissiveIntensity={0.8} />
        </mesh>
      )}

      {/* Discovery Spotlight Ring (Scene 3 highlight) */}
      {isHighlighted && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.1, 32]} />
          <meshStandardMaterial color="#E8A05B" emissive="#E8A05B" emissiveIntensity={1.2} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
});

export default Kiosk;
