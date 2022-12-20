import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function ControlBudget({budget, setBudget, expenses, setExpenses, setValidBudget}){

    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)
    const [percentage, setPercentage] = useState(0)

    useEffect( () => {
        const totalSpent = expenses.reduce( (total, expense) => total + expense.amount, 0 ) 
        const totalAvailable = budget - totalSpent
        const percentageCalc = (((budget - totalAvailable)/budget) * 100).toFixed(2)

        setSpent(totalSpent)
        setAvailable(totalAvailable)

        setTimeout( () => {
            setPercentage(percentageCalc)
        }, 1200 )

    }, [expenses])

    const formPrice = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleReset = () => {
        const message = confirm("Are you sure reset all ?")
        if(message){
            setBudget(0)
            setExpenses([])
            setValidBudget(false)
        }
    }

    return (
        <div className="container-budget container shadow two-columns">
            <div>
                <CircularProgressbar 
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    text={`${percentage}% Spent`}
                />
            </div>
            <div className="contain-budget">
                <button className='reset-app' type='button' onClick={handleReset}>
                    Reset App
                </button>
                <p>
                    <span>Budget: </span> { formPrice(budget) }
                </p>
                <p className={ available < 0 ? 'negative' : '' }>
                    <span>Available: </span> { formPrice(available) }
                </p>
                <p>
                    <span>Spent: </span> { formPrice(spent) }
                </p>
            </div>
        </div>
    )
}

export default ControlBudget