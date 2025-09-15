'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Earring3DProps {
  gemstoneColor?: string;
  metalColor?: string;
  modelPath?: string;
  canvasId?: string;
}

export default function Earring3D({ 
  gemstoneColor = '#4A90E2', 
  metalColor = '#D4AF37',
  modelPath = '/models/for_her.glb',
  canvasId = 'earring-canvas'
}: Earring3DProps) {
  const earringRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [entranceProgress, setEntranceProgress] = useState(0);
  
  // Globe-like rotation system
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [autoRotation, setAutoRotation] = useState(true);
  
  // Load your custom model
  const { scene } = useGLTF(modelPath);
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = useMemo(() => {
    if (scene) {
      const cloned = scene.clone();
      
      // Enhance materials for diamond-like appearance
      cloned.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Check if this looks like a diamond/gemstone (you may need to adjust based on your model)
          const isDiamond = child.name.toLowerCase().includes('diamond') || 
                           child.name.toLowerCase().includes('gem') ||
                           child.name.toLowerCase().includes('stone') ||
                           child.material?.name?.toLowerCase().includes('diamond');
          
          if (isDiamond && child.material) {
            // Create diamond material
            const diamondMaterial = new THREE.MeshPhysicalMaterial({
              color: '#ffffff',
              metalness: 0.0,
              roughness: 0.0,
              transmission: 0.9,
              transparent: true,
              opacity: 0.8,
              ior: 2.4, // Diamond's index of refraction
              reflectivity: 0.9,
              clearcoat: 1.0,
              clearcoatRoughness: 0.0,
              envMapIntensity: 1.0,
            });
            
            child.material = diamondMaterial;
            child.castShadow = true;
            child.receiveShadow = true;
          } else if (child.material) {
            // Enhance metal materials
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
                  mat.metalness = 0.9;
                  mat.roughness = 0.1;
                  mat.envMapIntensity = 1.5;
                }
              });
            } else if (child.material instanceof THREE.MeshStandardMaterial || child.material instanceof THREE.MeshPhysicalMaterial) {
              child.material.metalness = 0.9;
              child.material.roughness = 0.1;
              child.material.envMapIntensity = 1.5;
            }
          }
        }
      });
      
      return cloned;
    }
    return null;
  }, [scene]);

  // Track scroll progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Globe-like mouse interaction (canvas-specific)
  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const handleMouseDown = (event: MouseEvent) => {
      // Only respond if the event target is the canvas
      if (event.target === canvas) {
        setIsDragging(true);
        setAutoRotation(false);
        setPreviousMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        
        // Update rotations based on mouse movement (reversed Y controls)
        setRotationY(prev => prev + deltaX * 0.01);
        setRotationX(prev => Math.max(-Math.PI/3, Math.min(Math.PI/3, prev + deltaY * 0.01)));
        
        setPreviousMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Resume auto-rotation after a delay
      setTimeout(() => setAutoRotation(true), 2000);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      setTimeout(() => setAutoRotation(true), 2000);
    };

    // Touch event handlers for mobile
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      if (event.target === canvas && event.touches.length === 1) {
        setIsDragging(true);
        setAutoRotation(false);
        setPreviousMousePosition({ 
          x: event.touches[0].clientX, 
          y: event.touches[0].clientY 
        });
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (isDragging && event.touches.length === 1) {
        const deltaX = event.touches[0].clientX - previousMousePosition.x;
        const deltaY = event.touches[0].clientY - previousMousePosition.y;
        
        // Update rotations based on touch movement (reversed Y controls)
        setRotationY(prev => prev + deltaX * 0.01);
        setRotationX(prev => Math.max(-Math.PI/3, Math.min(Math.PI/3, prev + deltaY * 0.01)));
        
        setPreviousMousePosition({ 
          x: event.touches[0].clientX, 
          y: event.touches[0].clientY 
        });
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      setIsDragging(false);
      setTimeout(() => setAutoRotation(true), 2000);
    };

    // Mouse events
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      // Mouse events
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      
      // Touch events
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, previousMousePosition, canvasId]);

  // Entrance animation - starts after text slides in
  useEffect(() => {
    const duration = 3000; // 3 seconds for smooth entrance
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function for natural animation
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      setEntranceProgress(easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation right after text finishes sliding in (1 second delay)
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Globe-like animation system
  useFrame((state) => {
    if (earringRef.current) {
      // Entrance animation - slide from left side to final position (x=0)
      const entranceSlideX = THREE.MathUtils.lerp(-20, 0, entranceProgress); // Start from X=-20, end at X=0
      const entranceSlideY = THREE.MathUtils.lerp(0, 0, entranceProgress); // Start and end at Y=0
      
      // Static position after entrance (no scroll movement)
      earringRef.current.position.x = entranceSlideX;
      earringRef.current.position.y = entranceSlideY;
      earringRef.current.position.z = 0; // Keep centered
      
      // Globe-like rotation system
      if (autoRotation && !isDragging) {
        // Smooth auto-rotation like Locomotive ring
        setRotationY(prev => prev + 0.003);
      }
      
      // Apply rotations
      earringRef.current.rotation.x = rotationX;
      earringRef.current.rotation.y = rotationY;
      earringRef.current.rotation.z = 0; // Keep Z rotation minimal
      
      // Keep materials fully visible
      earringRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat.transparent) {
                mat.opacity = 1;
              }
            });
          } else if (child.material.transparent) {
            child.material.opacity = 1;
          }
        }
      });
    }
    
    // Camera angle changes on scroll (like Locomotive ring)
    const scrollRotation = scrollProgress * Math.PI * 0.3; // Subtle camera angle change
    camera.position.x = Math.sin(scrollRotation) * 2;
    camera.position.z = 5 + Math.cos(scrollRotation) * 1;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Enhanced lighting for diamond brilliance */}
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* Main key lights for diamond sparkle */}
      <directionalLight position={[10, 10, 5]} intensity={5.0} color="#ffffff" castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={4.5} color="#ffffff" castShadow />
      <directionalLight position={[0, 10, 0]} intensity={3.0} color="#ffffff" castShadow />
      
      {/* Rim lighting for diamond edges */}
      <directionalLight position={[15, 5, 0]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-15, 5, 0]} intensity={2.0} color="#ffffff" />
      
      {/* Point lights for internal diamond reflections */}
      <pointLight position={[5, 5, 5]} intensity={4.0} color="#ffffff" distance={20} decay={2} />
      <pointLight position={[-5, 5, -5]} intensity={3.5} color="#ffffff" distance={20} decay={2} />
      <pointLight position={[0, 8, 0]} intensity={3.0} color="#ffffff" distance={15} decay={2} />
      <pointLight position={[8, 0, 8]} intensity={2.5} color="#ffffff" distance={15} decay={2} />
      <pointLight position={[-8, 0, -8]} intensity={2.5} color="#ffffff" distance={15} decay={2} />
      
      {/* Additional sparkle lights */}
      <pointLight position={[12, 3, 3]} intensity={2.0} color="#ffffff" distance={10} decay={2} />
      <pointLight position={[-12, 3, -3]} intensity={2.0} color="#ffffff" distance={10} decay={2} />
      <pointLight position={[3, 12, -3]} intensity={2.0} color="#ffffff" distance={10} decay={2} />
      <pointLight position={[-3, 12, 3]} intensity={2.0} color="#ffffff" distance={10} decay={2} />
      
      {/* Environment mapping for realistic reflections */}
      <Environment preset="studio" />
      
      {/* Contact shadows for grounding */}
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.3} 
        scale={10} 
        blur={1.5} 
        far={4.5} 
        color="#000000" 
      />
      
      {/* Your custom for_her model */}
      {clonedScene && (
        <group ref={earringRef} dispose={null}>
          <primitive 
            object={clonedScene} 
            scale={1.5} 
            position={[0, 0.2, 0]}
            rotation={[0, 0, 0]}
          />
        </group>
      )}
    </group>
  );
}
