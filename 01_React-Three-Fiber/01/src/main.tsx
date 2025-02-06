import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas camera={{ position: [0, 0, 2] }}>
      <App />
    </Canvas>
  </StrictMode>
);
