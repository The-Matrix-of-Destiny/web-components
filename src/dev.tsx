import "./dev.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter } from "./index";

const App = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Component Library Demo</h1>
    <div className="mb-8">
      <Button variant="primary">Hello Button</Button>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Demo Card</CardTitle>
      </CardHeader>
      <CardContent>This is a card content.</CardContent>
      <CardFooter>
        <Button>Card Button</Button>
      </CardFooter>
    </Card>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />); 