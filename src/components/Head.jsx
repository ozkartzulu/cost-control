import NewBudget from "./NewBudget"
import ControlBudget from "./ControlBudget"

function Head({budget, setBudget, validBudget, setValidBudget, expenses, setExpenses}){
    return (
        <header className="header">
            <h1>Expense Planner</h1>
            { validBudget ? (
                <ControlBudget 
                    budget = {budget}
                    setBudget = {setBudget}
                    expenses = {expenses}
                    setExpenses = {setExpenses}
                    setValidBudget = {setValidBudget}
                />
            ) : (
            <NewBudget 
                budget = {budget}
                setBudget = {setBudget}
                setValidBudget = {setValidBudget}
            />
            ) }
            
        </header>
    )
}

export default Head