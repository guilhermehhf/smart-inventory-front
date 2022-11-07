import React from "react";
import "./styles.css";
// import '.../App.css';
import { Link, Outlet, useLocation } from "react-router-dom";
// import { Navbar } from "../navbar"
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PaidIcon from '@mui/icons-material/Paid';

export const NavBar: React.FunctionComponent = () => {
  function HeaderView() {
    const location = useLocation();
    return location.pathname;
  }

  const SidebarElements = [
    {
      title: "Graficos",
      icon: <QueryStatsIcon/>,
      link: "/graficos",
    },
    {
      title: "Cadastrar Produtos",
      icon: <LocalGroceryStoreIcon/>,
      link: "/register/product",
    },
    {
      title: "Cadastrar Transações",
      icon: <PaidIcon/>,
      link: "/register/transaction",
    },
    {
      title: "Cadastrar Categoria",
      icon: <PaidIcon/>,
      link: "/register/category",
    },
  ];
  return (
    <div>
      {/* <div className="topbar">
        <h1>Logo</h1>
        <h1>Login</h1>
      </div> */}
      <div className="container">
        <div className="sidebar">
        <div className="user-picture"></div>
        <div className="user-name">Heyy</div>
          <ul className="sidebar-list">
          
            {SidebarElements.map((val, key) => {
              return (
                <li
                  className="row"
                  id={HeaderView() == val.link ? "active" : ""}
                  key={key}
                >
                  <Link to={val.link} className="row-list">
                    <div className = "icon">{val.icon}</div>{" "}
                    <div className = "title">{val.title}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
          
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
