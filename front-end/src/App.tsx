import Index from "./components/Pages/Index/Index";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Profile from "./components/Pages/Profile/Profile";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navigation from "./components/Header/Navigation/Navigation";
import { TasksContextProvider } from "./context/TaskContext";
import "./App.css";
import { UserContextProvider } from "./context/UserContext";
import URLError from "./components/Pages/URLError/URLError";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserContextProvider>
          <TasksContextProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="*"
                element={
                  <URLError
                    bodyText="There is nothing here..."
                    statusNumber={404}
                    navText="Sorry, the page you are looking for could not be found."
                    btnText="Go back!"
                    navigationPath="/"
                    />
                }
              />
            </Routes>
          </TasksContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
