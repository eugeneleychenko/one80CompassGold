import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import { ChatInput } from './ChatInput';

function App() {
  return (
    <div className="App">
    
      <Sidebar />
      <ChatInterface />
   
  </div>
  );
}

export default App;
