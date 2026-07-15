import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Chapter — the single primitive every section of the destination journey is
// built from. It provides the scroll anchor (for the rail's scroll-spy), the
// vertical rhythm, an optional gold kicker (the emotion the chapter answers) above
// a huge serif title, and a gentle reveal as it scrolls into view.
//
// `bare` wraps an existing module that already renders its own headings — then we
// only supply the anchor + rhythm, no kicker/title/reveal, so nothing doubles up.
export default function Chapter({ id, kicker, title, lead, bare = false, children }) {
  if (bare) {
    return (
      <section id={id} data-chapter={id} className="lw-chapter lw-chapter--bare">
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      data-chapter={id}
      className="lw-chapter"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {(kicker || title) && (
        <div className="lw-chapter-head">
          {kicker && <p className="lw-chapter-kicker">{kicker}</p>}
          {title && <h2 className="lw-chapter-title">{title}</h2>}
          {lead && <p className="lw-chapter-lead">{lead}</p>}
        </div>
      )}
      {children}
    </motion.section>
  )
}
