import React from "react";
import RequestForm from "./components/RequestForm";
//import RequestList from "./components/RequestList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <img src="/pobl-logo.png" className="App-logo" alt="logo" />

      <RequestForm />
      {/* <RequestList requests={requests} /> */}
    </div>
  );
}

export default App;
