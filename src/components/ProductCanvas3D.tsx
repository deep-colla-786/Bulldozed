"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { sounds } from "./SoundEffects";
import { drawBulldozedLogoOnCanvas } from "./drawBulldozedLogoOnCanvas";
import { create3DMascotFigure } from "./create3DMascotFigure";
import {
  Zap,
  Sparkles,
  ArrowDown,
  ArrowUp,
  RotateCw,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  ShieldCheck,
  Clock,
  Layers,
  Box,
} from "lucide-react";

export interface FlavorData {
  id: "mint" | "berry" | "lime";
  name: string;
  tagline: string;
  caffeine: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export const FLAVORS: FlavorData[] = [
  {
    id: "mint",
    name: "Minty Freshness",
    tagline: "Sub-Zero Peppermint Rush",
    caffeine: "50mg",
    primaryColor: "#0087ce",
    secondaryColor: "#efff00",
    accentColor: "#00f0ff",
  },
  {
    id: "berry",
    name: "Mixed Berries",
    tagline: "Electric Raspberry & Wild Acai",
    caffeine: "50mg",
    primaryColor: "#ff007a",
    secondaryColor: "#efff00",
    accentColor: "#bd00ff",
  },
  {
    id: "lime",
    name: "Sour Lime",
    tagline: "Citrus Shockwave Pucker",
    caffeine: "55mg",
    primaryColor: "#10ff70",
    secondaryColor: "#0087ce",
    accentColor: "#efff00",
  },
];

interface ProductCanvas3DProps {
  activeFlavorId?: "mint" | "berry" | "lime";
  onFlavorChange?: (flavorId: "mint" | "berry" | "lime") => void;
  onAddToCart?: (flavorId: "mint" | "berry" | "lime") => void;
}

export const ProductCanvas3D: React.FC<ProductCanvas3DProps> = ({
  activeFlavorId = "mint",
  onFlavorChange,
  onAddToCart,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [flavor, setFlavor] = useState<"mint" | "berry" | "lime">(activeFlavorId);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // 3D View Mode: "pack" (Foil Sachet & Gum) vs "figure" (Realistic 3D Mascot Runner Trophy)
  const [viewMode, setViewMode] = useState<"pack" | "figure">("pack");
  const viewModeRef = useRef<"pack" | "figure">("pack");
  const [figureFinish, setFigureFinish] = useState<"chrome" | "yellow" | "blue" | "obsidian">("chrome");

  useEffect(() => {
    viewModeRef.current = viewMode;
    if (packGroupRef.current && trophyGroupRef.current) {
      packGroupRef.current.visible = viewMode === "pack";
      trophyGroupRef.current.visible = viewMode === "figure";
    }
  }, [viewMode]);

  useEffect(() => {
    setFlavor(activeFlavorId);
  }, [activeFlavorId]);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const packGroupRef = useRef<THREE.Group | null>(null);
  const tearFlapRef = useRef<THREE.Group | null>(null);
  const gumPieceRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const trophyGroupRef = useRef<THREE.Group | null>(null);
  const trophyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const packetFrontMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const flapFrontMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Smooth animation interpolation refs
  const scrollProgressRef = useRef(0);
  const tearLerpRef = useRef(0);
  const popLerpRef = useRef(0);
  const autoRotateRef = useRef(false);
  const rotationTargetRef = useRef({ x: 0.05, y: 0 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);
  const prevProgressRef = useRef<number>(0);
  const prevStepRef = useRef<number>(1);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Update 3D Mascot Material Finish dynamically
  useEffect(() => {
    if (!trophyMaterialRef.current) return;
    const mat = trophyMaterialRef.current;
    if (figureFinish === "chrome") {
      mat.color.setHex(0xfafafa);
      mat.metalness = 0.95;
      mat.roughness = 0.12;
      mat.clearcoat = 1.0;
      mat.clearcoatRoughness = 0.05;
    } else if (figureFinish === "yellow") {
      mat.color.setHex(0xefff00);
      mat.metalness = 0.82;
      mat.roughness = 0.16;
      mat.clearcoat = 1.0;
      mat.clearcoatRoughness = 0.08;
    } else if (figureFinish === "blue") {
      mat.color.setHex(0x0087ce);
      mat.metalness = 0.88;
      mat.roughness = 0.15;
      mat.clearcoat = 1.0;
      mat.clearcoatRoughness = 0.08;
    } else if (figureFinish === "obsidian") {
      mat.color.setHex(0x181818);
      mat.metalness = 0.45;
      mat.roughness = 0.28;
      mat.clearcoat = 0.8;
      mat.clearcoatRoughness = 0.15;
    }
    mat.needsUpdate = true;
  }, [figureFinish]);

  // Ultra-crisp procedural branding texture for the pouch - WITH PROPER BULLDOZED LOGO
  const generatePacketTexture = useCallback((currentFlavor: FlavorData, isFlap: boolean) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Deep energetic gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    bgGrad.addColorStop(0, currentFlavor.secondaryColor);
    bgGrad.addColorStop(0.32, currentFlavor.secondaryColor);
    bgGrad.addColorStop(0.40, currentFlavor.primaryColor);
    bgGrad.addColorStop(0.92, "#0a0a0a");
    bgGrad.addColorStop(1, "#050505");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle metallic brushed foil streaks
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    for (let i = 0; i < 1024; i += 6) {
      ctx.fillRect(0, i, 1024, 1.2);
    }

    // Authentic serrated heat-seal crimps at top and bottom
    ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
    for (let x = 0; x < 1024; x += 16) {
      ctx.fillRect(x, 0, 8, 48);
      ctx.fillRect(x, 976, 8, 48);
    }

    if (isFlap) {
      // Top Tear Strip Branding
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, 1024, 84);

      ctx.fillStyle = "#efff00";
      ctx.font = "900 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("▼ TEAR TO RELEASE 50MG ENERGY ▼", 512, 56);

      // Silver perforation dashed line
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;
      ctx.setLineDash([14, 10]);
      ctx.beginPath();
      ctx.moveTo(30, 96);
      ctx.lineTo(994, 96);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // Sub-header Eyebrow
      ctx.fillStyle = "#111111";
      ctx.font = "900 22px monospace";
      ctx.textAlign = "center";
      ctx.fillText("BUCCAL CAFFEINE CONFECTIONERY", 512, 185);

      // PROPER OFFICIAL BULLDOZED BRAND MARK:
      // Draws the exact authentic runner mascot with almond eye + stacked BULL DOZED letters
      drawBulldozedLogoOnCanvas(
        ctx,
        512,
        420,
        1.55,
        "#111111",
        currentFlavor.secondaryColor
      );

      // Flavor Name Capsule Badge
      ctx.fillStyle = "#111111";
      ctx.beginPath();
      ctx.roundRect(160, 685, 704, 74, 16);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 38px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(currentFlavor.name.toUpperCase(), 512, 736);

      // Active Caffeine Spec Badge
      ctx.fillStyle = currentFlavor.secondaryColor;
      ctx.beginPath();
      ctx.roundRect(240, 780, 544, 56, 12);
      ctx.fill();

      ctx.fillStyle = "#111111";
      ctx.font = "900 28px sans-serif";
      ctx.fillText(`⚡ ${currentFlavor.caffeine} RAPID ABSORPTION`, 512, 818);

      // Bottom Specs & Barcode
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "bold 20px monospace";
      ctx.fillText("10 GUM CHEWS • 0G SUGAR • ZERO CRASH", 512, 882);

      ctx.fillStyle = "#ffffff";
      for (let b = 220; b < 804; b += 12) {
        ctx.fillRect(b, 905, (b % 24 === 0) ? 6 : 2.5, 34);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }, []);

  // Update textures safely when flavor changes
  useEffect(() => {
    const curFlavor = FLAVORS.find((f) => f.id === flavor) || FLAVORS[0];
    if (packetFrontMatRef.current) {
      if (packetFrontMatRef.current.map && typeof packetFrontMatRef.current.map.dispose === "function") {
        packetFrontMatRef.current.map.dispose();
      }
      packetFrontMatRef.current.map = generatePacketTexture(curFlavor, false);
      packetFrontMatRef.current.needsUpdate = true;
    }
    if (flapFrontMatRef.current) {
      if (flapFrontMatRef.current.map && typeof flapFrontMatRef.current.map.dispose === "function") {
        flapFrontMatRef.current.map.dispose();
      }
      flapFrontMatRef.current.map = generatePacketTexture(curFlavor, true);
      flapFrontMatRef.current.needsUpdate = true;
    }
  }, [flavor, generatePacketTexture]);

  // Robust Scroll Tracker: Direct, immediate calculation for smooth bi-directional animations
  useEffect(() => {
    const updateScrollProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionRef.current.offsetHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScrolled / totalScrollable));

      if (progress > prevProgressRef.current + 0.005) {
        setScrollDirection("down");
      } else if (progress < prevProgressRef.current - 0.005) {
        setScrollDirection("up");
      }
      prevProgressRef.current = progress;

      scrollProgressRef.current = progress;
      setScrollPercent(Math.round(progress * 100));

      let step: 1 | 2 | 3 = 1;
      if (progress > 0.45) {
        step = 3;
      } else if (progress > 0.12) {
        step = 2;
      } else {
        step = 1;
      }

      if (step !== prevStepRef.current) {
        if (step === 2) sounds.playTear();
        if (step === 3) sounds.playPop();
        prevStepRef.current = step;
        setActiveStep(step);
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  // Three.js Scene Setup (Mounts once)
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(isMobile ? 36 : 34, width / height, 0.1, 100);
    camera.position.set(0, isMobile ? 0.05 : 0, isMobile ? 8.4 : 7.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    // 4. Lighting Rig (Warm Neon Yellow Key Light + Cobalt Bullue Rim Light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xefff00, 3.0);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const blueLight = new THREE.DirectionalLight(0x0087ce, 3.2);
    blueLight.position.set(-5, -2, -3);
    scene.add(blueLight);

    const topGlint = new THREE.PointLight(0xffffff, 2.2, 10);
    topGlint.position.set(0, 3.5, 3);
    scene.add(topGlint);

    // 5. Main Packet Root Group
    const packGroup = new THREE.Group();
    scene.add(packGroup);
    packGroupRef.current = packGroup;

    const curFlavor = FLAVORS.find((f) => f.id === flavor) || FLAVORS[0];

    // Metallic foil materials
    const silverFoilMaterial = new THREE.MeshStandardMaterial({
      color: 0xd0d0d0,
      metalness: 0.94,
      roughness: 0.22,
      side: THREE.DoubleSide,
    });

    const packetFrontMaterial = new THREE.MeshStandardMaterial({
      map: generatePacketTexture(curFlavor, false),
      metalness: 0.50,
      roughness: 0.30,
      side: THREE.FrontSide,
    });
    packetFrontMatRef.current = packetFrontMaterial;

    const flapFrontMaterial = new THREE.MeshStandardMaterial({
      map: generatePacketTexture(curFlavor, true),
      metalness: 0.50,
      roughness: 0.30,
      side: THREE.FrontSide,
    });
    flapFrontMatRef.current = flapFrontMaterial;

    const pouchWidth = 2.3;
    const bodyHeight = 2.6;
    const flapHeight = 0.65;

    // A. Lower Pouch Body Mesh (Pillowed contour)
    const bodyGeo = new THREE.BoxGeometry(pouchWidth, bodyHeight, 0.22, 16, 16, 2);
    const bPos = bodyGeo.attributes.position;
    for (let i = 0; i < bPos.count; i++) {
      const x = bPos.getX(i);
      const y = bPos.getY(i);
      const z = bPos.getZ(i);
      if (Math.abs(z) > 0.04) {
        const factor = Math.cos((x / pouchWidth) * Math.PI) * Math.cos((y / bodyHeight) * Math.PI);
        bPos.setZ(i, z + Math.sign(z) * factor * 0.12);
      }
    }
    bodyGeo.computeVertexNormals();

    const bodyMesh = new THREE.Mesh(bodyGeo, [
      silverFoilMaterial,
      silverFoilMaterial,
      silverFoilMaterial,
      silverFoilMaterial,
      packetFrontMaterial,
      silverFoilMaterial,
    ]);
    bodyMesh.position.y = -flapHeight / 2;
    packGroup.add(bodyMesh);

    // Inner silver foil cavity pocket
    const cavityGeo = new THREE.PlaneGeometry(pouchWidth * 0.85, 0.4);
    const cavityMat = new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.85,
      roughness: 0.35,
      side: THREE.DoubleSide,
    });
    const cavityMesh = new THREE.Mesh(cavityGeo, cavityMat);
    cavityMesh.position.set(0, bodyHeight / 2 - flapHeight / 2 - 0.05, 0.02);
    packGroup.add(cavityMesh);

    // B. Tear Flap (Peels backwards)
    const flapGroup = new THREE.Group();
    flapGroup.position.set(0, -flapHeight / 2 + bodyHeight / 2, 0);
    packGroup.add(flapGroup);
    tearFlapRef.current = flapGroup;

    const flapGeo = new THREE.BoxGeometry(pouchWidth, flapHeight, 0.22, 16, 8, 2);
    const flapMesh = new THREE.Mesh(flapGeo, [
      silverFoilMaterial,
      silverFoilMaterial,
      silverFoilMaterial,
      silverFoilMaterial,
      flapFrontMaterial,
      silverFoilMaterial,
    ]);
    flapMesh.position.y = flapHeight / 2;
    flapGroup.add(flapMesh);

    // C. REALISTIC CHICLET CHEWING GUM TABLET (Proportional, pillowed, glazed)
    const gumGroup = new THREE.Group();
    gumGroup.position.set(0, 0.7, 0.04);
    gumGroup.scale.set(0.01, 0.01, 0.01);
    packGroup.add(gumGroup);
    gumPieceRef.current = gumGroup;

    const chicletWidth = 0.78;
    const chicletHeight = 0.46;
    const chicletDepth = 0.22;

    const gumGeo = new THREE.BoxGeometry(chicletWidth, chicletHeight, chicletDepth, 16, 16, 16);
    const gPos = gumGeo.attributes.position;
    for (let i = 0; i < gPos.count; i++) {
      const gx = gPos.getX(i);
      const gy = gPos.getY(i);
      const gz = gPos.getZ(i);
      const dist = Math.sqrt(
        (gx / (chicletWidth * 0.5)) ** 4 +
        (gy / (chicletHeight * 0.5)) ** 4 +
        (gz / (chicletDepth * 0.5)) ** 4
      );
      if (dist > 1) {
        gPos.setXYZ(i, gx / dist, gy / dist, gz / dist);
      }
    }
    gumGeo.computeVertexNormals();

    const gumMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfefdfa,
      roughness: 0.12,
      metalness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
      transmission: 0.06,
    });
    const gumMesh = new THREE.Mesh(gumGeo, gumMaterial);
    gumGroup.add(gumMesh);

    // Emboss the authentic 3D Bulldozed Mascot Runner on Chiclet Face
    const embossedMat = new THREE.MeshStandardMaterial({
      color: 0xefff00,
      metalness: 0.35,
      roughness: 0.18,
      emissive: 0xefff00,
      emissiveIntensity: 0.35,
    });
    const chicletRunnerFront = create3DMascotFigure({
      depth: 0.018,
      bevelSize: 0.005,
      scale: 0.0034,
      material: embossedMat,
    });
    chicletRunnerFront.position.set(0, 0, chicletDepth * 0.5 + 0.008);
    gumGroup.add(chicletRunnerFront);

    // Internal Soft Glowing Energy Core inside the chiclet
    const coreGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xefff00,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    gumGroup.add(coreMesh);

    // 6. SCULPTED 3D MASCOT RUNNER FIGURE (Trophy Mode)
    const trophyGroup = new THREE.Group();
    trophyGroup.position.set(0, 0, 0);
    trophyGroup.visible = false;
    scene.add(trophyGroup);
    trophyGroupRef.current = trophyGroup;

    const trophyMat = new THREE.MeshPhysicalMaterial({
      color: 0xfafafa,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });
    trophyMaterialRef.current = trophyMat;

    const mascotFigureMeshGroup = create3DMascotFigure({
      depth: 0.38,
      bevelSize: 0.045,
      scale: 0.024,
      material: trophyMat,
    });
    mascotFigureMeshGroup.position.set(0, 0.2, 0);
    trophyGroup.add(mascotFigureMeshGroup);

    // Architectural Pedestal Stand
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.18, 36);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.85,
      roughness: 0.25,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.y = -1.8;
    trophyGroup.add(pedestalMesh);

