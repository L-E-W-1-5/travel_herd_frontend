import './tripDetailsPage.css'
import {useState} from 'react'
import VoteWrapper from './VoteWrapper/VoteWrapper'
import { useAuth0 } from '@auth0/auth0-react'


const TripDetails = ({pageSelect, tripDetails}:any) => {

    const [dateVote, setDataVote] = useState(false)
    const [itinereryVote, setItineraryVote] = useState(false)                             
    const { user} = useAuth0() //, isAuthenticated, getAccessTokenSilently

    // TODO: figure out a way to conditionally render the component, then get it to disappear once a vote has been cast..
                                        // maybe have the functionality in a seperate component that we render instead of a div?
       


    const tripDetails1 = {
        group: 'holiday',
        date: [
                {
                    from: '2023-01-01',
                    to: '2023-01-02'
                },
                {
                    from: '2023-02-02',
                    to: '2023-02-03'
                }
              ],
        destination: 'jamaica',
        member: [
                    {
                        name: 'celia',
                        email: 'celia@gmail.com'
                    },
                    {
                        name: 'lewis',
                        email: 'lewis@gmail.com'
                    },
                    {
                        name: 'Atyib',
                        email: 'atyib@gmail.com'
                    },
                    {
                        name: 'Kylie',
                        email: 'kylie@gmail.com'
                    },
                    {
                        name: 'Dionne',
                        email: 'dionne@gmail.com'
                    },
                    {
                        name: 'Natasha',
                        email: 'natasha@gmail.com'
                    }
                ],
                

                restaurant:
                  [
                    {
                        id: 1,
                        name: 'name'
                    },
                    {
                        id: 2,
                        name: 'name'
                    },

                ],
                
                accomodation: [
                    {

                    },
                    {

                    }
                ],

        event: [
                   {
                       id: 101,
                       itinerary: [ 
                                    {
                                        id: 1,
                                        type: 'hotel',
                                        name: 'big place',
                                        date_time: "2023-11-11T11:11"
                                    },
                                    {
                                        id: 2,
                                        type: 'hotel',
                                        name: 'little place',
                                        date_time: "2023-11-11T11:11"
                                    }
                                  ]
                    },
                    {
                        id: 102,
                        itinerary: [
                                    {
                                        id: 1,
                                        type: 'restaurant',
                                        name: 'vegan',
                                        date_time: "2023-11-11T11:11"
                                    },
                                    {
                                        id: 2,
                                        type: 'restaurant',
                                        name: 'fish',
                                        date_time: "2022-11-11T11:11"
                                    }

                                    ]
                    }
                    
            ]    
        }

        //console.log(tripDetails)

    function handleDate() {
        setDataVote(current => !current)
    }


    function handleItinerary() {
        setItineraryVote(current => !current)
    }

    function handleAll() {
        setDataVote(false)
        setItineraryVote(false)
//development merge conflict
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
        console.log(data)
    }

    function registerItineraryItem(item:any) {
        console.log(item.type)
        alert("your vote has been registered")
    }

    
  console.log(tripDetails)

    return <div className="trip-details-page">

            <div className="details-layout">  
                {tripDetails.trip_name && <div className="details-layout">
                <h1>{tripDetails.trip_name}</h1>

                <p>destination: {tripDetails.destination}</p>

                 {tripDetails.date_choices.length > 1 ?  <button onClick={handleDate}>vote on the dates!</button> : 
                                                <p>date {tripDetails.date_choices[0].choice}</p>}

                {dateVote && <VoteWrapper title="vote on the dates">
                    
                     {tripDetails.date_choices.map((d:any) => { 
                          // TODO: will change to date id
                         return <div onClick={() => {registerVote(d)}}>   
                             <span className='clicked-event'>from: {d.choice}</span>
                             </div>
                     })}
                     <button className="vote-form-button" onClick={handleDate}>close</button>
                     </VoteWrapper>}

                
                    
                <p>joined members {tripDetails.members.length} out of {tripDetails.no_of_users}</p>
                {tripDetails.members.length > 1 ? tripDetails.members.map((mem:any) => {return <p>{mem.user_name}</p>}) : <p>{tripDetails.members[0].name}</p>}

                {tripDetails.itinerary.length > 1 ? <button onClick={handleItinerary}>vote on itinerary!</button> : 
                                                <p>itinerary: {tripDetails.itinerary[0].voting[0].type}</p>}

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

/*

admin_id: "google-oauth2|113087777562836660178"
​​​
all_joined: false
​​​
all_voted: false
​​​
date_choices: Array [ {…}, {…} ]
​​​​
0: Object { id: 10, choice: "from: 2023-01-15 to: 2023-01-16", vote_count: 0, … }
​​​​​
choice: "from: 2023-01-15 to: 2023-01-16"
​​​​​
chosen: null
​​​​​
id: 10
​​​​​
trip_id: 52
​​​​​
vote_count: 0
​​​​​
<prototype>: Object { … }
​​​​
1: Object { id: 11, choice: "from: 2023-01-15 to: 2023-01-23", vote_count: 0, … }
​​​​​
choice: "from: 2023-01-15 to: 2023-01-23"
​​​​​
chosen: null
​​​​​
id: 11
​​​​​
trip_id: 52
​​​​​
vote_count: 0
​​​​​
<prototype>: Object { … }
​​​​
length: 2
​​​​
<prototype>: Array []
​​​
destination: "soc"
​​​
itinerary: Array [ {…}, {…} ]
​​​​
0: Object { id: 96, trip_id: 52, choice: null, … }
​​​​​
choice: null
​​​​​
id: 96
​​​​​
trip_id: 52
​​​​​
voting: Array [ {…}, {…} ]
​​​​​​
0: Object { id: 74, itinerary_id: 96, choice: "band", … }
​​​​​​​
choice: "band"
​​​​​​​
date_time: "2023-01-23T12:12"
​​​​​​​
id: 74
​​​​​​​
itinerary_id: 96
​​​​​​​
type: "Concert"
​​​​​​​
vote_count: 0
​​​​​​​
<prototype>: Object { … }
​​​​​​
1: Object { id: 75, itinerary_id: 96, choice: "beach", … }
​​​​​​​
choice: "beach"
​​​​​​​
date_time: "2023-01-22T11:11"
​​​​​​​
id: 75
​​​​​​​
itinerary_id: 96
​​​​​​​
type: "Tour"
​​​​​​​
vote_count: 0
​​​​​​​
<prototype>: Object { … }
​​​​​​
length: 2
​​​​​​
<prototype>: Array []
​​​​​
<prototype>: Object { … }
​​​​
1: Object { id: 97, trip_id: 52, choice: null, … }
​​​​​
choice: null
​​​​​
id: 97
​​​​​
trip_id: 52
​​​​​
voting: Array [ {…}, {…} ]
​​​​​​
0: Object { id: 76, itinerary_id: 97, choice: "festival", … }
​​​​​​​
choice: "festival"
​​​​​​​
date_time: "2023-01-29T22:22"
​​​​​​​
id: 76
​​​​​​​
itinerary_id: 97
​​​​​​​
type: "Attraction"
​​​​​​​
vote_count: 0
​​​​​​​
<prototype>: Object { … }
​​​​​​
1: Object { id: 77, itinerary_id: 97, choice: "fair", … }
​​​​​​​
choice: "fair"
​​​​​​​
date_time: "2023-01-25T02:02"
​​​​​​​
id: 77
​​​​​​​
itinerary_id: 97
​​​​​​​
type: "Attraction"
​​​​​​​
vote_count: 0
​​​​​​​
<prototype>: Object { … }
​​​​​​
length: 2
​​​​​​
<prototype>: Array []
​​​​​
<prototype>: Object { … }
​​​​
length: 2
​​​​
<prototype>: Array []
​​​
no_of_users: 2
​​​
trip_id: 52
​​​
trip_name: "victory"

*/