import './Styles.scss';
import MapWrapper from '../Map';
import Navigation from '../Navigation';
import Sessions from '../Sessions'

function Dashboard() {

  return (
    <main className='dashboard_wrapper'>
        <Navigation />
        <div className='dashboard_body'>
          <Sessions/>
          <MapWrapper />
        </div>
    </main>
  )

}

export default Dashboard
