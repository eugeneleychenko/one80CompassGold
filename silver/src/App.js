import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import ChatInterface from "./ChatInterface";
// import { ChatInput } from './ChatInput';
import { ChatProvider } from "./ChatProvider";
import Journey from "./Journey";

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <Sidebar />
        <ChatInterface />
        {/* <Journey /> */}
      </div>
    </ChatProvider>
  );
}

export default App;
