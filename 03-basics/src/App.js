import logo from './logo.svg';
import './App.css';
import ExpenseItem from './components/ExpenseItem';
import Expenses from './components/Expenses';

function App() {
  const expenses = [
    { id: 'e1', title: 'Car Insurance', amount: 294.67, date: new Date(2023, 11, 3) },
    { id: 'e2', title: 'MDCS', amount: 294.67, date: new Date(2023, 11, 3) },
    { id: 'e3', title: 'Custom Keyboard', amount: 294.67, date: new Date(2023, 11, 3) },
    { id: 'e4', title: 'Mice', amount: 294.67, date: new Date(2023, 11, 3) },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Expenses items={expenses}/>
      </header>
    </div>
  );
}

export default App;
