import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import MasterLayout from "./components/layouts/MasterLayout";
import Main from "./components/pages/after-login/EmployeeFolder/Main";
import PageNotFound from "./components/pages/page-not-found";
import LoaderLayout from "./components/layouts/LoaderLayout";
import EditEmployee from "./components/pages/after-login/EmployeeFolder/EditEmployee";

const router = createBrowserRouter([
  {
    path: "",
    element: <MasterLayout />,
    children: [
      { path: "", element: <Main /> },
      { path: "edit/:id", element: <EditEmployee /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<LoaderLayout />} />;
}

export default App;
