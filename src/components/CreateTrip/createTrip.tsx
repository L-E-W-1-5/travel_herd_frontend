//import {useState} from 'react'
import {useForm} from 'react-hook-form'
import './createTrip.css'
import { useAuth0 } from '@auth0/auth0-react'
import MembersForm from './MembersForm/MembersForm'
import DateForm from './DateForm/DateForm'
import GroupForm from './GroupForm/GroupForm'
import MultipleEventForm from './MultipleEventForm/MultipleEventForm'
import useMultistepForm from './Hooks/useMultistepForm'
// import NewForm from './AnotherFuckingForm/NewForm'
// import CategoryForm from './Another FormAgain/CategoryForm'


// import Navbar from '../NavBar/NavBar';
const url = 'http://localhost:3001/api'

const CreateTrip = ({setTripDetails, pageSelect, reFetch}:any) => {

   // const [object, setObject] = useState({})

    const {
        register,
        control,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors }
    } = useForm();

    const {steps, 
        currentStepIndex, 
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
        setCurrentStepIndex
    } = useMultistepForm([ 
       
        <GroupForm {...{register, errors}}/>, 
        <DateForm {...{ control, register, errors}}/>, 
        <MembersForm {...{ control, register, errors}}/>, 
        <MultipleEventForm {...{ control, register, errors, getValues, setValue}}/>
    
])

    const { user} = useAuth0() //, isAuthenticated, getAccessTokenSilently



async function onSubmit(data: any) {
    if(user?.sub){
    data.admin_id = user?.sub  // TODO: Create a fetch request to retrieve the trip ID and save the trip to a database.
                            // TODO: Create a function that changes state in the dashboard component to 'data'.
    }
    console.log(data)
    next()

    if(isLastStep){
        await onFetch(data)
        //setTripDetails(reply.payload)    // TODO: maybe use local storage to save the details of the form while logging in?
        reFetch((current:any) => !current)
        alert("your trip has been saved, go to 'view trips' to see it.")
        pageSelect("dashboard")
        reset()
        setCurrentStepIndex(0)
    }
  
    
}

async function onFetch(data:any) {
    const res = await fetch(`${url}/object`, {
        method: 'POST',

        headers: { "Content-Type": "application/json"},

        body: JSON.stringify(data)
    })
    let reply = await res.json()
    console.log(reply)
    return reply
}



    return (<>
    <div className="createTripContainer">

    <h1 className='create-trip-h1'>create trip </h1>

        <div className="create-trip-form">
              
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='page-counter'>
                    {currentStepIndex + 1} / {steps.length}
                </div>

                {step}

                <div className='change-page-buttons'>               
                    {!isFirstStep && <button className="button" type="button" onClick={back}>back</button>}
                    <button className="button" type="submit">
                        {isLastStep ? "finish" : "next"}
                    </button>
                </div>

            </form>

     
        </div>

    <button className="create-cancel-button cancel-button" onClick={() => {pageSelect("dashboard")}}>cancel</button>

    </div>
    </>)
}

export default CreateTrip  



// {/* <GroupForm {...{register, errors}}/>, 
//     <DateForm {...{ control, register, errors}}/>, 
//     <MembersForm {...{ control, register, errors}}/>, 
//     <MultipleEventForm {...{ control, register, errors, getValues, setValue}}/> */}