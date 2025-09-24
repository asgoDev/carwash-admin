import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes.jsx";
import ClientDetail from "./pages/ClientDetail.jsx";
import EmployeeDetail from "./pages/EmployeeDetail.jsx";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((r) =>
            r.path ? (
              <Route key={r.path} path={r.path} element={r.element} />
            ) : (
              r.sublist.map((s) => (
                <Route key={s.path} path={s.path} element={s.element} />
              ))
            )
          )}
          <Route
            key="/clients/:id"
            path="/clients/:id"
            element={<ClientDetail />}
          />
          <Route
            key="/employees/:id"
            path="/employees/:id"
            element={<EmployeeDetail />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}
