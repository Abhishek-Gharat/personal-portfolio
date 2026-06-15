import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroGraph = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const groupRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const autoRotateTimeRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b14);
    sceneRef.current = scene;

    // Get actual container dimensions for mobile compatibility
    const getContainerDimensions = () => {
      const container = mountRef.current;
      if (!container) return { width: window.innerWidth, height: window.innerHeight };
      const rect = container.getBoundingClientRect();
      return { 
        width: Math.min(rect.width, window.innerWidth), 
        height: rect.height || window.innerHeight 
      };
    };

    const dims = getContainerDimensions();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      dims.width / dims.height,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer - use container dimensions
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(dims.width, dims.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Main group
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Node data - Refined: muted blues, teals, and purples
    const nodesData = [
      { label: 'Page.jsx', type: 'PAGE', color: 0x2d5a8a, border: 0x1a3a5a, meta: '↓1 imp  ↑0 used', pos: [-0.6, 1.8, 0.5] },
      { label: 'Dashboard.jsx', type: 'COMPONENT', color: 0x2d6a5a, border: 0x1a4a3a, meta: '↓3 imp  ↑1 used', pos: [2.8, 0.4, -0.6] },
      { label: 'Header.jsx', type: 'COMPONENT', color: 0x2d6a5a, border: 0x1a4a3a, meta: '↓0 imp  ↑1 used', pos: [5.0, 0.5, 0.8] },
      { label: 'footer.jsx', type: 'COMPONENT', color: 0x2d6a5a, border: 0x5a3333, meta: '↓1 imp  ↑1 used', pos: [-1.0, -0.8, -0.3], dashed: true },
      { label: 'StatsCard.jsx', type: 'COMPONENT', color: 0x2d6a5a, border: 0x1a4a3a, meta: '↓0 imp  ↑1 used', pos: [2.5, 1.8, -1.4] },
      { label: 'ActivityList', type: 'EXTERNAL', color: 0x4a5a6a, border: 0x2a3a4a, meta: '↓0 imp  ↑1 used', pos: [5.1, -1.5, 0.2] },
      { label: 'useAuth.ts', type: 'HOOK', color: 0x3d4a7a, border: 0x2a3a5a, meta: '↓2 imp  ↑3 used', pos: [0.8, -0.6, 1.5] },
      { label: 'api.ts', type: 'UTIL', color: 0x2a5a7a, border: 0x1a3a5a, meta: '↓0 imp  ↑4 used', pos: [3.8, -1.8, -1.2] },
      { label: 'Button.tsx', type: 'COMPONENT', color: 0x2d6a5a, border: 0x1a4a3a, meta: '↓1 imp  ↑5 used', pos: [-0.2, 0.0, 1.8] },
      { label: 'types.ts', type: 'UTIL', color: 0x2a5a7a, border: 0x1a3a5a, meta: '↓0 imp  ↑6 used', pos: [3.6, -0.2, -2.2] },
    ];

    const nodes = [];

    // Create nodes
    nodesData.forEach((nodeData, idx) => {
      // Shape geometry (rounded rect)
      const shape = new THREE.Shape();
      const w = 1.3, h = 0.55, r = 0.1;
      shape.moveTo(-w / 2 + r, -h / 2);
      shape.lineTo(w / 2 - r, -h / 2);
      shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      shape.lineTo(w / 2, h / 2 - r);
      shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      shape.lineTo(-w / 2 + r, h / 2);
      shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      shape.lineTo(-w / 2, -h / 2 + r);
      shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

      // Card mesh - More transparent
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({ color: 0x0d0f1e, opacity: 0.5, transparent: true });
      const mesh = new THREE.Mesh(geometry, material);

      // Text canvas texture
      const canvas = document.createElement('canvas');
      canvas.width = 260 * 2;
      canvas.height = 110 * 2;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(13, 15, 30, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = `#${nodeData.color.toString(16).padStart(6, '0')}`;
      ctx.font = 'bold 20px monospace';
      ctx.fillText(nodeData.type, 20, 40);

      ctx.fillStyle = 'rgba(150, 160, 180, 0.7)';
      ctx.font = 'bold 26px monospace';
      ctx.fillText(nodeData.label, 20, 80);

      ctx.fillStyle = 'rgba(100, 130, 160, 0.6)';
      ctx.font = '18px monospace';
      ctx.fillText(nodeData.meta, 20, 140);

      const texture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const textGeometry = new THREE.PlaneGeometry(1.3, 0.55);
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.z = 0.01;

      // Border line
      const points = shape.getPoints(40);
      const borderGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(points.length * 3);
      points.forEach((p, i) => {
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = 0.02;
      });
      borderGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const borderMaterial = new THREE.LineBasicMaterial({ color: nodeData.border, linewidth: 1.5, opacity: 0.2, transparent: true });
      const borderLine = new THREE.Line(borderGeometry, borderMaterial);

      // Container
      const nodeGroup = new THREE.Group();
      nodeGroup.add(mesh);
      nodeGroup.add(textMesh);
      nodeGroup.add(borderLine);

      // Handle dots
      const handles = [
        { pos: [0, h / 2 + 0.05, 0.05] }, // top
        { pos: [0, -h / 2 - 0.05, 0.05] }, // bottom
        { pos: [-w / 2 - 0.05, 0, 0.05] }, // left
        { pos: [w / 2 + 0.05, 0, 0.05] }, // right
      ];
      handles.forEach(h => {
        const handleGeo = new THREE.CircleGeometry(0.03, 8);
        const handleMat = new THREE.MeshBasicMaterial({ color: nodeData.color, opacity: 0.2, transparent: true });
        const handleMesh = new THREE.Mesh(handleGeo, handleMat);
        handleMesh.position.set(...h.pos);
        nodeGroup.add(handleMesh);
      });

      nodeGroup.position.set(...nodeData.pos);
      group.add(nodeGroup);
      nodes.push({ ...nodeData, group: nodeGroup, index: idx });
    });

    // Edge connections
    const edges = [
      [0, 1, false], [0, 2, false], [1, 3, true], [1, 4, false], [1, 5, false],
      [2, 6, false], [3, 8, true], [4, 6, false], [5, 7, false], [7, 9, false], [6, 9, false], [8, 6, false],
    ];

    const edgeObjects = edges.map(([from, to, dashed]) => {
      const fromPos = new THREE.Vector3(...nodesData[from].pos);
      const toPos = new THREE.Vector3(...nodesData[to].pos);
      const midPos = new THREE.Vector3().lerpVectors(fromPos, toPos, 0.5);
      midPos.y += 0.15;

      const curve = new THREE.QuadraticBezierCurve3(fromPos, midPos, toPos);

      // Line - Much dimmer
      const points = curve.getPoints(50);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineColor = dashed ? 0x663333 : 0x223344;
      const lineOpacity = dashed ? 0.15 : 0.08;
      const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor, opacity: lineOpacity, transparent: true });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      group.add(line);

      // Animated dot - Much dimmer
      const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: nodesData[to].color, opacity: 0.3, transparent: true });
      const dot = new THREE.Mesh(dotGeo, dotMat);

      // Glow - Much dimmer
      const glowGeo = new THREE.SphereGeometry(0.07, 8, 8);
      const glowMat = new THREE.MeshBasicMaterial({ color: nodesData[to].color, opacity: 0.05, transparent: true });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.add(dot);
      group.add(glow);

      return { curve, dot, glow, dashed, progress: Math.random() * 0.3 };
    });

    // Mouse events
    const onMouseDown = (e) => {
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      autoRotateTimeRef.current = 0;
      document.body.style.userSelect = 'none';
      document.body.style.WebkitUserSelect = 'none';
    };

    const onMouseMove = (e) => {
      if (e.buttons !== 1) return;
      const deltaX = e.clientX - lastMouseRef.current.x;
      const deltaY = e.clientY - lastMouseRef.current.y;
      velocityRef.current.x = deltaX * 0.008;
      velocityRef.current.y = deltaY * 0.008;
      rotationRef.current.y += velocityRef.current.x;
      rotationRef.current.x += velocityRef.current.y;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      autoRotateTimeRef.current = 0;
    };

    const onMouseUp = () => {
      autoRotateTimeRef.current = 0;
      document.body.style.userSelect = '';
      document.body.style.WebkitUserSelect = '';
    };

    mountRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    const onTouchStart = (e) => {
      const touch = e.touches[0];
      lastMouseRef.current = { x: touch.clientX, y: touch.clientY };
      autoRotateTimeRef.current = 0;
      document.body.style.userSelect = 'none';
      document.body.style.WebkitUserSelect = 'none';
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastMouseRef.current.x;
      const deltaY = touch.clientY - lastMouseRef.current.y;
      velocityRef.current.x = deltaX * 0.008;
      velocityRef.current.y = deltaY * 0.008;
      rotationRef.current.y += velocityRef.current.x;
      rotationRef.current.x += velocityRef.current.y;
      lastMouseRef.current = { x: touch.clientX, y: touch.clientY };
      autoRotateTimeRef.current = 0;
    };

    const onTouchEnd = () => {
      document.body.style.userSelect = '';
      document.body.style.WebkitUserSelect = '';
    };

    mountRef.current.addEventListener('touchstart', onTouchStart, { passive: true });
    mountRef.current.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Handle resize - use container dimensions for mobile
    const onWindowResize = () => {
      const dims = getContainerDimensions();
      camera.aspect = dims.width / dims.height;
      camera.updateProjectionMatrix();
      renderer.setSize(dims.width, dims.height);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Momentum decay
      velocityRef.current.x *= 0.92;
      velocityRef.current.y *= 0.92;

      // Apply momentum
      rotationRef.current.y += velocityRef.current.x;
      rotationRef.current.x += velocityRef.current.y;

      // Auto-rotate after 2.5s without interaction - Much slower
      autoRotateTimeRef.current += 1;
      if (autoRotateTimeRef.current > 150) {
        rotationRef.current.y += 0.0008;
        rotationRef.current.x += 0.0001;
      }

      group.rotation.y = rotationRef.current.y;
      group.rotation.x = rotationRef.current.x;

      // Update edge dots - Slower animation
      edgeObjects.forEach((edge) => {
        edge.progress += 0.002;
        if (edge.progress > 1) edge.progress = 0;
        const pt = edge.curve.getPoint(edge.progress);
        edge.glow.position.copy(pt);
        const scale = 1 + Math.sin(Date.now() * 0.002) * 0.08;
        edge.dot.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeEventListener('mousedown', onMouseDown);
      mountRef.current?.removeEventListener('touchstart', onTouchStart);
      mountRef.current?.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-graph-mount="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        touchAction: 'pan-y pinch-zoom'
      }}
    />
  );
};

export default HeroGraph;
