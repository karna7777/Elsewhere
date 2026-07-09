import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

// Split `text` around the first case-insensitive occurrence of `query`, so the
// matched portion can be emphasised. Returns [before, match, after].
function splitMatch(text, query) {
  const q = (query || '').trim()
  if (!q) return [text, '', '']
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return [text, '', '']
  return [text.slice(0, i), text.slice(i, i + q.length), text.slice(i + q.length)]
}

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '10px 16px',
  borderRadius: 14,
  cursor: 'pointer',
}

const nameStyle = {
  color: 'rgba(255,255,255,0.9)',
  fontSize: 15,
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const secondaryStyle = {
  color: 'rgba(255,255,255,0.45)',
  fontSize: 12.5,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

// A single search result: icon + emphasised name + muted subtitle. Memoized so a
// row only re-renders when its own props change (selection, query, item).
function SearchResultItem({ id, item, icon, secondary, query, active, index, onHover, onChoose }) {
  const [before, match, after] = useMemo(() => splitMatch(item.name, query), [item.name, query])

  return (
    <motion.div
      id={id}
      role="option"
      aria-selected={active}
      className="search-result-row"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.025, ease: 'easeOut' }}
      whileHover={{ x: 4 }}
      // mousedown (not click) so selection fires before the input blur closes the list
      onMouseDown={(e) => {
        e.preventDefault()
        onChoose(index)
      }}
      onMouseEnter={() => onHover(index)}
      style={{
        ...rowStyle,
        background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
        boxShadow: active ? 'inset 0 0 0 1px rgba(125,211,252,0.35)' : 'none',
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0, width: 26, textAlign: 'center' }} aria-hidden="true">
        {icon}
      </span>
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={nameStyle}>
          {before}
          <span style={{ color: '#fff', fontWeight: 600 }}>{match}</span>
          {after}
        </span>
        {secondary && <span style={secondaryStyle}>{secondary}</span>}
      </div>
    </motion.div>
  )
}

export default memo(SearchResultItem)
