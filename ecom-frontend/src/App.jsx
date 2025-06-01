import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Suspense } from "react";
import Loader from "./components/common/Loader";
import AppRoutes from "./routes";
import AdminNotificationListener from "./components/admin/AdminNotificationListener";

const renderRoutes = (routes) =>
  routes.map(({ path, element, children }, index) => (
    <Route key={index} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <AdminNotificationListener />
        <Routes>{renderRoutes(AppRoutes)}</Routes>
      </Suspense>
    </Router>
  );
};

export default App;
