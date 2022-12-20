import { useState, useEffect } from 'react'
import Head from "./components/Head"
import ListExpense from './components/ListExpense'
import Modal from "./components/Modal"
import Filters from "./components/Filters"
import { generateKey } from './helpers'
import newExpense from "./img/nuevo-gasto.svg"

function App() {
  const [budget, setBudget] = useState( Number(localStorage.getItem('budget')) ?? 0 )
  const [validBudget, setValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [expenses, setExpenses] = useState( localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [] )
  const [expenseEdit, setExpenseEdit] = useState({})
  const [filter, setFilter] = useState('')
  const [listFilter, setListFilter] = useState([])

  useEffect( () => {
    if(Object.keys(expenseEdit).length > 0){
      setModal(true)
      setTimeout(function(){
          setAnimate(true)
      },500)
    }
  }, [expenseEdit] )

  useEffect( () => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect( () => {
     localStorage.setItem('expenses', JSON.stringify(expenses) ?? []) 
  }, [expenses])

  useEffect( () => {
    const budgetLS = Number(localStorage.getItem('budget'))
    if(budgetLS > 0){
      setValidBudget(true)
    }
  }, [] )

  // Use Effect for filter by category
  useEffect( () => {
    if(filter){
      const listFilter = expenses.filter( expense => expense.category === filter )
      setListFilter(listFilter)
    }
  }, [filter] )

  const handleNewExpense = () => {
    setModal(true)
    setExpenseEdit({})

    setTimeout(function(){
        setAnimate(true)
    },500)
  }

  const saveExpense = expense => {
    if(expense.id){
      const expensesUpdates = expenses.map( expenseState => expense.id === expenseState.id ? expense : expenseState )
      setExpenses(expensesUpdates)
      setExpenseEdit({})

    }else{
      expense.id = generateKey()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setAnimate(false)
    setTimeout( () => {
        setModal(false)
    }, 500 )
  }

  const deleteExpense = id => {
    const listUpdate = expenses.filter( expenseState => id !== expenseState.id )
    setExpenses(listUpdate)
  }

  return (
    <div className={modal ? 'fix' : ''}>
      <Head 
        budget = {budget}
        setBudget = {setBudget}
        validBudget = {validBudget}
        setValidBudget = {setValidBudget}
        expenses = {expenses}
        setExpenses = {setExpenses}
      />
      { validBudget && (
        <main>
          <Filters 
            filter = {filter}
            setFilter = {setFilter}
          />
          <ListExpense
            expenses = {expenses}
            setExpenseEdit = {setExpenseEdit}
            deleteExpense = {deleteExpense}
            filter = {filter}
            listFilter = {listFilter}
          />
          <div className="new-expense">
            <img src={ newExpense } alt="Icon new Expense" onClick={handleNewExpense}/>
          </div>
        </main>
      )}

      { modal && 
        <Modal 
          setModal={setModal} 
          animate={animate} 
          setAnimate={setAnimate} 
          saveExpense={saveExpense}
          expenseEdit = {expenseEdit}
          setExpenseEdit = {setExpenseEdit}
        /> 
      }
    </div>
  )
}

export default App
