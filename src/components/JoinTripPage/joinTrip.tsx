import React, {useState} from 'react'
import './joinTrip.css'
//import Navbar from '../NavBar/NavBar';
import { useAuth0 } from "@auth0/auth0-react";


const url = "localhost:3001"

const JoinTrip = (props:any) => {

const [tripID, setTripID] = useState("")
const [tripUsername, setTripUsername] = useState("")
const { user } = useAuth0(); 

function handleSubmit(e:any) {
     e.preventDefault();
     console.log(tripUsername)
    console.log(tripID)         // TODO: // post request here to add trip to a user

// reFetch((current:any) => !current)
    addTripToUserTable();
    props.reFetch((current:any) => !current)
    props.pageSelect("dashboard")
                                    // TODO: add a state in dashboard that can force a reload of a useeffect so we can grab all the trips the user is a member of after joining a new one
    setTripID("")
    setTripUsername("")
}


async function addTripToUserTable() {
    const ob = {tripid: tripID, 
                tripusername: tripUsername}
    const response = await fetch(`http://${url}/api/users/${user?.sub}`, {
        method: 'PATCH',
        headers:  {"content-type": "application/json"},
        body: JSON.stringify(ob)
    })
    const data = await response.json()
    console.groupCollapsed(data)
}


    return <div className="join-form">
        {/* <div className="join-form-item join-nav">
        <Navbar />

        </div> */}

    
        <h1>join trip</h1>
        <h2 className='join-h2'>ask your trip organiser for the ID of your trip to see details and add your votes</h2>

        <form className="join-form-item" onSubmit={handleSubmit}>
            <div className="info-box-join">
                <div className="joining-info">
                    <p>you will find the information needed to join a trip in an
                    email as soon as you get invited to a trip. </p>
                </div>
                <div className="input-join-form">
            <label>Enter trip username:
                <input className="input-field" type="text" onChange={(e) => {setTripUsername(e.target.value)}} value={tripUsername}></input>
            </label>
            <label>Enter trip ID:
                <input className="input-field" type="text" onChange={(e) => {setTripID(e.target.value)}} value={tripID}></input>
            </label>
            </div>
            </div>
            <input className = "submit-button submit-join" type="submit" value="submit"></input>
            
        </form>
        <button className="join-cancel-button cancel-button" onClick={() => {props.pageSelect("dashboard")}}>cancel</button>
        
    </div>
}

export default JoinTrip
 