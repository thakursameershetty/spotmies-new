"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Float, Environment, Sparkles, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * UPDATED SHADER: "Shiny LED" Look
 * - Renders a bright WHITE center that fades to the UColor.
 * - Blinking is sharper and faster.
 */
const NodeShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color("#4488ff"),
        uPixelRatio: 1,
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform float uPixelRatio;
    varying float vAlpha;
    varying vec2 vUv;
    
    // Random function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // SIZE: Even bigger for that "Bloom" look
        gl_PointSize = 80.0 * uPixelRatio * (1.0 / -mvPosition.z);
        
        // BLINKING: Sharper, strobe-like effect
        float offset = random(position.xy); 
        // Speed = 4.0 (Fast). 
        float blink = sin(uTime * 4.0 + offset * 15.0);
        
        // Map sine wave to 0.2 -> 1.0 range (never fully invisible)
        vAlpha = 0.2 + 0.8 * (0.5 + 0.5 * blink);
    }
    `,
    // Fragment Shader
    `
    uniform vec3 uColor;
    varying float vAlpha;
    
    void main() {
        // Calculate distance from center of the point
        float d = distance(gl_PointCoord, vec2(0.5));
        
        // Discard corners to make a circle
        if (d > 0.5) discard;
        
        // GLOW GRADIENT:
        // 1. Core (Bright White) - inner 10%
        // 2. Halo (Color) - middle 40%
        // 3. Fade (Transparent) - outer 50%
        
        float intensity = 1.0 - (d * 2.0); // 0 at edge, 1 at center
        intensity = pow(intensity, 2.0);   // Sharpen the falloff
        
        // Color Mix: Mix White (at center) to Blue (at edge)
        vec3 finalColor = mix(uColor, vec3(1.0), smoothstep(0.8, 1.0, intensity));
        
        gl_FragColor = vec4(finalColor, vAlpha * intensity * 2.5); // * 2.5 for over-brightness
    }
    `
);

extend({ NodeShaderMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodeShaderMaterial: any;
    }
}

/**
 * Responsive Group with "Magnetic" Hover Effect
 */
const ResponsiveGroup = ({ children }: { children: React.ReactNode }) => {
    const { viewport } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    const targetPosition = useMemo(() => {
        return viewport.width > 10 ? new THREE.Vector3(0, -5.5, 0) : new THREE.Vector3(0, 1.0, 0);
    }, [viewport.width]);
    const targetScale = viewport.width > 10 ? 1.3 : 0.6;

    React.useEffect(() => {
        if (groupRef.current) {
            // Start from bottom for entrance animation
            groupRef.current.position.y = -20;
        }
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // 1. "Magnetic" Rotation: Tilt towards the mouse
            // Multiplied by 0.3 for stronger effect
            const targetRotX = state.mouse.y * 0.3;
            const targetRotY = state.mouse.x * 0.3;

            // Smoothly interpolate current rotation to target mouse rotation
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 2);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 2);

            // 2. Position & Scale (Responsive)
            groupRef.current.position.lerp(targetPosition, delta * 2);
            const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 2);
            groupRef.current.scale.set(s, s, s);
        }
    });

    return <group ref={groupRef}>{children}</group>;
};

export const NetworkGlobe = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materialRef = useRef<any>(null);
    const globeGroupRef = useRef<THREE.Group>(null);
    const glowColor = useMemo(() => new THREE.Color("#00aaff"), []); // Vivid Cyan-Blue

    useFrame((state) => {
        // Pass time to shader
        if (materialRef.current) materialRef.current.uTime = state.clock.getElapsedTime();

        // Continuous Rotation
        // Spin faster if mouse is far from center (Interaction)
        if (globeGroupRef.current) {
            const speed = 0.05 + Math.abs(state.mouse.x) * 0.1; // Base 0.05 + Mouse influence
            globeGroupRef.current.rotation.y += speed * 0.05;
        }
    });

    return (
        <group ref={globeGroupRef} scale={4.5}>
            {/* Core */}
            <mesh>
                <sphereGeometry args={[0.98, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Wireframe Connections */}
            <mesh>
                <icosahedronGeometry args={[1, 5]} />
                <meshBasicMaterial color="#2266aa" wireframe={true} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* SHINY NODES */}
            <points>
                <icosahedronGeometry args={[1, 20]} />
                <nodeShaderMaterial
                    ref={materialRef}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending} // CRITICAL: Makes overlapping lights super bright
                    uColor={glowColor}
                    uPixelRatio={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
                />
            </points>
        </group>
    );
};

export const Scene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 16], fov: 30 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={0.2} />

            {/* Colorful accent lights */}
            <pointLight position={[10, 10, 10]} intensity={2} color="#44aaff" />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#aa44ff" />

            <ResponsiveGroup>
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <NetworkGlobe />
                </Float>
            </ResponsiveGroup>

            <Sparkles count={150} scale={25} size={4} speed={0.4} opacity={0.6} color="#44aaff" />
            <Sparkles count={80} scale={15} size={3} speed={0.2} opacity={0.4} color="#ff44aa" />

            <Environment preset="city" />
        </Canvas>
    );
};