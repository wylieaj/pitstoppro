import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/root/ErrorPage";
import HomePage, { loader as getFuelStations } from "./pages/HomePage";
import LayoutTemplate from "./pages/root/LayoutTemplate";
import DetailsPage, { loader as getFuelStation } from "./pages/DetailsPage";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <LayoutTemplate />,
        children: [
          {
            index: true,
            element: <HomePage />,
            loader: getFuelStations,
          },
          {
            path: ":brand/:site_id",
            element: <DetailsPage />,
            loader: getFuelStation,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
