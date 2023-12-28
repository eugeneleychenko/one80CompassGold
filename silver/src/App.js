import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import ChatInterface from "./ChatInterface";
// import { ChatInput } from './ChatInput';
import { ChatProvider } from "./ChatProvider";
import Journey from "./Journey";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex-container">
                <Sidebar />
                <ChatInterface />
              </div>
            }
          />
          <Route path="/journey" element={<Journey />} />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
};

export default App;
