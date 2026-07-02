import { memo } from 'react'
import useStore from '../store/useStore'

// Glass top-bar control that toggles the application's audio-muted state.
// Purely a state toggle — it owns no audio engine.

const STYLE = `
  .mute-toggle { transition: transform 0.2s ease, border-color 0.2s ease; }
  .mute-toggle:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.28); }
  .mute-toggle:focus-visible { outline: 2px solid rgba(125,211,252,0.6); outline-offset: 3px; }
`

function SpeakerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function SpeakerOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function MuteToggle() {
  const audioMuted = useStore((s) => s.audioMuted)
  const toggleMute = useStore((s) => s.toggleMute)

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleMute()
    }
  }

  return (
    <>
      <style>{STYLE}</style>
      <div
        className="mute-toggle"
        role="button"
        tabIndex={0}
        aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
        aria-pressed={audioMuted}
        onClick={toggleMute}
        onKeyDown={onKeyDown}
        style={{
          position: 'fixed',
          top: 29,
          left: 82,
          zIndex: 50,
          width: 38,
          height: 38,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: 'rgba(255,255,255,0.75)',
          cursor: 'pointer',
        }}
      >
        {audioMuted ? <SpeakerOffIcon /> : <SpeakerIcon />}
      </div>
    </>
  )
}

export default memo(MuteToggle)
