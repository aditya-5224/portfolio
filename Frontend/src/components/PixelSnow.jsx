import { useEffect, useRef, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import './PixelSnow.css'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uFlakeSize;
uniform float uMinFlakeSize;
uniform float uPixelResolution;
uniform float uSpeed;
uniform float uDepthFade;
uniform float uFarPlane;
uniform vec3 uColor;
uniform float uBrightness;
uniform float uGamma;
uniform float uDensity;
uniform float uVariant;
uniform float uDirection;

// Precomputed constants
#define PI 3.14159265
#define PI_OVER_6 0.5235988
#define PI_OVER_3 1.0471976
#define INV_SQRT3 0.57735027
#define M1 1597334677U
#define M2 3812015801U
#define M3 3299493293U
#define F0 2.3283064e-10

// Optimized hash - inline multiplication
#define hash(n) (n * (n ^ (n >> 15U)))
#define coord3(p) (uvec3(p).x * M1 ^ uvec3(p).y * M2 ^ uvec3(p).z * M3)

// Precomputed camera basis vectors (normalized vec3(1,1,1), vec3(1,0,-1))
const vec3 camK = vec3(0.57735027, 0.57735027, 0.57735027);
const vec3 camI = vec3(0.70710678, 0.0, -0.70710678);
const vec3 camJ = vec3(-0.40824829, 0.81649658, -0.40824829);

// Precomputed branch direction
const vec2 b1d = vec2(0.574, 0.819);

vec3 hash3(uint n) {
  uvec3 hashed = hash(n) * uvec3(1U, 511U, 262143U);
  return vec3(hashed) * F0;
}

float snowflakeDist(vec2 p) {
  float r = length(p);
  float a = atan(p.y, p.x);
  a = abs(mod(a + PI_OVER_6, PI_OVER_3) - PI_OVER_6);
  vec2 q = r * vec2(cos(a), sin(a));
  float dMain = max(abs(q.y), max(-q.x, q.x - 1.0));
  float b1t = clamp(dot(q - vec2(0.4, 0.0), b1d), 0.0, 0.4);
  float dB1 = length(q - vec2(0.4, 0.0) - b1t * b1d);
  float b2t = clamp(dot(q - vec2(0.7, 0.0), b1d), 0.0, 0.25);
  float dB2 = length(q - vec2(0.7, 0.0) - b2t * b1d);
  return min(dMain, min(dB1, dB2)) * 10.0;
}

void main() {
  // Precompute reciprocals to avoid division
  float invPixelRes = 1.0 / uPixelResolution;
  float pixelSize = max(1.0, floor(0.5 + uResolution.x * invPixelRes));
  float invPixelSize = 1.0 / pixelSize;
  vec2 fragCoord = floor(gl_FragCoord.xy * invPixelSize);
  vec2 res = uResolution * invPixelSize;
  float invResX = 1.0 / res.x;
  vec3 ray = normalize(vec3((fragCoord - res * 0.5) * invResX, 1.0));
  ray = ray.x * camI + ray.y * camJ + ray.z * camK;

  // Precompute time-based values
  float timeSpeed = uTime * uSpeed;
  float windX = cos(uDirection) * 0.4;
  float windY = sin(uDirection) * 0.4;
  vec3 camPos = (windX * camI + windY * camJ + 0.1 * camK) * timeSpeed;
  vec3 pos = camPos;

  // Precompute ray reciprocal for strides
  vec3 absRay = max(abs(ray), vec3(0.001));
  vec3 strides = 1.0 / absRay;
  vec3 raySign = step(ray, vec3(0.0));
  vec3 phase = fract(pos) * strides;
  phase = mix(strides - phase, phase, raySign);

  // Precompute for intersection test
  float rayDotCamK = dot(ray, camK);
  float invRayDotCamK = 1.0 / rayDotCamK;
  float invDepthFade = 1.0 / uDepthFade;
  float halfInvResX = 0.5 * invResX;
  vec3 timeAnim = timeSpeed * 0.1 * vec3(7.0, 8.0, 5.0);

  float t = 0.0;
  for (int i = 0; i < 128; i++) {
    if (t >= uFarPlane) break;
    vec3 fpos = floor(pos);
    uint cellCoord = coord3(fpos);
    float cellHash = hash3(cellCoord).x;
    if (cellHash < uDensity) {
      vec3 h = hash3(cellCoord);
      
      // Optimized flake position calculation
      vec3 sinArg1 = fpos.yzx * 0.073;
      vec3 sinArg2 = fpos.zxy * 0.27;
      vec3 flakePos = 0.5 - 0.5 * cos(4.0 * sin(sinArg1) + 4.0 * sin(sinArg2) + 2.0 * h + timeAnim);
      flakePos = flakePos * 0.8 + 0.1 + fpos;
      
      float toIntersection = dot(flakePos - pos, camK) * invRayDotCamK;
      if (toIntersection > 0.0) {
        vec3 testPos = pos + ray * toIntersection - flakePos;
        float testX = dot(testPos, camI);
        float testY = dot(testPos, camJ);
        vec2 testUV = abs(vec2(testX, testY));
        float depth = dot(flakePos - camPos, camK);
        float flakeSize = max(uFlakeSize, uMinFlakeSize * depth * halfInvResX);
        
        // Avoid branching with step functions where possible
        float dist;
        if (uVariant < 0.5) {
          dist = max(testUV.x, testUV.y);
        } else if (uVariant < 1.5) {
          dist = length(testUV);
        } else {
          float invFlakeSize = 1.0 / flakeSize;
          dist = snowflakeDist(vec2(testX, testY) * invFlakeSize) * flakeSize;
        }
        
        if (dist < flakeSize) {
          float flakeSizeRatio = uFlakeSize / flakeSize;
          float intensity = exp2(-(t + toIntersection) * invDepthFade) *
                           min(1.0, flakeSizeRatio * flakeSizeRatio) * uBrightness;
          gl_FragColor = vec4(uColor * pow(vec3(intensity), vec3(uGamma)), 1.0);
          return;
        }
      }
    }
    float nextStep = min(min(phase.x, phase.y), phase.z);
    vec3 sel = step(phase, vec3(nextStep));
    phase = phase - nextStep + strides * sel;
    t += nextStep;
    pos = mix(pos + ray * nextStep, floor(pos + ray * nextStep + 0.5), sel);
  }
  gl_FragColor = vec4(0.0);
}
`

export default function PixelSnow({
  color = '#ffffff',
  flakeSize = 0.01,
  minFlakeSize = 1.25,
  pixelResolution = 200,
  speed = 1.25,
  density = 0.3,
  direction = 125,
  brightness = 1,
  depthFade = 8,
  farPlane = 20,
  gamma = 0.4545,
  variant = 'square',
  className = '',
  style = {}
}) {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const observerRef = useRef(null)
  const frameRef = useRef(null)
  const isVisibleRef = useRef(true)
  const resizeTimeoutRef = useRef(null)

  // Memoize variant value
  const variantValue = useMemo(() => {
    const variantMap = { square: 0, round: 1, snowflake: 2 }
    return variantMap[variant] ?? 0
  }, [variant])

  // Memoize color as Vector3
  const colorVector = useMemo(() => {
    const colorObj = new THREE.Color(color)
    return new THREE.Vector3(colorObj.r, colorObj.g, colorObj.b)
  }, [color])

  useEffect(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth || window.innerWidth
    const height = containerRef.current.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const canvas = document.createElement('canvas')
    containerRef.current.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      stencil: false,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance'
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height, false)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    const geometry = new THREE.PlaneGeometry(2, 2)

    const directionRad = (direction * Math.PI) / 180

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.NoBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uFlakeSize: { value: flakeSize },
        uMinFlakeSize: { value: minFlakeSize },
        uPixelResolution: { value: pixelResolution },
        uSpeed: { value: speed },
        uDepthFade: { value: depthFade },
        uFarPlane: { value: farPlane },
        uColor: { value: colorVector },
        uBrightness: { value: brightness },
        uGamma: { value: gamma },
        uDensity: { value: density },
        uVariant: { value: variantValue },
        uDirection: { value: directionRad }
      }
    })

    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    meshRef.current = mesh
    scene.add(mesh)

    let startTime = performance.now()

    const animate = () => {
      if (!isVisibleRef.current) {
        frameRef.current = null
        return
      }

      const currentTime = performance.now()
      const elapsedSeconds = (currentTime - startTime) / 1000

      material.uniforms.uTime.value = elapsedSeconds

      renderer.render(scene, camera)
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)

      resizeTimeoutRef.current = setTimeout(() => {
        const newWidth = containerRef.current?.clientWidth || window.innerWidth
        const newHeight = containerRef.current?.clientHeight || window.innerHeight

        renderer.setSize(newWidth, newHeight, false)
        material.uniforms.uResolution.value.set(newWidth, newHeight)
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    const visibilityObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const wasVisible = isVisibleRef.current
          isVisibleRef.current = entry.isIntersecting
          // Restart animation loop if it was stopped
          if (!wasVisible && entry.isIntersecting && !frameRef.current) {
            frameRef.current = requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0 }
    )

    visibilityObserver.observe(containerRef.current)
    observerRef.current = visibilityObserver

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
      if (observerRef.current) observerRef.current.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)

      geometry.dispose()
      material.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }, [
    flakeSize,
    minFlakeSize,
    pixelResolution,
    speed,
    depthFade,
    farPlane,
    brightness,
    density,
    variantValue,
    direction,
    gamma,
    colorVector
  ])

  return (
    <div
      ref={containerRef}
      className={`pixel-snow-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        ...style
      }}
    />
  )
}