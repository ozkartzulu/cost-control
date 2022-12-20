import { useState, useEffect } from 'react'

function Filters({ filter, setFilter }){
    return (
        <div className='filters shadow container'>
            <form>
                <div className="field">
                    <label htmlFor="">Filter Expenses</label>
                    <select name="" id="" value={filter} onChange={ e => setFilter(e.target.value) } >
                        <option value="">-- All Categories --</option>
                        <option value="save">Save up</option>
                        <option value="food">Food</option>
                        <option value="house">House</option>
                        <option value="expenses">Expenses</option>
                        <option value="leisure">Leisure</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filters