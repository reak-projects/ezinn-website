import { forwardRef } from "react";

const Hotel = forwardRef(function Hotel(props, ref) {
  return (
    <group ref={ref} position={[0, -1, 0]}>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[16, 0.1, 14]} />
        <meshStandardMaterial color="#FCFCFB" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Floor Accent Tile Lines */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15.8, 13.8]} />
        <meshStandardMaterial color="#EEEEEE" wireframe wireframeLinewidth={1} opacity={0.3} transparent />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 3, -6.5]}>
        <boxGeometry args={[16, 6, 0.2]} />
        <meshStandardMaterial color="#283338" roughness={0.8} />
      </mesh>

      {/* Decorative Wall Accent Panel */}
      <mesh position={[0, 3.2, -6.38]}>
        <boxGeometry args={[14, 4, 0.05]} />
        <meshStandardMaterial color="#06858F" roughness={0.5} />
      </mesh>

      {/* Reception Desk */}
      <group position={[-3.5, 0, -2]}>
        {/* Main Desk Counter */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[3.2, 1.2, 1.0]} />
          <meshStandardMaterial color="#283338" roughness={0.4} />
        </mesh>
        {/* Desk Counter Top */}
        <mesh position={[0, 1.22, 0]}>
          <boxGeometry args={[3.4, 0.06, 1.1]} />
          <meshStandardMaterial color="#FCFCFB" roughness={0.2} />
        </mesh>
        {/* Desk Signboard */}
        <mesh position={[0, 0.6, 0.52]}>
          <planeGeometry args={[2, 0.4]} />
          <meshStandardMaterial color="#E8A05B" emissive="#E8A05B" emissiveIntensity={0.2} />
        </mesh>
        {/* Computer Screen on Reception */}
        <mesh position={[0.6, 1.45, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.05]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      </group>

      {/* Elevator Doors (Destination after check-in) */}
      <group position={[4.5, 0, -6.3]}>
        {/* Frame */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[2.2, 3.6, 0.1]} />
          <meshStandardMaterial color="#E8A05B" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Doors */}
        <mesh position={[-0.5, 1.75, 0.02]}>
          <boxGeometry args={[0.95, 3.3, 0.05]} />
          <meshStandardMaterial color="#283338" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.5, 1.75, 0.02]}>
          <boxGeometry args={[0.95, 3.3, 0.05]} />
          <meshStandardMaterial color="#283338" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
});

export default Hotel;
