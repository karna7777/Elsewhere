// The opening black screen. Shows the wordmark and real Three.js asset-loading
// progress until the 3D scene is ready. The overlay, wordmark and progress block
// are driven out by GSAP through the refs passed in from the orchestrator.

export default function LoadingScreen({ progress, overlayRef, wordmarkRef, progressRef }) {
  const pct = Math.round(Math.min(100, Math.max(0, progress)))

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <style>{`
        @keyframes els-wordmark-pulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 0.85; }
        }
        .els-wordmark { animation: els-wordmark-pulse 2.2s ease-in-out infinite; }
      `}</style>

      <div ref={wordmarkRef}>
        <span
          className="els-wordmark"
          style={{
            display: 'inline-block',
            fontSize: 20,
            fontWeight: 200,
            letterSpacing: '0.45em',
            paddingLeft: '0.45em', // balance the trailing letter-spacing so it reads centered
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          ELSEWHERE
        </span>
      </div>

      <div
        ref={progressRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 180,
            height: 1,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: '#7dd3fc',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.18)' }}>
          {pct}%
        </span>
      </div>
    </div>
  )
}
