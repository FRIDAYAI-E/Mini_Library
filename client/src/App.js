import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookDetails from './components/users/BookDetails';
// import UserDashboard from './components/users/UserDashboard';
// import NewUser from './components/users/NewUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <h1>Router handler page</h1>
        {/* <UserDashboard /> */}
        {/* <NewUser /> */}
        <BookDetails />
      </BrowserRouter>

    </div>
  );
}

export default App;
