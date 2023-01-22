import "./viewTripsPage.css"
import TripCard from "./TripCard/TripCard";

// const tripsArr = [


//      {
//         Admin: "newUser",
//         group: "Minty Blobfish",
//         destination: "aaaaa",
//         date: [
//                 {
//                     name: "2023-01-11"
//                 }
//               ],
//         event: [
//                 {
//                     type: "Accomodation",
//                     location: "location",
//                     date: "2023-01-13T11:11"
//                 }
//                ],
//         member: [
//                 {
//                     name: "aaa",
//                     email: "aaa@aaaa.com"
//                 }
//                 ],
        
//      },
//      {
//         Admin: "newUser",
//         group: "Hen Do",
//         destination: "aaaaa",
//         date: [
//                 {
//                     name: "2023-01-11"
//                 }
//               ],
//         event: [
//                 {
//                     type: "Accomodation",
//                     location: "location",
//                     date: "2023-01-13T11:11"
//                 }
//                ],
//         member: [
//                 {
//                     name: "aaa",
//                     email: "aaa@aaaa.com"
//                 }
//                 ],
        
//      },
//      {
//         Admin: "newUser",
//         group: "Stag Weekend",
//         destination: "aaaaa",
//         date: [
//                 {
//                     name: "2023-01-11"
//                 },
//                 {
//                     name: "2050-01-11"
//                 }
//               ],
//         event: [
//                 {
//                     type: "Accomodation",
//                     location: "salisbury",
//                     date: "2023-01-13T11:11"
//                 },
//                 {
//                     type: "Accomodation",
//                     location: "london",
//                     date: "2023-01-13T11:11"
//                 },
//                 {
//                     type: "Accomodation",
//                     location: "devon",
//                     date: "2023-01-13T11:11"
//                 }
//                ],
//         member: [
//                 {
//                     name: "aaa",
//                     email: "aaa@aaaa.com"
//                 },
//                 {
//                     name: "bbb",
//                     email: "aaa@aaaa.com"
//                 },
//                 {
//                     name: "ccc",
//                     email: "aaa@aaaa.com"
//                 }
//                 ],
        
//      }]



const ViewTrips = ({setTripDetails, pageSelect, currentTrips}:any) => { 

console.log(currentTrips)
   
// let trips
//       if (currentTrips.fullTripData){
//         trips = currentTrips.fullTripData.map((trip:any) => <TripCard key={Math.random() * 1000} setTripDetails={setTripDetails} className="carousel" handlePage={pageSelect} trip={trip}></TripCard>)
//       }

// TODO: figure out whats wrong with the carousel
  
    return (
        
       <div className='view-trips-div'>
        <h1>your trips</h1>


      
        <div className="view-trip-form-item"> 
 
             {currentTrips.fullTripData && currentTrips.fullTripData.map((trip:any) => {
                return (
                    
                    <TripCard key={trip.trip_id} className="trip-card" setTripDetails={setTripDetails} handlePage={pageSelect} trip={trip}></TripCard>

                )
            })}
        
        </div>

        <button className="view-trip-cancel-button cancel-button" onClick={() => {pageSelect("dashboard")}}>cancel</button>
        </div>
        
)

}


export default ViewTrips;