    // Pedestal Neon Ring
    const neonRingGeo = new THREE.TorusGeometry(1.62, 0.03, 16, 64);
    const neonRingMat = new THREE.MeshBasicMaterial({ color: 0xefff00 });
    const neonRing = new THREE.Mesh(neonRingGeo, neonRingMat);
    neonRing.rotation.x = Math.PI / 2;
    neonRing.position.y = -1.71;
    trophyGroup.add(neonRing);

    // 7. Ambient floating sparks
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const rad = 1.8 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = rad * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        size: 0.05,
        color: 0xefff00,
        transparent: true,
        opacity: 0.65,
      })
    );
    scene.add(particles);
    particlesRef.current = particles;

    // Render loop with high-precision timestamp
    let lastTime = performance.now();
    const startTime = lastTime;

    const animate = (currentTime: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const now = currentTime || performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = (now - startTime) / 1000;

      const p = scrollProgressRef.current;

      // SCROLL MAPPING:
      const targetTear = Math.max(0, Math.min(1, p / 0.40));
      const targetPop = Math.max(0, Math.min(1, (p - 0.10) / 0.70));

      tearLerpRef.current = THREE.MathUtils.lerp(tearLerpRef.current, targetTear, delta * 12);
      popLerpRef.current = THREE.MathUtils.lerp(popLerpRef.current, targetPop, delta * 12);

      const curTear = tearLerpRef.current;
      const curPop = popLerpRef.current;

      // Flap folds backward and curls
      if (tearFlapRef.current) {
        tearFlapRef.current.rotation.x = -curTear * Math.PI * 0.75;
        tearFlapRef.current.rotation.z = curTear * 0.18;
        tearFlapRef.current.position.z = -curTear * 0.22;
      }

      // Gum emerges realistically from foil slit
      if (gumPieceRef.current) {
        const curScale = THREE.MathUtils.lerp(0.01, 1.0, curPop);
        gumPieceRef.current.scale.set(curScale, curScale, curScale);

        gumPieceRef.current.position.y = THREE.MathUtils.lerp(
          0.70,
          1.15 + Math.sin(time * 3) * 0.02,
          curPop
        );
        gumPieceRef.current.position.z = THREE.MathUtils.lerp(0.04, 0.32, curPop);

        gumPieceRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.22, curPop);
        gumPieceRef.current.rotation.y = time * 0.35 + curPop * 0.15;
      }

      // Pack rotation damping & auto-spin
      if (packGroupRef.current && packGroupRef.current.visible) {
        if (autoRotateRef.current && !isDraggingRef.current) {
          rotationTargetRef.current.y += delta * 0.5;
        }

        const scrollYaw = Math.sin(p * Math.PI) * 0.28;
        const targetY = rotationTargetRef.current.y + scrollYaw;

        packGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          packGroupRef.current.rotation.x,
          rotationTargetRef.current.x,
          delta * 8
        );
        packGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          packGroupRef.current.rotation.y,
          targetY,
          delta * 8
        );

        packGroupRef.current.position.y = Math.sin(time * 1.5) * 0.06;
      }

      // Trophy 3D Figure rotation & hover
      if (trophyGroupRef.current && trophyGroupRef.current.visible) {
        if (autoRotateRef.current && !isDraggingRef.current) {
          rotationTargetRef.current.y += delta * 0.75;
        }

        trophyGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          trophyGroupRef.current.rotation.x,
          rotationTargetRef.current.x,
          delta * 8
        );
        trophyGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          trophyGroupRef.current.rotation.y,
          rotationTargetRef.current.y,
          delta * 8
        );

        trophyGroupRef.current.position.y = Math.sin(time * 1.8) * 0.08;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.18;
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      const isMob = newW < 768;
      camera.fov = isMob ? 36 : 34;
      camera.position.set(0, isMob ? 0.05 : 0, isMob ? 8.4 : 7.8);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
    };
  }, [generatePacketTexture, flavor]);

  // Touch & Mouse Drag handlers for manual angle inspection
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setAutoRotate(false);
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationTargetRef.current.y += deltaX * 0.008;
    rotationTargetRef.current.x += deltaY * 0.008;
    rotationTargetRef.current.x = Math.max(-0.55, Math.min(0.55, rotationTargetRef.current.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleSelectFlavor = (newFlavor: "mint" | "berry" | "lime") => {
    sounds.playZap();
    setFlavor(newFlavor);
    if (onFlavorChange) onFlavorChange(newFlavor);
  };

  // Programmatic scroll scrubber jump
  const scrollToPhase = (fraction: number) => {
    if (!sectionRef.current) return;
    const top = sectionRef.current.offsetTop;
    const height = sectionRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + height * fraction,
      behavior: "smooth",
    });
  };

  // Manual interactive scrub slider
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    scrollToPhase(val / 100);
  };

  const handleAddToCartQuick = () => {
    sounds.playPop();
    if (onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(flavor);
      }
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const curFlavorData = FLAVORS.find((f) => f.id === flavor) || FLAVORS[0];

  return (
    <section
      ref={sectionRef}
      id="experience-3d"
      className="relative w-full h-[220vh] bg-[#090909] text-[#fffbee]"
    >
      {/* Sticky Fullscreen 3D Viewport pinned cleanly to viewport top */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden px-3 sm:px-6 lg:px-8 py-2.5 sm:py-5 z-20">
        
        {/* Top Header */}
        <div className="max-w-7xl mx-auto w-full z-30 pt-16 sm:pt-4">
          <div className="flex flex-row items-center justify-between gap-1.5 sm:gap-2.5">
            
            {/* View Mode Toggle: [ 📦 3D PACK ] vs [ ⚡ 3D MASCOT FIGURE ] */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-xl bg-[#141414] border border-white/10">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setViewMode("pack");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === "pack"
                      ? "bg-[#efff00] text-[#111111] shadow-md font-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D PACK</span>
                </button>
                <button
                  onClick={() => {
                    sounds.playZap();
                    setViewMode("figure");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === "figure"
                      ? "bg-[#0087ce] text-white shadow-md font-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>3D FIGURE</span>
                </button>
              </div>

              {viewMode === "pack" && (
                <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141414] border border-white/10 text-[10px] sm:text-[11px] font-mono text-white/70">
                  {scrollDirection === "down" ? (
                    <>
                      <ArrowDown className="w-3 h-3 text-[#efff00] animate-bounce" />
                      <span>SCROLL TO TEAR FOIL</span>
                    </>
                  ) : (
                    <>
                      <ArrowUp className="w-3 h-3 text-[#0087ce] animate-bounce" />
                      <span>SCROLL TO RE-WRAP</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Flavor Selector Pills (Pack Mode) OR Material Selector (Figure Mode) */}
            {viewMode === "pack" ? (
              <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl bg-[#141414] border border-white/10 shrink-0">
                {FLAVORS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelectFlavor(f.id)}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all flex items-center gap-1 sm:gap-1.5 ${
                      flavor === f.id
                        ? "bg-[#fffbee] text-[#111111] shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0"
                      style={{ backgroundColor: f.primaryColor }}
                    />
                    <span>{f.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            ) : (
              /* Figure Finish Switcher */
              <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-xl bg-[#141414] border border-white/10 shrink-0">
                {(
                  [
                    { id: "chrome", label: "Chrome", color: "#ffffff" },
                    { id: "yellow", label: "Neon", color: "#efff00" },
                    { id: "blue", label: "Bullue", color: "#0087ce" },
                    { id: "obsidian", label: "Dark", color: "#111111" },
                  ] as const
                ).map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => {
                      sounds.playClick();
                      setFigureFinish(fin.id);
                    }}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                      figureFinish === fin.id
                        ? "bg-white text-black font-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full border border-white/20"
                      style={{ backgroundColor: fin.color }}
                    />
                    <span>{fin.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Status Strip */}
          <div className="lg:hidden mt-1.5 flex items-center justify-between px-2.5 py-1 rounded-lg bg-[#141414]/90 border border-white/5 text-[10px] font-mono">
            <span className="text-[#efff00] font-bold">
              {viewMode === "pack"
                ? `PHASE 0${activeStep} // ${activeStep === 1 ? "SEALED POUCH" : activeStep === 2 ? "TEAR ACTIVE" : "CHICLET READY"}`
                : `3D MASCOT TROPHY // ${figureFinish.toUpperCase()} FINISH`}
            </span>
            <span className="text-white/50">
              {viewMode === "pack" ? `${scrollPercent}% SCROLL` : "360° INSPECT"}
            </span>
          </div>
        </div>

        {/* Central 3D Canvas Area */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center min-h-[300px]">
          <div
            ref={containerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none relative"
            style={{ touchAction: "pan-y" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* DESKTOP ONLY: Left Info Card */}
          <div className="hidden lg:block absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 pointer-events-none max-w-xs z-30">
            <div className="p-5 rounded-2xl bg-[#121212]/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300">
              {viewMode === "pack" ? (
                <>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#efff00] font-bold uppercase mb-2">
                    <span>PHASE 0{activeStep} OF 03</span>
                    <span>{scrollPercent}%</span>
                  </div>

                  {activeStep === 1 && (
                    <div>
                      <h3 className="font-display font-black text-lg uppercase text-white">
                        AIRTIGHT METALLIC FOIL
                      </h3>
                      <p className="mt-1.5 text-xs text-white/60 font-sans leading-relaxed">
                        Triple-laminated oxygen barrier preserving maximum caffeine potency.
                      </p>
                      <span className="inline-block mt-3 text-[10px] font-mono text-[#efff00]">
                        ▼ Scroll down to tear open
                      </span>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div>
                      <h3 className="font-display font-black text-lg uppercase text-[#efff00]">
                        TEAR SEAM RELEASING
                      </h3>
                      <p className="mt-1.5 text-xs text-white/70 font-sans leading-relaxed">
                        Top foil flap curls open in 3D. Sleek gum tablet emerging from opening.
                      </p>
                      <span className="inline-block mt-3 text-[10px] font-mono text-white/50">
                        ▼ Keep scrolling to present gum
                      </span>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div>
                      <h3 className="font-display font-black text-lg uppercase text-[#0087ce]">
                        50MG BUCCAL TABLET
                      </h3>
                      <p className="mt-1.5 text-xs text-white/80 font-sans leading-relaxed">
                        Compact chiclet tablet ready. Absorbs in 5 minutes flat via mouth capillaries.
                      </p>
                      <span className="inline-block mt-3 text-[10px] font-mono text-[#efff00]">
                        ▲ Scroll up anytime to re-wrap
                      </span>
                    </div>
                  )}
                </>
              ) : (
                /* Figure Mode Info */
                <div>
                  <div className="text-[11px] font-mono text-[#0087ce] font-bold uppercase mb-2">
                    SCULPTED 3D FIGURE // TROPHY
                  </div>
                  <h3 className="font-display font-black text-lg uppercase text-white">
                    THE BULLDOZED RUNNER
                  </h3>
                  <p className="mt-1.5 text-xs text-white/70 font-sans leading-relaxed">
                    Dynamic sculpted 3D mascot. High-velocity aerodynamic stance with signature flared bell-bottom drive.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-[#efff00]">
                    <RotateCw className="w-3 h-3 animate-spin" />
                    <span>Click & drag to rotate 360°</span>
                  </div>
                </div>
              )}

              {/* Floating Feature Spec Chips */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-white/70">
                  <Zap className="w-3 h-3 text-[#efff00]" />
                  <span>50mg Caffeine</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/70">
                  <Clock className="w-3 h-3 text-[#0087ce]" />
                  <span>5-Min Onset</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/70">
                  <ShieldCheck className="w-3 h-3 text-[#10ff70]" />
                  <span>Zero Sugar</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/70">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Sublingual Speed</span>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP ONLY: Right Purchase / Controls Card */}
          <div className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-30 pointer-events-auto max-w-xs">
            <div className="p-5 rounded-2xl bg-[#121212]/95 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-white/50 uppercase">PILOT PACK (10 CHEWS)</span>
                <span className="text-sm font-bold text-[#efff00] font-mono">$4.99</span>
              </div>

              <h4 className="font-display font-black text-base uppercase text-white tracking-wide">
                {curFlavorData.name}
              </h4>
              <p className="text-[11px] font-mono text-white/60 mt-0.5">{curFlavorData.tagline}</p>

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/60">QUANTITY</span>
                <div className="flex items-center rounded-lg bg-[#1c1c1c] border border-white/10">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setQuantity((q) => Math.max(1, q - 1));
                    }}
                    className="p-1.5 text-white/60 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setQuantity((q) => q + 1);
                    }}
                    className="p-1.5 text-white/60 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add CTA */}
              <button
                onClick={handleAddToCartQuick}
                className="mt-4 w-full py-3 rounded-xl bg-[#efff00] hover:bg-[#d4e400] text-[#111111] font-display font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[#efff00]/20"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO STASH!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>STASH THIS PACK • ${(4.99 * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Quick 360 Inspection Toggle */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/50 pt-2 border-t border-white/5">
                <span>360° TURNTABLE:</span>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setAutoRotate(!autoRotate);
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono transition-colors flex items-center gap-1 ${
                    autoRotate
                      ? "bg-[#efff00]/20 text-[#efff00] border-[#efff00]/40 font-bold"
                      : "bg-[#181818] text-white/60 border-white/10 hover:text-white"
                  }`}
                >
                  <RotateCw className={`w-3 h-3 ${autoRotate ? "animate-spin" : ""}`} />
                  <span>{autoRotate ? "ACTIVE" : "SPIN"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE DOCKED PURCHASE BAR */}
        <div className="lg:hidden w-full max-w-sm mx-auto z-30 mb-1.5 px-1">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414]/95 backdrop-blur-xl border border-white/10 shadow-2xl gap-2">
            <div className="flex flex-col pl-1">
              <span className="text-[10px] font-mono text-[#efff00] font-bold leading-tight">
                ${(4.99 * quantity).toFixed(2)}
              </span>
              <span className="text-[11px] font-display font-black uppercase text-white truncate max-w-[100px] leading-tight">
                {curFlavorData.name.split(" ")[0]}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* 360 Spin Toggle */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setAutoRotate(!autoRotate);
                }}
                className={`p-1.5 rounded-lg border text-[10px] font-mono transition-colors flex items-center gap-1 ${
                  autoRotate
                    ? "bg-[#efff00]/20 text-[#efff00] border-[#efff00]/40 font-bold"
                    : "bg-[#202020] text-white/60 border-white/10 hover:text-white"
                }`}
                title="360° Turntable"
              >
                <RotateCw className={`w-3 h-3 ${autoRotate ? "animate-spin text-[#efff00]" : ""}`} />
                <span className="text-[9px] font-mono">{autoRotate ? "360°" : "SPIN"}</span>
              </button>

              {/* Quantity Stepper */}
              <div className="flex items-center rounded-lg bg-[#202020] border border-white/10">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-1.5 text-[11px] font-mono font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Stash Button */}
              <button
                onClick={handleAddToCartQuick}
                className="px-3 py-1.5 rounded-lg bg-[#efff00] text-black font-display font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md shadow-[#efff00]/20 active:scale-95 transition-transform"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>{addedToast ? "ADDED" : "STASH"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Scrubber & Phase Milestones (Pack Mode) */}
        {viewMode === "pack" && (
          <div className="max-w-3xl mx-auto w-full z-30 pb-1 sm:pb-2">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/50 mb-1">
              <button
                onClick={() => scrollToPhase(0.0)}
                className={`hover:text-white transition-colors ${activeStep === 1 ? "text-[#efff00] font-bold" : ""}`}
              >
                01. SEALED
              </button>
              <button
                onClick={() => scrollToPhase(0.35)}
                className={`hover:text-white transition-colors ${activeStep === 2 ? "text-[#efff00] font-bold" : ""}`}
              >
                02. TEAR WRAPPER
              </button>
              <button
                onClick={() => scrollToPhase(0.85)}
                className={`hover:text-white transition-colors ${activeStep === 3 ? "text-[#efff00] font-bold" : ""}`}
              >
                03. POP GUM OUT
              </button>
            </div>

            {/* Interactive Range Scrubber */}
            <div className="relative w-full flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={scrollPercent}
                onChange={handleScrubberChange}
                className="w-full h-1.5 sm:h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#efff00]"
              />
            </div>

            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-white/40 mt-1">
              <span>Scroll or drag thumb to tear & wrap</span>
              <span>{scrollPercent}% ACTIVE</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
