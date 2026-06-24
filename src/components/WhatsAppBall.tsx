import { useEffect, useRef, useCallback } from 'react';
import '../styles/whatsapp-ball.css';

const WHATSAPP_URL = 'https://wa.me/919356636203';

// Physics constants
const GRAVITY = 980;        // px/s²
const BOUNCE = 0.65;        // standard wall bounce restitution
const OBSTACLE_BOUNCE = 1.25; // high rubber bounce restitution for elements
const AIR_DRAG = 0.999;     // air resistance
const BALL_SIZE = 60;       // px
const FLOOR_THRESHOLD = 2;  // velocity to consider "at rest"

// Stuck / Squeeze detection threshold
const STUCK_FRAME_LIMIT = 24; // ~400ms of continuous collision triggers a pop

// Click vs drag
const CLICK_DIST = 6;
const CLICK_TIME = 250;

interface Vec2 {
  x: number;
  y: number;
}

export default function WhatsAppBall() {
  const ballRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Physics state (refs to avoid re-renders)
  const pos = useRef<Vec2>({ x: 0, y: 0 });
  const vel = useRef<Vec2>({ x: 0, y: 0 });
  const rotation = useRef(0);
  const animFrame = useRef(0);
  const tickRef = useRef<(now: number) => void>(() => {});
  const lastTime = useRef(0);
  const isDragging = useRef(false);
  const dragStart = useRef<Vec2>({ x: 0, y: 0 });
  const dragStartTime = useRef(0);
  const dragPrev = useRef<Vec2>({ x: 0, y: 0 });
  const dragPrevTime = useRef(0);
  const mounted = useRef(true);

  // Stuck detection tracking
  const stuckFrames = useRef(0);
  const isPopping = useRef(false);

  // Dynamic obstacles ref
  const obstacles = useRef<Element[]>([]);
  
  // Continuous wind speed state
  const windSpeed = useRef(0);

  // Animation loop active flag
  const isLoopActive = useRef(false);

  // Get viewport bounds
  const getBounds = useCallback(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }), []);

  // Update lists of obstacles to bounce off (buttons, images, cards)
  const updateObstaclesList = useCallback(() => {
    const selector = '.fp-btn-primary, .fp-btn-secondary, .fp-nav-cta, .fp-split-image, .fp-service-card, .fp-blog-card, .fp-project-image-wrap, .fp-project-sidebar, .fp-btn-sidebar';
    obstacles.current = Array.from(document.querySelectorAll(selector));
  }, []);

  // Apply visual position — outer wrapper positions via left/top, inner body rotates
  const applyTransform = useCallback(() => {
    const ball = ballRef.current;
    const body = bodyRef.current;
    if (!ball || !body) return;
    const p = pos.current;
    ball.style.left = `${p.x}px`;
    ball.style.top = `${p.y}px`;
    body.style.transform = `rotate(${rotation.current}deg)`;
  }, []);

  // Pop the ball and respawn it from the top
  const popAndRespawn = useCallback(() => {
    if (isPopping.current) return;
    isPopping.current = true;
    stuckFrames.current = 0;

    const popEl = popRef.current;
    if (popEl) {
      popEl.classList.add('wa-ball-popped');
    }

    // Wait for the pop animation to finish, then reset position
    setTimeout(() => {
      if (!mounted.current) return;

      const bounds = getBounds();
      pos.current = {
        x: Math.random() * (bounds.w - BALL_SIZE),
        y: -BALL_SIZE - 40, // Drop from above top edge
      };
      vel.current = {
        x: (Math.random() - 0.5) * 80,
        y: 0,
      };
      rotation.current = 0;

      if (popEl) {
        popEl.classList.remove('wa-ball-popped');
      }
      isPopping.current = false;

      // Ensure animation loop is active to let the ball fall
      if (!isLoopActive.current) {
        isLoopActive.current = true;
        lastTime.current = 0;
        animFrame.current = requestAnimationFrame(tickRef.current);
      }
    }, 350); // duration matches CSS pop animation
  }, [getBounds]);

  // Physics loop
  const tick = useCallback((now: number) => {
    if (!mounted.current) return;

    // Skip all physics & checks while popping/respawning
    if (isPopping.current) {
      animFrame.current = requestAnimationFrame(tickRef.current);
      return;
    }

    if (lastTime.current === 0) lastTime.current = now;
    let dt = (now - lastTime.current) / 1000;
    lastTime.current = now;

    // Clamp dt to prevent huge jumps
    if (dt > 0.05) dt = 0.05;

    const bounds = getBounds();
    const maxX = bounds.w - BALL_SIZE;
    const maxY = bounds.h - BALL_SIZE;

    // Navbar dynamic ceiling bound
    const navEl = document.querySelector('.fp-nav');
    const ceilingY = navEl ? Math.max(0, navEl.getBoundingClientRect().bottom) : 0;

    if (!isDragging.current) {
      // 1. Continuous wind force
      windSpeed.current = Math.sin(now * 0.0004) * 80 + Math.cos(now * 0.0011) * 40;
      const windAccel = (windSpeed.current - vel.current.x) * 0.55;
      vel.current.x += windAccel * dt;

      // 2. Gravity
      vel.current.y += GRAVITY * dt;

      // 3. Air drag
      vel.current.x *= AIR_DRAG;
      vel.current.y *= AIR_DRAG;

      // 4. Update position
      pos.current.x += vel.current.x * dt;
      pos.current.y += vel.current.y * dt;

      // 5. Bounce off page elements (AABB obstacles)
      const cx = pos.current.x + BALL_SIZE / 2;
      const cy = pos.current.y + BALL_SIZE / 2;
      const radius = BALL_SIZE / 2;
      let isCollidingThisFrame = false;

      const isMobile = bounds.w < 768;
      if (!isMobile) {
        for (const el of obstacles.current) {
          if (!(el instanceof HTMLElement) || el.offsetWidth === 0) continue;

          const rect = el.getBoundingClientRect();

          // Quick AABB check to skip distant objects
          if (
            cx + radius < rect.left ||
            cx - radius > rect.right ||
            cy + radius < rect.top ||
            cy - radius > rect.bottom
          ) {
            continue;
          }

          // Find closest point on rect to circle center
          const closestX = Math.max(rect.left, Math.min(cx, rect.right));
          const closestY = Math.max(rect.top, Math.min(cy, rect.bottom));

          const distX = cx - closestX;
          const distY = cy - closestY;
          const distSq = distX * distX + distY * distY;

          if (distSq < radius * radius) {
            isCollidingThisFrame = true;
            const dist = Math.sqrt(distSq);
            let nx = 0;
            let ny = 0;
            let pen: number;

            if (distSq === 0) {
              // Ball is completely inside. Find the closest edge and push out.
              const dl = cx - rect.left;
              const dr = rect.right - cx;
              const dtEdge = cy - rect.top;
              const db = rect.bottom - cy;
              const minDist = Math.min(dl, dr, dtEdge, db);

              if (minDist === dl) { nx = -1; pen = radius + dl; }
              else if (minDist === dr) { nx = 1; pen = radius + dr; }
              else if (minDist === dtEdge) { ny = -1; pen = radius + dtEdge; }
              else { ny = 1; pen = radius + db; }
            } else {
              nx = distX / dist;
              ny = distY / dist;
              pen = radius - dist;
            }

            // Push out of obstacle
            pos.current.x += nx * pen;
            pos.current.y += ny * pen;

            // Introduce a slight angle deflection (±15 degrees) on element impact
            const skewAngle = (Math.random() - 0.5) * 0.5; // in radians
            const cosS = Math.cos(skewAngle);
            const sinS = Math.sin(skewAngle);
            
            // Skewed normal vector
            const rx = nx * cosS - ny * sinS;
            const ry = nx * sinS + ny * cosS;

            // Reflect velocity on the skewed normal, using high OBSTACLE_BOUNCE (rubber behavior)
            const vn = vel.current.x * rx + vel.current.y * ry;
            if (vn < 0) {
              const impulse = -(1 + OBSTACLE_BOUNCE) * vn;
              vel.current.x += rx * impulse;
              vel.current.y += ry * impulse;
            }
          }
        }
      }

      // Handle squeeze accumulation
      if (isCollidingThisFrame) {
        stuckFrames.current += 1;
        if (stuckFrames.current > STUCK_FRAME_LIMIT) {
          popAndRespawn();
        }
      } else {
        stuckFrames.current = 0;
      }

      // 6. Floor collision
      if (pos.current.y >= maxY) {
        pos.current.y = maxY;
        if (Math.abs(vel.current.y) > FLOOR_THRESHOLD) {
          vel.current.y = -vel.current.y * BOUNCE;
        } else {
          vel.current.y = 0;
        }
        
        // Continuous floor rolling friction
        const rollingFriction = Math.pow(0.85, dt * 60);
        vel.current.x *= rollingFriction;
      }

      // Ceiling boundary (navbar bottom)
      if (pos.current.y < ceilingY && vel.current.y < 0) {
        pos.current.y = ceilingY;
        vel.current.y = -vel.current.y * BOUNCE;
      }

      // Left wall boundary
      if (pos.current.x < 0) {
        pos.current.x = 0;
        vel.current.x = -vel.current.x * BOUNCE;
      }

      // Right wall boundary
      if (pos.current.x > maxX) {
        pos.current.x = maxX;
        vel.current.x = -vel.current.x * BOUNCE;
      }

      // 7. Rolling rotation based on horizontal movement
      rotation.current += vel.current.x * dt * 0.5;
    }

    applyTransform();

    // Check if the ball is at rest on the floor
    const isAtFloor = pos.current.y >= maxY;
    const isStationaryY = vel.current.y === 0;
    const isStationaryX = Math.abs(vel.current.x) < 0.1;

    if (isAtFloor && isStationaryY && isStationaryX && !isDragging.current) {
      // Ball is at rest! Stop the physics loop to save resource cycles and prevent scrolling jitter
      vel.current.x = 0;
      isLoopActive.current = false;
      lastTime.current = 0;
      return;
    }

    animFrame.current = requestAnimationFrame(tickRef.current);
  }, [getBounds, applyTransform, popAndRespawn]);

  // Sync ref to tick
  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  // Pointer handlers
  const onPointerDown = useCallback((e: PointerEvent) => {
    e.preventDefault();
    if (isPopping.current) return;
    
    isDragging.current = true;
    stuckFrames.current = 0;

    const ball = ballRef.current;
    if (ball) ball.setPointerCapture(e.pointerId);

    dragStart.current = { x: e.clientX, y: e.clientY };
    dragStartTime.current = performance.now();
    dragPrev.current = { x: e.clientX, y: e.clientY };
    dragPrevTime.current = performance.now();
    vel.current = { x: 0, y: 0 };

    ball?.classList.add('wa-ball-grabbed');

    // Restart loop when interaction starts
    if (!isLoopActive.current) {
      isLoopActive.current = true;
      lastTime.current = 0;
      animFrame.current = requestAnimationFrame(tickRef.current);
    }
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;
    const now = performance.now();
    const dtMs = now - dragPrevTime.current;
    if (dtMs > 0) {
      // Smooth velocity from drag movement
      const dvx = (e.clientX - dragPrev.current.x) / (dtMs / 1000);
      const dvy = (e.clientY - dragPrev.current.y) / (dtMs / 1000);
      vel.current = {
        x: dvx * 0.4 + vel.current.x * 0.6,
        y: dvy * 0.4 + vel.current.y * 0.6,
      };
    }

    pos.current = {
      x: e.clientX - BALL_SIZE / 2,
      y: e.clientY - BALL_SIZE / 2,
    };
    dragPrev.current = { x: e.clientX, y: e.clientY };
    dragPrevTime.current = now;
    applyTransform();
  }, [applyTransform]);

  const onPointerUp = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const ball = ballRef.current;
    ball?.classList.remove('wa-ball-grabbed');

    // Detect click vs throw
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const elapsed = performance.now() - dragStartTime.current;

    if (dist < CLICK_DIST && elapsed < CLICK_TIME) {
      // It's a click — open WhatsApp
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
      vel.current = { x: 0, y: 0 };
    }
  }, []);

  // Mount / unmount
  useEffect(() => {
    mounted.current = true;
    const ball = ballRef.current;
    if (!ball) return;

    // Start position: Random horizontally in upper screen area, falls down naturally
    const bounds = getBounds();
    pos.current = {
      x: Math.random() * (bounds.w - BALL_SIZE),
      y: -BALL_SIZE - 20, // drop from top border
    };
    vel.current = {
      x: (Math.random() - 0.5) * 100, // gentle side drift as it falls
      y: 0,
    };

    applyTransform();

    // Scan for obstacles on page load
    updateObstaclesList();

    // Start physics
    isLoopActive.current = true;
    lastTime.current = 0;
    animFrame.current = requestAnimationFrame(tick);

    // Bind pointer events
    ball.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Re-scan layout changes on window events
    window.addEventListener('resize', updateObstaclesList);
    
    // Periodically scan for dynamic components (lazy-loaded elements, etc.)
    const scanInterval = setInterval(updateObstaclesList, 5000);

    // Resize boundaries clamping
    const onResize = () => {
      const b = getBounds();
      const newMaxY = b.h - BALL_SIZE;
      
      // If it was at rest on the floor, snap it to the new floor level
      if (pos.current.y >= newMaxY - 5) {
        pos.current.y = newMaxY;
      }
      
      if (pos.current.x > b.w - BALL_SIZE) pos.current.x = b.w - BALL_SIZE;
      if (pos.current.y > newMaxY) pos.current.y = newMaxY;
      
      applyTransform();

      // Restart loop to let the physics engine settle
      if (!isLoopActive.current) {
        isLoopActive.current = true;
        lastTime.current = 0;
        animFrame.current = requestAnimationFrame(tickRef.current);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      mounted.current = false;
      cancelAnimationFrame(animFrame.current);
      ball.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('resize', updateObstaclesList);
      clearInterval(scanInterval);
    };
  }, [getBounds, applyTransform, tick, onPointerDown, onPointerMove, onPointerUp, updateObstaclesList]);

  return (
    <div
      ref={ballRef}
      className="wa-ball-wrapper"
      role="button"
      aria-label="Throw it around!"
      tabIndex={0}
      title="Throw it around!"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      <div ref={popRef} className="wa-ball-pop-container">
        <div ref={bodyRef} className="wa-ball">
          {/* WhatsApp SVG icon */}
          <svg className="wa-ball-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
              fill="white"
            />
            <path
              d="M12.05 2C6.532 2 2.05 6.478 2.05 11.992c0 1.94.556 3.747 1.516 5.278L2 22l4.844-1.535A9.953 9.953 0 0012.05 22C17.565 22 22.05 17.522 22.05 12.008 22.05 6.494 17.565 2 12.05 2zm0 18.054a8.078 8.078 0 01-4.228-1.19l-.29-.178-3.1.983.993-3.044-.198-.305A8.004 8.004 0 014.004 12c0-4.41 3.588-7.994 8.002-7.994 4.41 0 8.003 3.583 8.003 7.994 0 4.41-3.592 8.054-8.003 8.054h.044z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Tooltip text: Throw it around! */}
      <span className="wa-ball-tooltip">Throw it around!</span>
    </div>
  );
}
