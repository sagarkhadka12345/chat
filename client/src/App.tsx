import React from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Chat from "./Chat";

function App() {
  return (
    <div className="App flex justify-center items-center w-screen h-screen">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
