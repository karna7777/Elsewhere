import EarthScene from './globe/EarthScene'

export default function App() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      <EarthScene />
    </div>
  )
}
