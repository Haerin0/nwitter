import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect (() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(user);
      } else {
        setisLoggedIn(false);
      }
      setInit(true);
    });
  },[]);


  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing"}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
