import "./Home.css"
import Banner from './Banner'
import Nav from './Nav'
import Advertise from './Advertise'
import Contents from './Contents'

const Home = () => {
  return (
    <div className="home">
        <Banner />
        <Nav />
        <Advertise />
        <Contents />
    </div>
  )
}

export default Home