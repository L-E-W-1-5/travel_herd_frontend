import './TripCard.css'

const TripCard = ({trip, handlePage, tripDetails}:any) => {
//console.log(trip[0].trip_name)

async function getTripDetails() {





    const res = await fetch(`http://localhost:3001/api/trip/${trip.trip_id}`, {

        headers: { "Content-Type": "application/json" },

    })
    const data = await res.json()

}



function handleClick() {
    getTripDetails()
    handlePage("details")
    tripDetails(trip)
    
}

    return (<>
        {trip && 
    <div className="trip-card" onClick={handleClick}>
        <h3>trip</h3> 
    </div>}
    </>)
}
//, tripDetailsVisibility   
export default TripCard

