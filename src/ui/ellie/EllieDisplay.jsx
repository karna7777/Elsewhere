import { memo, useEffect, useRef, useState } from 'react'
import useStore from '../../store/useStore'

const THINKING_DOTS = ['.', '..', '...']

// Walk up to the nearest scrollable ancestor (the LocationWorld scroll area).
function findScrollParent(node) {
  let el = node?.parentElement
  while (el) {
    const oy = getComputedStyle(el).overflowY
    if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return el
    el = el.parentElement
  }
  return null
}

// Live response area. Subscribes ONLY to ellieStreamText + ellieThinking, so the
// streamed reveal rerenders this component alone — never the whole module. Before
// the first token it shows a quiet "thinking" line; the smooth character reveal is
// driven upstream in EllieModule (batched ~25ms), so this just renders the text.
function EllieDisplay() {
  const text = useStore((s) => s.ellieStreamText)
  const thinking = useStore((s) => s.ellieThinking)

  const bottomRef = useRef(null)
  const autoScrollRef = useRef(true)
  const [dot, setDot] = useState(0)

  // Cycle the thinking dots every 400ms — only while thinking, no spinner.
  useEffect(() => {
    if (!thinking) return undefined
    const id = setInterval(() => setDot((d) => (d + 1) % THINKING_DOTS.length), 400)
    return () => clearInterval(id)
  }, [thinking])

  // Watch the scroll container once: scrolling up away from the bottom disables
  // auto-scroll; it re-enables when a new message begins (see the effect below).
  useEffect(() => {
    const el = findScrollParent(bottomRef.current)
    if (!el) return undefined
    const onScroll = () => {
      autoScrollRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Each new message (thinking begins) re-enables following the stream.
  useEffect(() => {
    if (thinking) autoScrollRef.current = true
  }, [thinking])

  // Follow the stream to the bottom while auto-scroll is active.
  useEffect(() => {
    if (autoScrollRef.current && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [text, thinking])

  if (thinking && !text) {
    return (
      <div style={{ maxWidth: 780 }}>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          Ellie is thinking{THINKING_DOTS[dot]}
        </p>
        <div ref={bottomRef} />
      </div>
    )
  }

  if (!text) return null

  return (
    <div style={{ maxWidth: 780 }}>
      <p
        style={{
          margin: 0,
          fontSize: 'clamp(19px, 2.2vw, 27px)',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.9)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {text}
      </p>
      <p
        style={{
          margin: '18px 0 0',
          fontSize: 13,
          letterSpacing: '0.1em',
          color: 'rgba(232,192,122,0.65)',
        }}
      >
        Ellie ✦
      </p>
      <div ref={bottomRef} />
    </div>
  )
}

export default memo(EllieDisplay)
