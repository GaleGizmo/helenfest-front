import './App.css'
import UnderConstructionDesktop from './assets/helenfest_under_const_desktop.jpg'
import UnderConstructionMobile from './assets/helenfest_under_const_mobile.jpg'

function App() {
  return (
    <main className="construction-page">
      <section className="construction-card">
        <picture>
          <source media="(max-width: 640px)" srcSet={UnderConstructionMobile} />
          <img
            src={UnderConstructionDesktop}
            alt="Ilustración de una página en construcción"
          />
        </picture>
      </section>
    </main>
  )
}

export default App
