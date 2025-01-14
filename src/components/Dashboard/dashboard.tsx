import "./dashboard.css";
import React, { useState, useEffect } from "react";
import CreateTrip from "../CreateTrip/createTrip";
import JoinTrip from "../JoinTripPage/joinTrip";
import ViewTrips from "../ViewTripsPage/viewTripsPage";
import TripDetails from "../TripDetailsPage/tripDetailsPage";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login/login";
//import LogoutButton from "../LogoutButton/LogoutButton";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/footer";
// import Backpack from "../../images/backpack.png"

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { ImBinoculars } from "react-icons/im";
//import userEvent from "@testing-library/user-event"

const domain = "dev-otxf3y3m35xq561z.uk.auth0.com"
//const url = "http://localhost:3001"
const url = "https://travel-herd-api.onrender.com"


const Dashboard = () => {

  const [currentTrip, setCurrentTrip] = useState({});

  const [allTrips, setAllTrips] = useState([])

  const [page, setPage] = useState("login")
  
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0(); 

  const [reFetch, setFetch] = useState(true) 

useEffect(() => {


  const getUserToken = async () => {

  const accessToken = await getAccessTokenSilently({

      audience: `https://${domain}/api/v2/`,
  
    }); 
    // console.log(accessToken)
    // console.log(user?.sub)

   

    const response = await fetch(`${url}/api/users/${user?.sub}`,
      {
        method: 'POST',
        headers:{
                  Authorization: `Bearer ${accessToken}`,
                  "content-type": "application/json"    // TODO: also need to send name and email to save in the user database.
               },
               body: JSON.stringify(user)
    });
    const res = await response.json()
    console.log(res)
    setAllTrips(res.payload)
  }
    getUserToken()

}, [getAccessTokenSilently, user, isAuthenticated, reFetch])




  function handlePage(page:string) {
    console.log(page)
    setPage(page)
  
  
  }

  return (
    <div id="dashboard-container">
      <section id="dashboard">
        
          <Navbar pageSelect={handlePage}></Navbar>
        

        <h1>Where are we going?</h1>

        <div id="dashboard-btn-container">
          <div
            className="dashboard-container"
            onClick={() => {
              handlePage("create");
            }}
          >
            <IoMdCreate className="icon" />
            <p>create</p>
            <p>trip</p>
          </div>

          <div
            className="dashboard-container"
            onClick={() => {
              handlePage("join");
            }}
          >
            <AiOutlineUsergroupAdd className="icon" />
            <p>join</p>
            <p>trip</p>
          </div>

          <div
            className="dashboard-container"
            onClick={() => {
              handlePage("view");
            }}
          >
            <ImBinoculars className="icon" />
            <p>view</p>
            <p>trips</p>
          </div>
          {/* <img src={Backpack} alt="backpack"></img> */}
        </div>
        <Footer></Footer>
      </section>

      <div className={ page === "login" ? "open" : "closed" }>
        {!isAuthenticated && <Login pageSelect={handlePage}></Login>}
      </div>

      <div className={ page === "create" ? "open" : "closed" }>
        <CreateTrip
          setTripDetails={setCurrentTrip}
          pageSelect={handlePage}
          reFetch={setFetch}
        ></CreateTrip>
      </div>

      <div className={ page === "view" ? "open" : "closed"}>
        <ViewTrips
          currentTrips={allTrips}
          setTripDetails={setCurrentTrip}
          pageSelect={handlePage}
        ></ViewTrips>
      </div>

      {currentTrip && (
        <div
          className={ page === "details" ? "open" : "closed" }
        >
          <TripDetails pageSelect={handlePage} tripDetails={currentTrip} currentTrips={allTrips}></TripDetails>
        </div>
      )}

      <div className={ page === "join" ? "open" : "closed"}>
        <JoinTrip 
          pageSelect={handlePage}
          reFetch={setFetch}
          ></JoinTrip>
      </div>
    </div>
  );
};
      // TODO: send reFetch down to tripDetails
export default Dashboard;
