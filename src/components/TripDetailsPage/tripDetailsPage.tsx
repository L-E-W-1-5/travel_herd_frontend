import './tripDetailsPage.css'
import {useState, useEffect} from 'react'
//import VoteWrapper from './VoteWrapper/VoteWrapper'
import { useAuth0 } from '@auth0/auth0-react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'




const TripDetails = ({pageSelect, tripDetails, currentTrips}:any) => { //TODO: current trips now has an array, votesCastByUser, that includes any id that has been voted on, for dates anyway
//console.log(currentTrips.itineraryVotesCast)
//console.log(tripDetails)
    // const [dateVote, setDataVote] = useState(false)

    // const [itinereryVote, setItineraryVote] = useState(false)     
    
    const [dateVotedAlready, setDateAlreadyVoted] = useState(false)

    const [event, setEvent] = useState("")

    const { user} = useAuth0() //, isAuthenticated, getAccessTokenSilently

    const [category, setCategory] = useState("")

    const [itineraryCatVoted, setItineraryCatVoted] = useState(false)

    const [chosenItineraryEvent, setChosenItineraryEvent] = useState("")

    useEffect(() => {
        setDateAlreadyVoted(false)
        setCategory("")
    }, [tripDetails])

    // TODO: figure out a way to conditionally render the component, then get it to disappear once a vote has been cast..
                                        // maybe have the functionality in a seperate component that we render instead of a div?
       

    function handleDate() {
        getDateIds()
        //setDataVote(current => !current)
    }

    function handleItinerary() {
        getItineraryIds()
        //setItineraryVote(current => !current)
    }

    // function handleAll() {

    //     setDataVote(false)

    //     setItineraryVote(false)
    // }

    function registerVote(vote:any) {

        console.log(vote.choice, "has been voted on") // TODO: fetch request called here to add a vote to the corresponding choice

        alert("your vote has been registered.")

        saveDateVote(vote)

        //handleAll()
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
            if(tripDetails.date_choices.length > 0)
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
       // let arr = []

        // for (let i = 0; i < currentTrips.itineraryVotesCast.length; i++){
        //     for (let x = 0; x < tripDetails.itinerary.length; x++){
        //         for (let y = 0; y < tripDetails.itinerary[x].voting.length; y++){
        //             if (tripDetails.itinerary[x].voting[y].itinerary_id === currentTrips.itineraryVotesCast[y].id){

        //             }
        //         }
        //     }
           
        //     //TODO: finished here... set up the itinerary like the dates
        // }


    }

    function getInfo(category:string) {
        console.log(category)
        setCategory(category)
    }

    function itineraryChange(e:any) {
        setChosenItineraryEvent("")
        setItineraryCatVoted(false)

        const isVoted = currentTrips.itineraryVotesCast.filter((item:any) => item.id === Number(e.target.value))
        if (isVoted){
            setItineraryCatVoted(true)
            console.log(isVoted)
        }

        

        console.log(e.target.value)
        const chosenEvent = tripDetails.itinerary.filter((item:any) => item.id === Number(e.target.value))
        if (chosenEvent[0].choice || chosenEvent[0].voting.length === 1){
            setChosenItineraryEvent(`your group has chosen ${chosenEvent[0].choice}`)//`on ${chosenEvent.date_time} your group chose the ${chosenEvent.type}, ${chosenEvent.choice}.`)
           // return
        }else{

        }
        console.log(chosenEvent[0].id)
        setEvent(e.target.value)
    }



    return <div className="trip-details-page">

        <div className="page-container">

            <h1>{tripDetails.trip_name}</h1>

            <div className="options-boxes">

                <div className="option-box">
                    {tripDetails.destination && <div className="option-item destination" id="destination" onClick={() => {getInfo("destination")}}><p>Destination</p></div>}
                    {tripDetails.date_choices && <div className="option-item dates" id="dates" onClick={() => {handleDate(); getInfo("dates")}}><p>Dates</p></div>}
                    {tripDetails.itinerary && <div className="option-item itinerary" id="itinerary" onClick={() => {handleItinerary(); getInfo("itinerary")}}><p>Itinerary</p></div>}
                    {tripDetails.members && <div className="option-item members" id="members" onClick={() => {getInfo("members")}}><p>Members</p></div>}
                </div>

                <div className="info-box">

                    {category === "destination" && <div className="destination-info">
                                                        <p className='destination-p'>your group is going to....</p>
                                                        <h1>{tripDetails.destination}</h1>
                                                    </div>}

                    {category === "dates" && tripDetails.date_choices.length < 1 && <div>
                                                                                        <h3>No dates chosen for this trip yet...</h3>
                                                                                    </div>}

                    {category === "dates" && <div className="dates-info">
                        {tripDetails.date_choices.chosen ? <div>
                                                            <p>your group is travelling...</p>
                                                            <h2>{tripDetails.date_choices.chosen}</h2></div> : <div>
                        {dateVotedAlready && <div className="voting-chart">

                            
                            <div className="votes-container">
                            {tripDetails.date_choices.map((d:any) => { 

                            return <div>   

                                         <p className='clicked-event'>{d.choice}</p>
                                        <p className='clicked-event'>no. of votes: {d.vote_count}</p>

                                    </div>
                            })}
                            <p>out of {tripDetails.no_of_users} people</p>
                            </div>

                            <BarChart width={500} height={450} data={tripDetails.date_choices.vote_count}>
                            <Bar dataKey="vote_count" fill="green" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="choice" />
                            <YAxis />
                              </BarChart>
                        </div> }

                        {!dateVotedAlready &&  <div>
                        {tripDetails.date_choices.length > 1 ? <div>
                                                                     {tripDetails.date_choices.map((d:any) => { 

                                                                    return <div onClick={() => {registerVote(d)}}>   

                                                                    <span className='clicked-event'>from: {d.choice}</span>
                                                                    </div>
                                                                })}
                                                                </div> : 

                                                <div>
                                                    <p>your group is travelling...</p>
                                                    <h2 className="trip-details-h2">{tripDetails.date_choices[0].choice}</h2>
                                                </div>}
                                                </div>}
                                                </div>}
                                            </div>}
                                                

                            {category === "itinerary" && <div className="itinerary-voting-container">

                                                        <div className="itinerary-dropdown">
                                                        <select onChange={itineraryChange}>
                                                            <option>-select-</option>
                                                            {tripDetails.itinerary.map((item:any) => {
                                                                return <option value={item.id}>itinerary id #{item.id}</option>
                                                            })}
                                                        </select>                      
                                                        </div>
                                                        {itineraryCatVoted && <><div className="itinerary-item">
                                                            {tripDetails.itinerary.filter((item:any) => item.id === Number(event)).map((e:any) => {
                                                                        
                                                                        return <div className="itinerary-choices-container">{e.voting.map((e:any) => {
                                                                            return <div>
                                                                                <p>{e.choice}</p>
                                                                                <p>{e.date_time}</p>
                                                                                <p>{e.type}</p>
                                                                                <p>no. of votes: {e.vote_count}</p>
                                                                                </div>
                                                                        })}</div>
                                                                        
                                                                    })}
                                                           
                                                            
                                                            </div>
                                                            <p>out of {tripDetails.no_of_users} people</p>
                                                            </>}
                                                            
                                                            {chosenItineraryEvent ? <div>{chosenItineraryEvent}</div> : <div>
                                                        {event && !itineraryCatVoted && <div className="itinerary-item">
                                                                    {tripDetails.itinerary.filter((item:any) => item.id === Number(event)).map((e:any) => {
                                                                        
                                                                        return <div>{e.voting.map((e:any) => {
                                                                            return <div onClick={() => {registerItineraryItem(e)}}>
                                                                                <p>{e.choice}</p>
                                                                                <p>{e.date_time}</p>
                                                                                <p>{e.type}</p>
                                                                                </div>
                                                                        })}</div>
                                                                        
                                                                    })}
                       
                                                                    
                                                                </div>}
                                                                </div>}

                                                        </div>}
                                                        
                                        {category === "members" && <div>
                                        <h3 className="h2-vote-form">members who have already joined...</h3>
                                                                    {tripDetails.members.map((m:any) => {
                                                                        return <div className="members-container">
                                                                            
                                                                            <p>{m.name}</p>
                                                                        </div>
                                                                    })}
                                                                    <p>out of {tripDetails.no_of_users} people</p>
                                                                </div>}




                </div>

            </div>

        </div>
        <button className="details-back-button cancel-button" onClick={() => {pageSelect("view"); setCategory("")}}>back</button>
       </div> 
}

export default TripDetails

/*

<div className="details-layout">  

{tripDetails.trip_name && <div className="details-layout">

<h1>{tripDetails.trip_name}</h1>

<p>destination: {tripDetails.destination}</p>

{tripDetails.date_choices.length > 0 && tripDetails.date_choices[0].chosen !== null ? <div>{tripDetails.date_choices.chosen} won the vote with {tripDetails.date_choices.vote_count}</div> : <div>

{tripDetails.date_choices.length > 0 && <div> 
    {/* TODO: show votes here - for loop to cycle the options with the values next to them? 

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

*/