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
      style={{ padding: '56px 48px', maxWidth: 'var(--content-max, 1280px)', margin: '0 auto' }}
    >
      {title && (
        <h2
          className="lw-kicker"
          style={{
            margin: '0 0 30px',
            // Inline font-family so the panel's serif-heading rule never catches
            // these tracked caption labels.
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-eyebrow, 14px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  )
}
