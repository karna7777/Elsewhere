import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Shared shell for every module section. One titled block: consistent padding,
// max-width and entrance animation. Title (and its icon) are optional — pass no
// title for an untitled section (e.g. an opening narrative) and no heading is
// rendered, so empty sections collapse naturally.
export default function ModuleWrapper({ title, icon, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ padding: '40px 48px', maxWidth: 900, margin: '0 auto' }}
    >
      {title && (
        <h2
          style={{
            margin: '0 0 32px',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  )
}
