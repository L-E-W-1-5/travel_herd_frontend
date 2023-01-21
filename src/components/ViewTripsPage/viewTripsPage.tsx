import "./viewTripsPage.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import TripCard from "./TripCard/TripCard";

const tripsArr = [


     {
        Admin: "newUser",
        group: "Minty Blobfish",
        destination: "aaaaa",
        date: [
                {
                    name: "2023-01-11"
                }
              ],
        event: [
                {
                    type: "Accomodation",
                    location: "location",
                    date: "2023-01-13T11:11"
                }
               ],
        member: [
                {
                    name: "aaa",
                    email: "aaa@aaaa.com"
                }
                ],
        
     },
     {
        Admin: "newUser",
        group: "Hen Do",
        destination: "aaaaa",
        date: [
                {
                    name: "2023-01-11"
                }
              ],
        event: [
                {
                    type: "Accomodation",
                    location: "location",
                    date: "2023-01-13T11:11"
                }
               ],
        member: [
                {
                    name: "aaa",
                    email: "aaa@aaaa.com"
                }
                ],
        
     },
     {
        Admin: "newUser",
        group: "Stag Weekend",
        destination: "aaaaa",
        date: [
                {
                    name: "2023-01-11"
                },
                {
                    name: "2050-01-11"
                }
              ],
        event: [
                {
                    type: "Accomodation",
                    location: "salisbury",
                    date: "2023-01-13T11:11"
                },
                {
                    type: "Accomodation",
                    location: "london",
                    date: "2023-01-13T11:11"
                },
                {
                    type: "Accomodation",
                    location: "devon",
                    date: "2023-01-13T11:11"
                }
               ],
        member: [
                {
                    name: "aaa",
                    email: "aaa@aaaa.com"
                },
                {
                    name: "bbb",
                    email: "aaa@aaaa.com"
                },
                {
                    name: "ccc",
                    email: "aaa@aaaa.com"
                }
                ],
        
     }

]


const ViewTrips = ({setTripDetails, pageSelect, currentTrips}:any) => { 
console.log(currentTrips)
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
// let trips
//       if (currentTrips.fullTripData){
//         trips = currentTrips.fullTripData.map((trip:any) => <TripCard key={Math.random() * 1000}setTripDetails={setTripDetails} handlePage={pageSelect} trip={trip}></TripCard>)
//       }

// TODO: figure out whats wrong with the carousel
  
    return (
        
       <div className='view-trips-div'>
        <h1>your trips</h1>
        {/* <div> */}
        <div className="view-trip-form-item">
        {/* <Carousel className="carousel" responsive={responsive}> */}
            {currentTrips.fullTripData && currentTrips.fullTripData.map((trip:any) => {
                return (<div key={trip.trip_id}>
            
                    <TripCard className="trip-card carousel" setTripDetails={setTripDetails} handlePage={pageSelect} trip={trip}></TripCard>

                </div>)
            })}
            
              
                {/* </Carousel> */}
           
            
        </div>
        <button className="view-trip-cancel-button cancel-button" onClick={() => {pageSelect("dashboard")}}>cancel</button>
        </div>
        
    )

}

export default ViewTrips;