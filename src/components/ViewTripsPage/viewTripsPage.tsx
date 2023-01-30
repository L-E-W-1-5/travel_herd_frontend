import "./viewTripsPage.css"
import TripCard from "./TripCard/TripCard";
import React, {useRef, useState} from 'react';
import leftArrow from '../../images/left-arrow.png'
import rightArrow from '../../images/right-arrow.png'
let count = 0

const ViewTrips = ({setTripDetails, pageSelect, currentTrips}:any) => { 

    const myRef = useRef<null | HTMLDivElement>(null); 

    const [scroll, setScroll] = useState(580)

    function scrollWinRight() {
        console.log(((count / 2) * 290) - 980)
        if(scroll < ((count / 2) * 290)- 1350){
        //setScroll(scroll + 580)
       // console.log(scroll)
        myRef.current?.scrollTo({
            left: scroll + 580,
            behavior: 'smooth'
        });
        setScroll(scroll + 580)
        count = 0
    }
        //if (count > )
        
    }

    function scrollWinLeft() {
        if (scroll > 290){
       
        console.log(scroll)
        myRef.current?.scrollTo({
            left: scroll -580,
            behavior: 'smooth'
        });
        setScroll(scroll - 580)
        count = 0
    }
    
    }
  
    return (
        
        <div className='view-trips-div'>
            <h1>your trips</h1>
    
        <div  ref={myRef} className="view-trip-form-item"> 
 
             {currentTrips.fullTripData && currentTrips.fullTripData.map((trip:any) => {
                count++
                return (       
                    <TripCard key={Math.random() * 1000} className="trip-card" setTripDetails={setTripDetails} handlePage={pageSelect} trip={trip}></TripCard>
                )
            })}
        
        </div>
            {/* <button className="carousel-button-right" onClick={scrollWinRight}>right</button>
            <button className="carousel-button-left" onClick={scrollWinLeft}>left</button> */}
            <img className="carousel-button-left" src={leftArrow} alt="left-arrow" onClick={scrollWinLeft}></img>
            <img className="carousel-button-right" src={rightArrow} alt="right-arrow" onClick={scrollWinRight}></img>
            <button className="view-trip-cancel-button cancel-button" onClick={() => {pageSelect("dashboard")}}>cancel</button>
        </div>
        
    )
}


export default ViewTrips;