import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import EmployeeUI from "./Pages/EmployeeUI";
import ClientUI from "./Pages/ClientUI";
import "./App.css";
import DriverUI from "./Pages/DriverUI";
import AssignTheDriverUI from "./Pages/AssignTheDriverUI";
import UpdateUser from "./Pages/UpdateUser";
import Registration from "./Pages/Registration";
import AddNewVehicle from "./Pages/AddNewVehicle";
import ReadDbTable from "./Pages/ReadDbTable";
import ChangeOrderStatus from "./Pages/ChangeOrderStatus";
import ReadOrders from "./Pages/ReadOrders";
import AddNewItem from "./Pages/AddNewItem";
import CreateOrder from "./Pages/CreateOrder";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/EmployeeUI" element={<EmployeeUI />} />
          <Route path="/ClientUI" element={<ClientUI />} />
          <Route path="/DriverUI" element={<DriverUI />} />
          <Route path="/AssignTheDriverUI" element={<AssignTheDriverUI />} />
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/AddNewVehicle" element={<AddNewVehicle />} />
          <Route path="/ReadDbTable" element={<ReadDbTable />} />
          <Route path="/ChangeOrderStatus" element={<ChangeOrderStatus />} />
          <Route path="/ReadOrders" element={<ReadOrders />} />
          <Route path="/AddNewItem" element={<AddNewItem />} />
          <Route path="/CreateOrder" element={<CreateOrder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
