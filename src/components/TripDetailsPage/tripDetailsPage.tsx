import './tripDetailsPage.css'
import {useState} from 'react'
import VoteWrapper from './VoteWrapper/VoteWrapper'
import { useAuth0 } from '@auth0/auth0-react'


const TripDetails = ({pageSelect, tripDetails, currentTrips}:any) => { //TODO: current trips now has an array, votesCastByUser, that includes any id that has been voted on, for dates anyway
console.log(currentTrips.votesCastByUser)
    const [dateVote, setDataVote] = useState(false)

    const [itinereryVote, setItineraryVote] = useState(false)     
    
    const [dateVotedAlready, setDateAlreadyVoted] = useState(false)

    const { user} = useAuth0() //, isAuthenticated, getAccessTokenSilently

    // TODO: figure out a way to conditionally render the component, then get it to disappear once a vote has been cast..
                                        // maybe have the functionality in a seperate component that we render instead of a div?
       

    function handleDate() {
        getDateIds()
        setDataVote(current => !current)
    }

    function handleItinerary() {
        getItineraryIds()
        setItineraryVote(current => !current)
    }

    function handleAll() {

        setDataVote(false)

        setItineraryVote(false)
    }

    function registerVote(vote:any) {

        console.log(vote.choice, "has been voted on") // TODO: fetch request called here to add a vote to the corresponding choice

        alert("your vote has been registered.")

        saveDateVote(vote)

        handleAll()
    }

    async function saveDateVote(vote:any){  // TODO: need to check and/or add to the voted_user table to see if user has already voted before registering vote

        const response = await fetch(`http://localhost:3001/api/voting/${user?.sub}`, {

            method: 'POST',

            headers: { "Content-Type": "application/json"},
    
            body: JSON.stringify(vote)
        })
        const data = await response.json()

        console.log(data.payload)

        if (data.payload.message === "you have already voted"){

            alert("you have already voted on these dates.")
        }
    }

    function registerItineraryItem(item:any) {

        console.log(item)

        alert("your vote has been registered")

        saveItineraryVote(item)
    }

    async function saveItineraryVote(item:any) {
        console.log(item)
        const response = await fetch(`http://localhost:3001/api/voting/${user?.sub}`, {

            method: 'POST',

            headers: { "Content-Type": "application/json"},
    
            body: JSON.stringify(item)
        })
        const data = await response.json()

        console.log(data.payload)

        if (data.payload.message === "you have already voted"){

            alert("you have already voted on these dates.")
        }
    }

    function getDateIds() {
        let arr = []
        for (let i = 0; i < currentTrips.votesCastByUser.length; i++){
   
            if(tripDetails.date_choices[0].date_id === currentTrips.votesCastByUser[i].date_id){

            arr.push({
                id: tripDetails.date_choices[0].date_id,
                choice: tripDetails.date_choices[0].choice
            })
            }
        }
        if(arr.length > 0){
            setDateAlreadyVoted(true)
        }
    }

    function getItineraryIds() {
        console.log(currentTrips.itineraryVotesCast)
        let arr = []

        for (let i = 0; i < currentTrips.itineraryVotesCast.length; i++){
            //TODO: finished here... set up the itinerary like the dates
        }
    }




    return <div className="trip-details-page">

            <div className="details-layout">  

                {tripDetails.trip_name && <div className="details-layout">

                <h1>{tripDetails.trip_name}</h1>

                <p>destination: {tripDetails.destination}</p>

                {tripDetails.date_choices.length > 0 && tripDetails.date_choices[0].chosen !== null ? <div>{tripDetails.date_choices.chosen} won the vote with {tripDetails.date_choices.vote_count}</div> : <div>

                {tripDetails.date_choices.length > 0 && <div> 
                    {/* TODO: show votes here - for loop to cycle the options with the values next to them? */}

                 {tripDetails.date_choices.length > 1 ?  <button onClick={handleDate}>vote on the dates!</button> : 

                                                <p>date {tripDetails.date_choices[0].choice}</p>}
                </div>
                }

                {tripDetails.total_date_votes === tripDetails.no_of_users ? <h1>all voted</h1> : <div>

                {dateVote && <VoteWrapper title="vote on the dates">
                    {dateVotedAlready ? <div>
                        {tripDetails.date_choices.map((d:any) => { 

                        // TODO: will change to date id
                        return <div>   

                        <p className='clicked-event'>{d.choice}</p>
                        <p className='clicked-event'>no. of votes: {d.vote_count}</p>
                        </div>
                    })}
                    <p>{tripDetails.no_of_users - tripDetails.total_date_votes.count} more people still to vote</p>
                    <button className="vote-form-button" onClick={handleDate}>close</button>
                    </div> : <div>
                     {tripDetails.date_choices.map((d:any) => { 

                          // TODO: will change to date id
                         return <div onClick={() => {registerVote(d)}}>   

                             <span className='clicked-event'>from: {d.choice}</span>
                             </div>
                     })}
                     <button className="vote-form-button" onClick={handleDate}>close</button>
                     </div>}
                     </VoteWrapper>}
                     </div>
                    }
                    
                   </div> }

                
                    
                <p>joined members {tripDetails.members.length} out of {tripDetails.no_of_users}</p>

                {tripDetails.members.length > 1 ? tripDetails.members.map((mem:any) => {return <p>{mem.name}</p>}) : <p>{tripDetails.members[0].name}</p>}


                {tripDetails.itinerary.length > 1 ? <button onClick={handleItinerary}>vote on itinerary!</button> : 

                                                <div >
                                                    <p>{tripDetails.itinerary[0].voting[0].type}</p>
                                                    <p>{tripDetails.itinerary[0].voting[0].choice}</p>
                                                    <p>{tripDetails.itinerary[0].voting[0].date_time}</p>
                                                </div>}

                {itinereryVote && <VoteWrapper title="vote on the itinerary">

                        {tripDetails.itinerary.map((events:any) => {

                           return <div>

                            <p>event</p>

                            { events.voting.map((event:any) => {

                                return <div>                                                             
                                    <span  id='clicked-event' onClick={() => {registerItineraryItem(event)}}>{event.type} - {event.choice} - {event.date_time}</span>
                                </div>
                        })}
                            </div>
                        })}
                        <button className="vote-form-button" onClick={handleItinerary}>close</button>

                    </VoteWrapper>} 

                </div>}
                <button onClick={() => {pageSelect("view")}}>back</button>
            </div>
           
       </div> 
}

export default TripDetails