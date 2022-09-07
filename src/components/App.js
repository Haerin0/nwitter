import { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  console.log(authService.currentUser); //로그인한 상태가 아니면 null을 반환
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
