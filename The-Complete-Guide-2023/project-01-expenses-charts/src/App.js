import './App.css';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import { useState } from 'react';

const DUMMY_EXPENSES = [
  { id: 'e1', title: 'Car Insurance', amount: 294.67, date: new Date(2023, 11, 3) },
  { id: 'e2', title: 'React', amount: 294.67, date: new Date(2023, 11, 3) },
  { id: 'e3', title: 'Custom Keyboard', amount: 294.67, date: new Date(2023, 11, 3) },
  { id: 'e4', title: 'Mice', amount: 294.67, date: new Date(2023, 11, 3) },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    // setExpenses([expense, ...expenses]); // this isn't the best approach if we want to update our state based on the previous state (why? check previous section)
    setExpenses((prevExpenses) => {  // automatically by react prevExpense is forwarded 
      return [expense, ...prevExpenses];
    });
  }

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
