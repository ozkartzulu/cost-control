import { useState, useEffect } from "react"
import Message from "./Message"
import closeModal from "../img/cerrar.svg"

function Modal({ setModal, animate, setAnimate, saveExpense, expenseEdit, setExpenseEdit }){

    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')

    useEffect( () => {
        if( Object.keys(expenseEdit).length > 0 ){
          setName(expenseEdit.name)
          setAmount(expenseEdit.amount)
          setCategory(expenseEdit.category)
          setId(expenseEdit.id)
          setDate(expenseEdit.date)
        }
    }, [] )

    const hideModal = () => {
        setAnimate(false)
        setExpenseEdit({})
        setTimeout( () => {
            setModal(false)
        }, 500 )
    }

    const handleExpense = e => {
        e.preventDefault()
        if([name, amount, category].includes('')){
            setMessage("All fields are required")
            setTimeout( () => {
                setMessage('')
            }, 2000 )
            return
        }
        saveExpense({name, amount, category, id, date})
        
    }

    return (
        <div className="modal">
            <div className="close-modal">
                <img src={closeModal} alt="close modal" onClick={hideModal}/>
            </div>
            <form className={`form ${ animate ? 'animate' : 'close' }`}
                onSubmit={ handleExpense }
            >
                <legend>{ expenseEdit.name ? 'Edit Expense' : 'New Expense' }</legend>
                { message && <Message type="error">{message}</Message> }
                <div className="field">
                    <label htmlFor="name">Name of Expense: </label>
                    <input type="text" id="name" 
                        placeholder="Input the name of expense" 
                        value={name}
                        onChange={ e => setName(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label htmlFor="amount">Amount: </label>
                    <input type="number" id="amount" 
                        placeholder="Add the amount of expense" 
                        value={amount}
                        onChange={ e => setAmount( Number(e.target.value) ) }
                    />
                </div>
                <div className="field">
                    <label htmlFor="category">Category: </label>
                    <select name="category" id="category"
                        value={category}
                        onChange={ e => setCategory(e.target.value) }
                    >
                        <option value="">-- Select --</option>
                        <option value="save">Save up</option>
                        <option value="food">Food</option>
                        <option value="house">House</option>
                        <option value="expenses">Expenses</option>
                        <option value="leisure">Leisure</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                    </select>
                </div>
                <input type="submit" value={ expenseEdit.name ? 'Save Expense' : 'Add Expense' } />
            </form>
        </div>
    )
}

export default Modal