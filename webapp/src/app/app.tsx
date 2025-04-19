import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Extension from "./routes/extension";
import Home from "./routes/home";
import Layout from "./routes/layout";

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    (function () {
      const htmlElement = document.querySelector("html");
      if (htmlElement && htmlElement.getAttribute("data-bs-theme") === "auto") {
        function updateTheme() {
          if (htmlElement) {
            htmlElement.setAttribute(
              "data-bs-theme",
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            );
          }
        }

        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", updateTheme);
        updateTheme();
      }
    })();
  });

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/extension/:id" element={<Extension />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
