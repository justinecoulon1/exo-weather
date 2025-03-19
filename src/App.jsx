import './App.css'
import Header from './containers/header/header.jsx'
import WeatherContainer from './containers/weather-container.jsx'

function App() {

  return (
    <>
      <Header />
      <main>
        <WeatherContainer />
      </main>
    </>
  )
}

export default App
