import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import Header from "./components/Header";
import Body from "./components/Body";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Error from "./components/Error";
import TopRated from "./components/TopRated";
import RestaurantMenu from "./components/RestarurantMenu";
import { useEffect, useState } from "react";
import userContext from "./utils/userContext";

const AppLayout = () => {
  const [userName, setUserName] = useState();
  useEffect(() => {
    // make and api call and give the username and pass word
    const data = { name: "Talent P Thomas" };
    setUserName(data.name);
  }, []);

  return (
    <userContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </userContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/topRated",
        element: <TopRated />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/toprated/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
