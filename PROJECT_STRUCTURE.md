PROJECT_STRUCTURE.md# SkyUnit AI - Next.js Advanced Architecture

## 📁 Project Structure

```
app/
├── page.tsx                 # Main gateway + Reality Shatter effect
├── layout.tsx              # Root layout with providers
├── globals.css             # Global styles + GSAP animations
├── components/
│   ├── RealityShatter.tsx      # 3D shattering glass effect (Three.js)
│   ├── CyberCity.tsx           # Procedurally generated cyber environment
│   ├── NeuralAvatar.tsx        # AI avatar with WebGL shaders
│   ├── OrbitalRing/
│   │   ├── RingSegment.tsx     # Individual orbital segment
│   │   └── index.tsx           # Main orbital ring component
│   ├── HexKeyboard.tsx         # Interactive hex-based keyboard
│   ├── Shockwave.tsx           # Particle-based shockwave effect
│   ├── GlitchText.tsx          # Cyberpunk glitch typography
│   ├── ParticleField.tsx       # GPU-based particle system
│   ├── VolumetricFog.tsx       # WebGL fog effect
│   └── modules/
│       ├── NeuralHub.tsx       # AI Analysis & Insights
│       ├── VoidMarket.tsx      # Real Estate Market Overview
│       ├── ForgeVault.tsx      # Property Management Portal
│       ├── RealmsGate.tsx      # Investment Opportunities
│       ├── VaultCore.tsx       # Secure Data Hub
│       ├── StreamPulse.tsx     # Live Market Analytics
│       ├── CoreNexus.tsx       # System Control Center
│       └── AbyssWatcher.tsx    # Advanced Security Monitor
├── shaders/
│   ├── cyberRain.frag       # Particle rain effect
│   ├── blackHole.frag       # Gravitational distortion
│   ├── volumetricFog.vert   # Volumetric lighting
│   ├── glitchMatrix.frag    # Digital glitch effect
│   └── neonPulse.frag       # Neon glow shader
├── hooks/
│   ├── useThreeJS.ts        # Three.js lifecycle management
│   ├── useShader.ts         # Custom shader management
│   ├── useParticles.ts      # Particle system control
│   └── useWebGL.ts          # WebGL context management
├── utils/
│   ├── shaderCompiler.ts    # GLSL compilation utilities
│   ├── geometryFactory.ts   # 3D geometry generation
│   ├── noiseGenerator.ts    # Perlin/Simplex noise
│   └── colorPalette.ts      # Cyberpunk color themes
└── styles/
    ├── animations.css       # GSAP timeline sequences
    ├── cyberpunk.css        # Neon aesthetic styles
    ├── responsive.css       # Mobile-first breakpoints
    └── effects.css          # Glassmorphism & blur effects

public/
├── models/                  # 3D model assets
│   ├── avatar.glb
│   ├── city.glb
│   └── nexus.glb
├── textures/               # WebGL textures
│   ├── neon-palette.png
│   ├── glitch-noise.png
│   └── metal-surface.png
└── fonts/                  # Custom cyber fonts
    └── orbitron.woff2

package.json
tsconfig.json
next.config.js
```

## 🎨 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **3D Graphics**: Three.js + Babylon.js
- **Shaders**: GLSL (WebGL 2.0)
- **Animations**: GSAP + Framer Motion
- **Styling**: Tailwind CSS + CSS Modules
- **State**: Zustand + Context API
- **TypeScript**: Full type safety

## 🚀 Core Components

### RealityShatter
Main gateway component with 3D glass-breaking effect on entry.
- Uses Three.js for 3D rendering
- Particle system for glass fragments
- GLSL shaders for material properties

### CyberCity
Procedurally generated cyberpunk cityscape.
- Generates random buildings/structures
- WebGL rendering for performance
- Parallax scrolling implementation

### OrbitalRing
8-segment orbital navigation system.
- NEURAL: AI Analytics
- VOID: Data Void/Vault
- FORGE: Property Creation
- REALMS: Investment Realms
- VAULT: Secure Storage
- STREAM: Live Data Stream
- CORE: System Core
- ABYSS: Deep Learning Monitor

## 🎯 8 Module Ecosystem

```
1. Neural Hub        → AI-powered insights & predictions
2. Void Market       → Real estate market analysis
3. Forge Vault       → Smart contract property management
4. Realms Gate       → Investment opportunity discovery
5. Vault Core        → Encrypted data security
6. Stream Pulse      → Real-time market streaming
7. Core Nexus        → Central system control
8. Abyss Watcher     → Advanced threat detection
```

## 🔧 Setup Instructions

```bash
# Install dependencies
npm install three gsap framer-motion zustand

# Start development server
npm run dev

# Build for production
npm run build

# Run production
npm start
```

## 📊 Performance Optimizations

- GPU-accelerated shaders
- LOD (Level of Detail) for models
- Instanced rendering
- RequestAnimationFrame optimization
- WebGL texture compression
- Lazy loading components

## 🎬 Animation Hierarchy

```
Entry → RealityShatter
      ↓
      CyberCity (parallax)
      ↓
      OrbitalRing (rotation + segments)
      ↓
      Module Selection
      ↓
      Nested module animations
```

## 🔐 Security Features

- End-to-end encryption for sensitive data
- Multi-factor authentication
- Rate limiting on API calls
- CORS protection
- CSP headers

## 📝 Component Template

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useThreeJS } from '@/hooks/useThreeJS';

export default function ComponentName() {
  const mountRef = useRef(null);
  const { scene, camera, renderer } = useThreeJS(mountRef);

  useEffect(() => {
    // Component logic
  }, [scene]);

  return (
    <Canvas ref={mountRef} className="w-full h-screen">
      {/* 3D content */}
    </Canvas>
  );
}
```

---

**Version**: 1.0.0-alpha  
**Last Updated**: December 2025  
**Maintainer**: TareqElnoUmery
