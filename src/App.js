import { BrowserRouter, Routes, Route } from "react-router-dom";

import Authentication from './pages/authentication/Authentication.jsx';
import MovieDetail from "./pages/movie-detail/MovieDetail.jsx";
import SelectTheatre from "./pages/select-theatre/SelectTheatre.jsx";
import Client from "./pages/client/Client.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Home from "./pages/home/Home.jsx";
import SelectSeats from "./pages/select-seats/SelectSeats.jsx";
import Unauthorised403 from "./components/unauthorised/Unauthorised403.jsx";
import RequireAuth from "./components/require-auth/RequireAuth.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';







function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Authentication />} />
          <Route path='/customer' element={<Home />} />
          <Route path="/client" element={<Client />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/unauthorised" element={<Unauthorised403 />} />
          <Route path="/movie-detail/:movieId" element={<MovieDetail />} />
          <Route path="/buy-tickets/:movieName/:movieId" element={<SelectTheatre />} />

          <Route element={<RequireAuth allowedRoles={["CUSTOMER"]} />}>
            <Route path="/select-seats/:movieId/:theatreId" element={<SelectSeats />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
