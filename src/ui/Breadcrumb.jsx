import useStore from '../store/useStore'

// Breadcrumb is the navigation chrome for levelHistory. Its string segments are:
//   ['Elsewhere', <continent>, <country>, <root.name>, ...drilled children]
// The trailing `levelDepth` segments map 1:1 to levelHistory levels; the leading
// context segments (continent/country) are non-navigable. Clicking a level trims
// the stack in ONE transition (goToLevel) rather than repeated popLevel() calls.
export default function Breadcrumb() {
  const breadcrumb = useStore((s) => s.breadcrumb)
  const levelDepth = useStore((s) => s.levelHistory.length)
  const goToLevel = useStore((s) => s.goToLevel)
  const closePanel = useStore((s) => s.closePanel)

  if (!breadcrumb || breadcrumb.length === 0) return null

  // Index where the level segments begin (after Elsewhere + context segments).
  const base = breadcrumb.length - levelDepth
  const lastIndex = breadcrumb.length - 1

  const isClickable = (i) => i === 0 || (i >= base && i < lastIndex)

  const handleClick = (i) => {
    if (i === 0) {
      closePanel() // 'Elsewhere' → back to the globe
    } else if (i >= base && i < lastIndex) {
      goToLevel(i - base) // jump straight to this level
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 84,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 49,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 30,
        padding: '9px 22px',
        fontSize: 14,
        whiteSpace: 'nowrap',
        maxWidth: '90vw',
        overflow: 'hidden',
      }}
    >
      {breadcrumb.map((item, i) => {
        const isLast = i === lastIndex
        const clickable = isClickable(i)
        return (
          <span key={`${item}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ opacity: 0.3 }}>›</span>}
            <span
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              onClick={clickable ? () => handleClick(i) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleClick(i)
                      }
                    }
                  : undefined
              }
              style={{
                color: isLast ? '#7dd3fc' : 'rgba(255,255,255,0.5)',
                cursor: clickable ? 'pointer' : 'default',
                transition: 'color 0.2s ease',
                outline: 'none',
              }}
              onMouseEnter={
                clickable ? (e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)') : undefined
              }
              onMouseLeave={
                clickable
                  ? (e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')
                  : undefined
              }
            >
              {item}
            </span>
          </span>
        )
      })}
    </div>
  )
}
