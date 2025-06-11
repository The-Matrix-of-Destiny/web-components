import "./styles/global.css";

import { useState } from "react";
import ReactDOM from "react-dom/client";
import { DateInputControlled } from "./components/DateInput/DateInputControlled";

const App = () => {
  const [value, setValue] = useState("2024-06-01");
  return (
    <div className="p-8 flex flex-col gap-4">
      <DateInputControlled value={value} onChange={setValue} width="w-40"/>
      <DateInputControlled value={value} onChange={setValue} />
      <DateInputControlled value={value} onChange={setValue} width="w-72"/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);