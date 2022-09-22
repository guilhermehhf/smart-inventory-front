import { CssBaseline } from "@mui/material";

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

import { Navbar } from "./components/navbar";
import {Login} from "./pages/Login"
import {Register} from "./pages/Register"

export function AppRoutes() {

  return (
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Route>
        </Routes>
      </Router >
  )
}
