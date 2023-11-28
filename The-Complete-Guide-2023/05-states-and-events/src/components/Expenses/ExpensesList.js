import ExpenseItem from "./ExpenseItem";
import './ExpensesList.css'

const ExpensesList = props => {
    if (props.items.length === 0) {
        return <h2 className="expenses-list__fallback">No expenses found.</h2>
    }

    return <ul className="expenses-list">
        {
            props.items.map(expense => (
                <ExpenseItem
                    key={expense.id} // this prop is not used by us, but by react. It helps him to identify items in the list
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                />
            ))
        }
    </ul>
};

export default ExpensesList;