import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes.jsx";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}
