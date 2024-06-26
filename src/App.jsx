import { useLayoutEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, useLocation, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProjectDetail from "./Pages/ProjectDetail";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
}, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial="false">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            // <motion.div
            //   initial={{ opacity: 0 }}
            //   animate={{ opacity: 1 }}
            //   exit={{ opacity: 0 }}
            //   transition={{ duration: 0.5 }}
            // >
              <HomePage />
            // </motion.div>
          }
        />
        <Route
          path="/projectDetail/:id"
          element={
            // <motion.div
            //   initial={{ opacity: 0 }}
            //   animate={{ opacity: 1 }}
            //   exit={{ opacity: 0 }}
            //   transition={{ duration: 0.5 }}
            // >
              <ProjectDetail />
            // </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Page not found</h2>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;