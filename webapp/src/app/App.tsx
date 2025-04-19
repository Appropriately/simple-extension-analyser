import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Layout from "./routes/Layout";
import Extension from "./routes/Extension";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/extension/:id" element={<Extension />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
