import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy } from "react";

const HomePage = lazy(() => import("./pages/home/"));
const LoginPage = lazy(() => import("./pages/auth/login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
