import "./App.css";
import { Button } from "react-bootstrap";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { Location } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import AdminPage from "./pages/AdminPage";
import AddUsersPage from "./pages/AddPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/main" Component={MainPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/users" Component={UsersPage} />
        <Route path="/add" Component={AddUsersPage} />
        <Route path="/admin" Component={AdminPage} />
      </Routes>
    </div>
  );
}

export default App;
