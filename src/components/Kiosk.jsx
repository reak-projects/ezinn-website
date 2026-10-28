import { forwardRef } from "react";

const Kiosk = forwardRef(function Kiosk({ isHighlighted = false, checkInStep = 0 }, ref) {
  return (
    <group ref={ref} position={[2.5, 0, -1]}>
      {/* Base Stand Plinth */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.48, 0.54, 0.1, 32]} />
        <meshStandardMaterial color="#1E252B" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Base Glowing Teal Accent Ring (Matches real kiosk illuminated base) */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.03, 32]} />
        <meshStandardMaterial color="#00C4D4" emissive="#00C4D4" emissiveIntensity={0.8} />
      </mesh>

      {/* Main White Body Chassis (Matches real white kiosk body) */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.66, 1.6, 0.38]} />
        <meshStandardMaterial color="#F4F6F8" roughness={0.3} metalness={0.15} />
      </mesh>

      {/* Kiosk Side Accent Trims (Primary Teal) */}
      <mesh position={[-0.34, 0.95, 0]}>
        <boxGeometry args={[0.02, 1.58, 0.39]} />
        <meshStandardMaterial color="#008e9b" />
      </mesh>
      <mesh position={[0.34, 0.95, 0]}>
        <boxGeometry args={[0.02, 1.58, 0.39]} />
        <meshStandardMaterial color="#008e9b" />
      </mesh>

      {/* Top Console Module (Dark charcoal housing on real kiosk) */}
      <mesh position={[0, 1.82, 0.02]}>
        <boxGeometry args={[0.64, 0.22, 0.36]} />
        <meshStandardMaterial color="#1E252B" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Upright Touchscreen Bezel */}
      <mesh position={[0, 2.16, 0.05]}>
        <boxGeometry args={[0.46, 0.62, 0.03]} />
        <meshStandardMaterial color="#151A1E" roughness={0.3} />
      </mesh>

      {/* Interactive Touchscreen Display */}
      <mesh position={[0, 2.16, 0.07]}>
        <boxGeometry args={[0.42, 0.56, 0.01]} />
        <meshStandardMaterial
          color="#008e9b"
          emissive="#008e9b"
          emissiveIntensity={checkInStep > 0 ? 0.9 : 0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Passport / ID Scanner Slot */}
      <mesh position={[0, 1.35, 0.2]}>
        <boxGeometry args={[0.38, 0.07, 0.04]} />
        <meshStandardMaterial
          color={checkInStep === 2 ? "#F2953E" : "#1E252B"}
          emissive={checkInStep === 2 ? "#F2953E" : "#000000"}
          emissiveIntensity={checkInStep === 2 ? 0.9 : 0}
        />
      </mesh>

      {/* Payment Terminal Slot (EMV & NFC) */}
      <mesh position={[0, 1.15, 0.2]}>
        <boxGeometry args={[0.34, 0.1, 0.05]} />
        <meshStandardMaterial
          color={checkInStep === 3 ? "#F2953E" : "#1F2937"}
          emissive={checkInStep === 3 ? "#F2953E" : "#000000"}
          emissiveIntensity={checkInStep === 3 ? 0.9 : 0}
        />
      </mesh>

      {/* Room Key Dispenser Slot */}
      <mesh position={[0, 0.92, 0.2]}>
        <boxGeometry args={[0.28, 0.05, 0.04]} />
        <meshStandardMaterial
          color={checkInStep === 4 ? "#F2953E" : "#1E252B"}
          emissive={checkInStep === 4 ? "#F2953E" : "#000000"}
          emissiveIntensity={checkInStep === 4 ? 0.9 : 0}
        />
      </mesh>

      {/* Keycard emerging from slot during Step 4 */}
      {checkInStep === 4 && (
        <mesh position={[0, 0.92, 0.24]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.14, 0.09, 0.01]} />
          <meshStandardMaterial color="#008e9b" emissive="#008e9b" emissiveIntensity={0.8} />
        </mesh>
      )}

      {/* Discovery Spotlight Ring (Scene 3 highlight) */}
      {isHighlighted && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.1, 32]} />
          <meshStandardMaterial color="#F2953E" emissive="#F2953E" emissiveIntensity={1.2} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
});

export default Kiosk;
