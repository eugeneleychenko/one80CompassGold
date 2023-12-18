import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
// import { ChatInput } from './ChatInput';
import Journey from './Journey';
import { ChatProvider } from './ChatProvider';

function App() {
  return (
  <ChatProvider>

    <div className="App">
      {/* <Journey /> */}
      <Sidebar />
      <ChatInterface />
   
    </div>
  </ChatProvider>
  );
}

export default App;
