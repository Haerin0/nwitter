import { useEffect,useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { updateProfile } from "@firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } 
      setInit(true);

      const refreshUser = () => {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
          });
      }
    });
  }, []);
  
  return (
    <>
    {init ? (
      <AppRouter refreshUser isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) :( 
        "initializing..."
        )}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;