import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes.jsx";

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
        </Routes>
      </Layout>
    </Router>
  );
}
