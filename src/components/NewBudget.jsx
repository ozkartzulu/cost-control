
import { useState } from "react"
import Message from "./Message"

function NewBudget({budget, setBudget, setValidBudget}){

    const [message, setMessage] = useState('')

    const handleBudget = e => {
        e.preventDefault()
        if( !budget || budget < 0 ){
            setMessage('There is not a budget valid')
            return
        }
        setMessage('')
        setValidBudget(true)
    }

    return (
        <div className="container-budget container shadow">
            <form className="form" onSubmit={ handleBudget }>
                <div className="field">
                    <label htmlFor="budget">Define Budget</label>
                    <input className="new-budget" 
                        id="budget" 
                        type="number" 
                        placeholder="Add your budget"
                        value={budget}
                        onChange={ e => setBudget(Number(e.target.value)) }
                    />
                </div>
                
                
                <input type="submit" value='Add'/>
                { message && <Message type='error'>{ message }</Message> }
            </form>
        </div>
    )
}

export default NewBudget