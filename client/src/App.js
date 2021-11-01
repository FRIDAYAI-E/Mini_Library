import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookDetails from './components/users/BookDetails';
import SuccessBooking from './components/users/SuccessBooking';
// import UserDashboard from './components/users/UserDashboard';
// import BrowseBooks from './components/users/BrowseBooks';
// import NewUser from './components/users/NewUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <h1>Router handler page</h1>
        {/* <UserDashboard /> */}
        {/* <NewUser /> */}
        {/* <BrowseBooks /> */}
        <BookDetails />
        <Route exact path="/chicken/home">
          <SuccessBooking/>
        </Route>
      </BrowserRouter>

    </div>
  );
}

export default App;
