import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function FullPageScroll({ children }) {
  const [current, setCurrent]     = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);   // 1 = forward, -1 = back
  const containerRef  = useRef(null);
  const touchStartY   = useRef(null);
  const slides        = React.Children.toArray(children);
  const total         = slides.length;

  // ── Core navigation function ──────────────────────────────
  // Guard: does nothing if already animating, already on that slide,
  // or index is out of bounds.
  // Sets direction, locks animating for exactly 900 ms, then unlocks.
  const goTo = useCallback(
    (next) => {
      if (animating || next === current || next < 0 || next >= total) return;
      setDirection(next > current ? 1 : -1);
      setAnimating(true);
      setCurrent(next);
      setTimeout(() => setAnimating(false), 900);
    },
    [animating, current, total]
  );

  // ── Wheel handler ─────────────────────────────────────────
  // Smart boundary detection: if the wheel event originates inside
  // an element that has overflow-y:auto/scroll AND still has scrollable
  // content in the direction of the wheel, let the inner scroll happen
  // naturally. Only intercept at the top/bottom boundary of that inner
  // scroll, or when there is no inner scroll container at all.
  useEffect(() => {
    let wheelTimer = null;

    const getScrollableParent = (el) => {
      while (el && el !== document.body) {
        const style     = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const scrollable = overflowY === 'auto' || overflowY === 'scroll';
        if (scrollable && el.scrollHeight > el.clientHeight) return el;
        el = el.parentElement;
      }
      return null;
    };

    const onWheel = (e) => {
      if (animating) return;

      const scrollable = getScrollableParent(e.target);

      if (scrollable) {
        const atTop    = scrollable.scrollTop <= 0;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;

        // Still scrollable in this direction — let browser handle it
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop)    return;

        // At boundary — take over
        e.preventDefault();
      } else {
        e.preventDefault();
      }

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        if (e.deltaY > 30)       goTo(current + 1);
        else if (e.deltaY < -30) goTo(current - 1);
      }, 50);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(wheelTimer);
    };
  }, [animating, current, goTo]);

  // ── Touch handler ─────────────────────────────────────────
  // Same boundary logic as wheel: swipe navigates slides only when
  // the inner scrollable container is already at its top or bottom.
  useEffect(() => {
    const touchScrollableRef = { el: null };

    const getScrollableParent = (el) => {
      while (el && el !== document.body) {
        const style     = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if (
          (overflowY === 'auto' || overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight
        ) return el;
        el = el.parentElement;
      }
      return null;
    };

    const onTouchStart = (e) => {
      touchStartY.current    = e.touches[0].clientY;
      touchScrollableRef.el  = getScrollableParent(e.target);
    };

    const onTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const diff       = touchStartY.current - e.changedTouches[0].clientY;
      const scrollable = touchScrollableRef.el;

      if (scrollable) {
        const atTop    = scrollable.scrollTop <= 0;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;
        if (diff > 50  && atBottom) goTo(current + 1);
        if (diff < -50 && atTop)    goTo(current - 1);
      } else {
        if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
      }

      touchStartY.current   = null;
      touchScrollableRef.el = null;
    };

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend',   onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [current, goTo]);

  // ── Keyboard handler ──────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(current + 1);
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  // ── Render ────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{
        position:   'fixed',
        inset:      0,
        overflow:   'hidden',
        perspective:'1200px',   // enables 3D transforms on children
      }}
    >
      {/* ── Slides ── */}
      {slides.map((slide, i) => {
        const offset    = i - current;
        const isVisible = Math.abs(offset) <= 1;

        // Default = hidden slide far below
        let translateY = '100vh';
        let translateZ = '0px';
        let rotateX    = '0deg';
        let opacity    = 1;
        let zIndex     = 5;

        if (offset === 0) {
          // ACTIVE slide — full position, fully visible
          translateY = '0';
          translateZ = '0px';
          rotateX    = '0deg';
          opacity    = 1;
          zIndex     = 10;
        } else if (offset < 0) {
          // PREVIOUS slide — recedes backward and upward, fades out
          translateY = '-60px';
          translateZ = '-300px';
          rotateX    = '-8deg';
          opacity    = 0;
          zIndex     = 5;
        }
        // offset > 0 uses the default (waits below, full opacity, ready to rise)

        return (
          <div
            key={i}
            style={{
              position:           'absolute',
              inset:              0,
              width:              '100%',
              height:             '100%',
              transformOrigin:    'center bottom',
              transform:          `translateY(${translateY}) translateZ(${translateZ}) rotateX(${rotateX})`,
              opacity,
              zIndex:             isVisible ? zIndex : -1,
              // Apply transition ONLY while animating to avoid flicker on mount
              transition: animating
                ? 'transform 0.85s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.85s cubic-bezier(0.76, 0, 0.24, 1)'
                : 'none',
              willChange:         'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            {slide}
          </div>
        );
      })}

      {/* ── Navigation Dots (right side, vertically centered) ── */}
      <nav
        style={{
          position:       'fixed',
          right:          '2rem',
          top:            '50%',
          transform:      'translateY(-50%)',
          zIndex:         100,
          display:        'flex',
          flexDirection:  'column',
          gap:            '12px',
          alignItems:     'center',
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            title={`Go to slide ${i + 1}`}
            style={{
              // Active dot = tall pill  |  Inactive dot = small circle
              width:        i === current ? '10px'  : '8px',
              height:       i === current ? '32px'  : '8px',
              borderRadius: i === current ? '5px'   : '50%',
              background:   i === current ? '#e63946' : 'rgba(255,255,255,0.5)',
              border:       '2px solid rgba(0,0,0,0.15)',
              cursor:       'pointer',
              // Spring cubic-bezier gives a satisfying overshoot on expand
              transition:   'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              padding:      0,
              outline:      'none',
              boxShadow:    i === current ? '0 0 0 3px rgba(230,57,70,0.25)' : 'none',
            }}
          />
        ))}
      </nav>

      {/* ── Slide counter (bottom-right) ── */}
      <div
        style={{
          position:      'fixed',
          bottom:        '2rem',
          right:         '2.5rem',
          zIndex:        100,
          fontFamily:    'serif',
          fontSize:      '12px',
          letterSpacing: '2px',
          color:         'rgba(0,0,0,0.35)',
          mixBlendMode:  'multiply',
          pointerEvents: 'none',
        }}
      >
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
}
