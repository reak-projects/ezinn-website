import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Hotel from "./Hotel";
import Guest from "./Guest";
import Kiosk from "./Kiosk";

export default function Scene({ progress = 0 }) {
  const hotelRef = useRef();
  const guestRef = useRef();
  const kioskRef = useRef();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;

  useFrame((state) => {
    const p = Math.max(0, Math.min(1, progress));

    // Target Camera Vectors
    const camPos = new THREE.Vector3();
    const lookAtPos = new THREE.Vector3();

    // Scene 1: Arrival (0.00 - 0.15)
    if (p < 0.15) {
      const t = p / 0.15;
      camPos.set(isMobile ? 0 : 0, isMobile ? 2.9 : 3.5, isMobile ? 6.5 : 8.5);
      lookAtPos.set(0, 1.2, 0);

      if (guestRef.current) {
        guestRef.current.position.set(-5.5 + t * (isMobile ? 1.6 : 2), 0, isMobile ? 2.4 : 4);
        guestRef.current.rotation.y = Math.PI / 4;
      }
    }
    // Scene 2: Problem - Empty Reception (0.15 - 0.35)
    else if (p < 0.35) {
      const t = (p - 0.15) / 0.20;
      camPos.set(isMobile ? -1.8 : -2.5, isMobile ? 2.1 : 2.5, isMobile ? 4.4 : 5.5);
      lookAtPos.set(-3.5, 1.2, -1.5);

      if (guestRef.current) {
        guestRef.current.position.set(-3.6 + t * (isMobile ? 1.2 : 1.0), 0, isMobile ? 1.8 - t * 1.1 : 1 - t * 1.5);
        guestRef.current.rotation.y = 0;
      }
    }
    // Scene 3: Discovery - EZinn Kiosk (0.35 - 0.55)
    else if (p < 0.55) {
      const t = (p - 0.35) / 0.20;
      camPos.set(isMobile ? 0.4 : 0.5, isMobile ? 2.2 : 2.8, isMobile ? 4.8 : 6.0);
      lookAtPos.set(2.5, 1.3, -1);

      if (guestRef.current) {
        guestRef.current.position.set(-2.2 + t * (isMobile ? 2.0 : 2), 0, isMobile ? -0.1 : -0.5);
        guestRef.current.rotation.y = Math.PI / 3;
      }
    }
    // Scene 4: Approach (0.55 - 0.70)
    else if (p < 0.70) {
      const t = (p - 0.55) / 0.15;
      camPos.set(isMobile ? 1.4 + t * 0.2 : 2.0 + t * 0.2, isMobile ? 1.4 - t * 0.18 : 1.8 - t * 0.2, isMobile ? 1.9 - t * 0.4 : 2.2 - t * 0.6);
      lookAtPos.set(2.5, 1.5, -1);

      if (guestRef.current) {
        guestRef.current.position.set(-0.8 + t * (isMobile ? 2.1 : 2.8), 0, isMobile ? -0.1 + t * 0.2 : -0.5 + t * 0.2);
        guestRef.current.rotation.y = Math.PI / 2;
      }
    }
    // Scene 5: Check-in Process (0.70 - 0.88)
    else if (p < 0.88) {
      camPos.set(isMobile ? 1.8 : 2.35, isMobile ? 1.3 : 1.55, isMobile ? 0.9 : 0.8);
      lookAtPos.set(2.5, 1.5, -1);

      if (guestRef.current) {
        guestRef.current.position.set(isMobile ? 1.4 : 1.8, 0, isMobile ? -0.1 : -0.3);
        guestRef.current.rotation.y = Math.PI / 2;
      }
    }
    // Scene 6: Completion & Exit (0.88 - 1.00)
    else {
      const t = (p - 0.88) / 0.12;
      camPos.set(isMobile ? 1.1 - t * 1.1 : 1.0 - t * 1.5, isMobile ? 2.5 + t * 0.3 : 3.0 + t * 0.5, isMobile ? 5.8 : 7.5);
      lookAtPos.set(2.0 - t * 2.0, 1.4, -2.0);

      if (guestRef.current) {
        guestRef.current.position.set(isMobile ? 1.4 + t * 1.8 : 1.8 + t * 2.2, 0, isMobile ? -0.1 - t * 3.2 : -0.3 - t * 4.0);
        guestRef.current.rotation.y = 0;
      }
    }

    // Smooth Camera Interpolation
    state.camera.position.lerp(camPos, 0.08);
    state.camera.lookAt(lookAtPos);
  });

  // Calculate Check-in Step for Kiosk
  const checkInStep = (() => {
    if (progress < 0.70) return progress >= 0.55 ? 0 : -1;
    if (progress < 0.74) return 1; // Find Booking
    if (progress < 0.79) return 2; // Verify ID
    if (progress < 0.84) return 3; // Payment
    if (progress < 0.88) return 4; // Get Key
    return 4; // Completed
  })();

  const isKioskHighlighted = progress >= 0.35 && progress < 0.55;
  const hasKey = progress >= 0.88;

  return (
    <group>
      {/* Lights */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 12, 8]} intensity={1.2} castShadow />
      <pointLight position={[2.5, 3, -0.5]} intensity={1.5} color="#06858F" distance={6} />
      <pointLight position={[-3.5, 2.5, -1]} intensity={0.8} color="#E8A05B" distance={5} />

      {/* 3D Elements */}
      <Hotel ref={hotelRef} progress={progress} />
      <Kiosk
        ref={kioskRef}
        isHighlighted={isKioskHighlighted}
        checkInStep={checkInStep}
      />
      <Guest ref={guestRef} hasKey={hasKey} />
    </group>
  );
}
