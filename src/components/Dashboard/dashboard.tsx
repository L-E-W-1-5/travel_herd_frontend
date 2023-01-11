
import './dashboard.css'
import React, {useState} from 'react'
import CreateTrip from '../CreateTrip/createTrip'
import JoinTrip from '../JoinTripPage/joinTrip'
import ViewTrips from '../ViewTripsPage/viewTripsPage'
import TripDetails from '../TripDetailsPage/tripDetailsPage'
import { useAuth0 } from '@auth0/auth0-react'
import Login from '../Login/login'
import LogoutButton from '../LogoutButton/LogoutButton'
import Navbar from '../NavBar/NavBar';


import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { ImBinoculars } from "react-icons/im";

const Dashboard = () => {

  const [createTripVisibility, setCreateTripVisibility] = useState(false);
  const [joinTripVisibility, setJoinTripVisibility] = useState(false);
  const [viewTripVisibility, setViewTripVisibility] = useState(false);
  const [loginVisibility, setLoginVisibility] = useState(true)
  const { user, isAuthenticated, getAccessTokenSilently} = useAuth0()

  function handleCreateTripVisibility() {
    setCreateTripVisibility((current) => !current);
  }

  function handleJoinTripVisibility() {
    setJoinTripVisibility((current) => !current);
  }

  function handleViewTripVisibility() {
    setViewTripVisibility((current) => !current);
  }

 function handleLoginVisibility() {
  setLoginVisibility(current => !current)
    }
    
  return (
    <section id="dashboard">
       <Navbar></Navbar>
      <h1>Where are we going?</h1>

      <div style={{visibility: loginVisibility ? 'visible' : 'hidden'}}>

    {!isAuthenticated && <Login getStarted={handleLoginVisibility}></Login>}
</div>
      <div id="dashboard-btn-container">
        <div
          onClick={() => {
            handleCreateTripVisibility();
          }}
        >
          <IoMdCreate className="icon" />
          <p>create</p>
          <p>trip</p>
        </div>

        <div className="dashboard-container" style={{ visibility: createTripVisibility ? "visible" : "hidden" }}>
          <CreateTrip cancelButton={handleCreateTripVisibility}></CreateTrip>
        </div>

        <div
          onClick={() => {
            handleJoinTripVisibility();
          }}
        >
          <AiOutlineUsergroupAdd className="icon"/>
          <p>join</p>
          <p>trip</p>
        </div>

        <div className="dashboard-container" style={{ visibility: joinTripVisibility ? "visible" : "hidden" }}>
          <JoinTrip visibility={handleJoinTripVisibility}></JoinTrip>
        </div>

        <div
          onClick={() => {
            handleViewTripVisibility();
          }}
        >
         <ImBinoculars className="icon"/>
          <p>view</p>
          <p>trips</p>
        </div>

        <div className="dashboard-container" style={{ display: viewTripVisibility ? "block" : "none" }}>
          <ViewTrips></ViewTrips>
        </div>
      </div>
      <div style={{ visibility: joinTripVisibility ? "visible" : "hidden" }}>

        <TripDetails></TripDetails>
      </div>
    </section>
  );
};

export default Dashboard;
