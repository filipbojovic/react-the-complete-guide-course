import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card"
import './Expenses.css'
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

// this component controls expensesFilter component (its values)
const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2023');

    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    }

    const filteredExpenses = props.items.filter((expense) => {
        return expense.date.getFullYear().toString() === filteredYear;
    })

    return (
        <li>
            <Card className="expenses">
                <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
                <ExpensesChart expenses={filteredExpenses} />
                <ExpensesList items={filteredExpenses} />
                {/* another approach 1*/}
                {/* {filteredExpenses.length === 0 && <p>No Expenses found.</p>}
            {filteredExpenses.length > 0 &&
                filteredExpenses.map(expense => (
                    <ExpenseItem
                        key={expense.id} // this prop is not used by us, but by react. It helps him to identify items in the list
                        title={expense.title}
                        amount={expense.amount}
                        date={expense.date}
                    />
                ))
            } */}
                {/* another approach 2*/}
                {/* {
                filteredExpenses.length === 0
                    ? <p>No Expenses found.</p>
                    : (filteredExpenses.map(expense => (
                        <ExpenseItem
                            key={expense.id} // this prop is not used by us, but by react. It helps him to identify items in the list
                            title={expense.title}
                            amount={expense.amount}
                            date={expense.date}
                        />
                    ))
                    )
            } */}
            </Card>
        </li>
    );
}

export default Expenses;