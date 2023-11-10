import logo from './logo.svg';
import './App.css';
import ExpenseItem from './components/Expenses/ExpenseItem';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';


const App = () => {
  const expenses = [
    { id: 'e1', title: 'Car Insurance', amount: 294.67, date: new Date(2023, 11, 3) },
    { id: 'e2', title: 'React', amount: 294.67, date: new Date(2023, 11, 3) },
    { id: 'e3', title: 'Custom Keyboard', amount: 294.67, date: new Date(2023, 11, 3) },
    { id: 'e4', title: 'Mice', amount: 294.67, date: new Date(2023, 11, 3) },
  ];
  return (
    <div className="App">
      <NewExpense />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
