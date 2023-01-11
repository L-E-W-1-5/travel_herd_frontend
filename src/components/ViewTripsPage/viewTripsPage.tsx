import "./viewTripsPage.css"


const tripsArr = [
    {
        tripName: 'Julia hen do',
        startDate: '2023/06/03',
        endDate: '2023/06/06',
        location: 'Paris'

    },

    {
        tripName: 'Work christmas meal',
        startDate: '2023/12/18',
        endDate: '2023/12/18',
        location: 'London'
    },
     {
        tripName: 'Girls trip',
        startDate: '2023/08/01',
        endDate: '2023/08/12',
        location: 'Ibiza'
     }

]

const ViewTrips = (props:any) => {
    return (
       <div className='view-trips-div'>
       <ul>
            {tripsArr.map((trip) => {
                return (<li>
                    <p>{trip.tripName}</p>
                    <p>{trip.startDate} {trip.endDate}</p>
                    <p>{trip.location}</p>
                </li>)
            })}
        </ul>
        <button onClick={props.visibility}>cancel</button>
        </div>
        
    )

}

export default ViewTrips