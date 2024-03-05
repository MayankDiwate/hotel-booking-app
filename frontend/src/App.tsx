import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import AddHotel from "./pages/AddHotel";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<>Home</>} />
          <Route path="/search" element={<>Search</>} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          {isLoggedIn && (
            <>
              <Route path="/add-hotel" element={<AddHotel />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
