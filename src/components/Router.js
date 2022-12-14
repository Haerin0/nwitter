import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile"
import Navigation from "./Navigation";


const AppRouter = ({isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                    <Route path="/" element={<Home userObj={userObj} />}>
                    </Route>
                    <Route exact path="/Profile" element={<Profile userObj={userObj} />}>
                    </Route>
                    </>
                ) : (
                    <Route path="/" element={<Auth />}>
                        <Auth />
                    </Route>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;

