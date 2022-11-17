import { CssBaseline } from "@mui/material";

import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";

import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Graphics } from "./pages/Graphics";
import { NavBar } from "./components/NavBar"
import { RegisterProduct } from "./pages/RegisterProduct"
import { RegisterTransaction } from "./pages/RegisterTransaction"
import { RegisterCategory } from "./pages/RegisterCategory";
import { RegisterShipment } from "./pages/RegisterShipment";

export function AppRoutes() {

  return (
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/graficos" element={<Graphics/>} />
            <Route path="/register/product" element={<RegisterProduct/>} />
            <Route path="/register/transaction" element={<RegisterTransaction/>} />
            <Route path="/register/category" element={<RegisterCategory/>} />
            <Route path="/register/shipment" element={<RegisterShipment/>} />

          </Route>
        </Routes>
      </Router >
  )
}
