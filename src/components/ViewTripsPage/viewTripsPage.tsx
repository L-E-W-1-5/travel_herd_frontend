import "./viewTripsPage.css"
import TripCard from "./TripCard/TripCard";
import React, {useRef} from 'react';

const ViewTrips = ({setTripDetails, pageSelect, currentTrips}:any) => { 

    const myRef = useRef<null | HTMLDivElement>(null); 

    const executeScroll = () => myRef.current?.scrollTo()     //scrollIntoView();
  
    return (
        
        <div className='view-trips-div'>
            <h1>your trips</h1>
    
        <div className="view-trip-form-item"> 
 
             {currentTrips.fullTripData && currentTrips.fullTripData.map((trip:any) => {
                return (       
                    <TripCard key={trip.trip_id} ref={myRef} className="trip-card" setTripDetails={setTripDetails} handlePage={pageSelect} trip={trip}></TripCard>
                )
            })}
        
        </div>
            <button className="view-trip-cancel-button cancel-button" onClick={executeScroll}>Click to scroll </button>
            <button className="view-trip-cancel-button cancel-button" onClick={() => {pageSelect("dashboard")}}>cancel</button>
        </div>
        
    )
}


export default ViewTrips;