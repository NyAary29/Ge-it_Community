import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.subRoutes) {
          return prop.subRoutes.map((subProp, subKey) => {
            return (
              <Route
                path={subProp.path}
                element={subProp.component}
                key={`${key}-${subKey}`}
                exact
              />
            );
          });
        } else {
          return (
            <Route
              path={prop.path}
              element={prop.component}
              key={key}
              exact
            />
          );
        }
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].subRoutes) {
        for (let j = 0; j < routes[i].subRoutes.length; j++) {
          if (
            props?.location?.pathname.indexOf(
              routes[i].subRoutes[j].layout + routes[i].subRoutes[j].path
            ) !== -1
          ) {
            return routes[i].subRoutes[j].name;
          }
        }
      } else if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <div>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/students",
          imgSrc: require("../assets/img/logo.jpg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/students" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
