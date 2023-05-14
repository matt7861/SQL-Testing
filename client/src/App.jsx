import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Books } from "./pages/Books";
import { Add } from "./pages/Add";
import { Update } from "./pages/Update";
import "./app.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
