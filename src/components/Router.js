import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile"
import Navigation from "./Navigation";


const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                    <Route path="/" element={<Home />}>
                    </Route>
                    <Route exact path="/Profile" element={<Profile />}>
                    </Route>
                    </>
                ) : (
                    <Route path="/" element={<Auth />}>
                    </Route>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;

