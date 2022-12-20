
import { formatDate } from '../helpers'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import iconSave from "../img/icono_ahorro.svg"
import iconHouse from "../img/icono_casa.svg"
import iconFood from "../img/icono_comida.svg"
import iconExpenses from "../img/icono_gastos.svg"
import iconLeisure from "../img/icono_ocio.svg"
import iconHealth from "../img/icono_salud.svg"
import iconSubscriptions from "../img/icono_suscripciones.svg"

const dictionaryIcons = {
    save: iconSave,
    house: iconHouse,
    food: iconFood,
    expenses: iconExpenses,
    leisure: iconLeisure,
    health: iconHealth,
    subscriptions: iconSubscriptions,
}

function Expense({expense, setExpenseEdit, deleteExpense}){

    const {name, category, amount, id, date} = expense

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setExpenseEdit(expense)}>
            Edit
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
            onClick={() => deleteExpense(id)}
            destructive={true}
            >
            Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="expense shadow">
                    <div className="content-expense">
                        <img 
                            src={ dictionaryIcons[category] } alt={`icon-${category}`} 
                        />
                        <div className="description-expense">
                            <p className="category">{category}</p>
                            <p className="name-expense">{name}</p>
                            <p className="date-expense">
                                Added: {''}
                                <span>{ formatDate(date) }</span>
                            </p>
                        </div> 
                    </div>
                    <p className='amount-expense'>${amount}</p>
                </div>
        </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense