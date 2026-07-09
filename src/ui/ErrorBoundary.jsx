import { Component } from 'react'

// A render-time crash anywhere in the tree used to unmount the whole React root,
// leaving the page on its black background (globe included). This boundary
// contains a crash to its subtree: the rest of the app keeps running, and the
// error is shown (and logged) instead of silently blacking out the screen.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Surface it for debugging — the message + component stack point at the cause.
    console.error('[ErrorBoundary]', this.props.label ?? '', error, info?.componentStack)
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div
        role="alert"
        style={{
          padding: '48px 40px',
          maxWidth: 680,
          margin: '40px auto',
          borderRadius: 16,
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.3)',
          color: 'rgba(255,255,255,0.85)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <h2 style={{ margin: '0 0 10px', fontSize: 18, color: '#fca5a5' }}>
          Something broke while rendering this section
        </h2>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
          The rest of the app is still running — this panel caught the error instead
          of taking the whole screen down.
        </p>
        <pre
          style={{
            margin: '0 0 20px',
            padding: 14,
            borderRadius: 10,
            background: 'rgba(0,0,0,0.35)',
            color: '#fda4af',
            fontSize: 12,
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowX: 'auto',
          }}
        >
          {String(error?.stack || error?.message || error)}
        </pre>
        <button
          type="button"
          onClick={this.reset}
          style={{
            fontSize: 13,
            padding: '9px 18px',
            borderRadius: 24,
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Try again
        </button>
      </div>
    )
  }
}
