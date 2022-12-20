import Expense from "./Expense"

function ListExpense({expenses, setExpenseEdit, deleteExpense, filter, listFilter}){
    return (
        <div className="list-expenses container">
            {
                filter ? (
                    <>
                    <h2>{ listFilter.length ? 'Expenses' : 'There is not expenses on this category' }</h2>
                    {
                        listFilter.map( expense => (
                            <Expense 
                                expense = {expense}
                                key = {expense.id}
                                setExpenseEdit = {setExpenseEdit}
                                deleteExpense = {deleteExpense}
                            />
                        ) )
                    }
                    </>
                    
                ) : (
                    <>
                    <h2>{ expenses.length ? 'Expenses' : 'There is not expenses still' }</h2>
                    {
                        expenses.map( expense => (
                            <Expense 
                                expense = {expense}
                                key = {expense.id}
                                setExpenseEdit = {setExpenseEdit}
                                deleteExpense = {deleteExpense}
                            />
                        ) )
                    }
                    </>
                    
                )
            }
        </div>
    )
}

export default ListExpense