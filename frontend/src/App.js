import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to = "/" />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to = "/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
