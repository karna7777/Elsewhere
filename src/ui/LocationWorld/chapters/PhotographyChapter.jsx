import { memo } from 'react'
import Chapter from './Chapter'
import { FullBleed } from './editorial'

// Build a varied rhythm from the frames: a cinematic full-bleed, then a two-up
// diptych, alternating — so a long visual journey reads as a paced gallery
// instead of an endless stack of identical full-bleeds. A lone trailing frame
// always renders full-bleed. Original indices are preserved for the lightbox.
function buildRows(frames) {
  const rows = []
  let i = 0
  let full = true
  while (i < frames.length) {
    const remaining = frames.length - i
    if (full || remaining === 1) {
      rows.push({ type: 'full', items: [{ frame: frames[i], idx: i }] })
      i += 1
    } else {
      rows.push({
        type: 'pair',
        items: [
          { frame: frames[i], idx: i },
          { frame: frames[i + 1], idx: i + 1 },
        ],
      })
      i += 2
    }
    full = !full
  }
  return rows
}

// PhotographyChapter — "What will you remember?" The visual journey shown as a
// paced editorial gallery: cinematic full-bleeds interleaved with diptychs, each
// frame's title + one line floated over the image. Clicking opens the fullscreen
// viewer (reuses the existing lightbox via onOpenImage).
function PhotographyChapter({ location, onOpenImage }) {
  const frames = location?.visualJourney ?? []
  if (frames.length < 2) return null

  const rows = buildRows(frames)

  const renderFrame = ({ frame, idx }, height) => (
    <FullBleed
      key={`${frame.title ?? 'frame'}-${idx}`}
      url={frame.url ?? null}
      query={frame.imageQuery ?? `${location.name} ${frame.title ?? ''}`}
      kicker={frame.title || undefined}
      caption={frame.description || undefined}
      height={height}
      onClick={onOpenImage ? () => onOpenImage(frames, idx) : undefined}
    />
  )

  return (
    <Chapter
      id="photography"
      kicker="What you'll remember"
      title="A visual journey"
      lead="Scenes from the place, as you'll carry them home."
    >
      <style>{`
        .photo-frames { display: flex; flex-direction: column; gap: clamp(20px, 3vw, 40px); margin-top: 8px; }
        .photo-pair { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 2.4vw, 32px); }
        @media (max-width: 720px) { .photo-pair { grid-template-columns: 1fr; } }
      `}</style>

      <div className="photo-frames">
        {rows.map((row, r) =>
          row.type === 'full' ? (
            renderFrame(row.items[0], '76vh')
          ) : (
            <div className="photo-pair" key={`pair-${r}`}>
              {row.items.map((item) => renderFrame(item, '56vh'))}
            </div>
          )
        )}
      </div>
    </Chapter>
  )
}

export default memo(PhotographyChapter)
