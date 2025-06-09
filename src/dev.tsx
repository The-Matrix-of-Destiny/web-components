import "./styles/global.css";

import { useState } from "react";
import ReactDOM from "react-dom/client";
import { DateInputControlled } from "./index";

const App = () => {
  const [value, setValue] = useState("2024-06-01");
  return (
    <div className="p-8">
      <DateInputControlled value={value} onChange={setValue} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);