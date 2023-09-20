import './App.css';
import CreateTask from './pages/CreateTask';
import ListTaks from './pages/ListTaks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListTaks/>}></Route>
        <Route path='/create' element={<CreateTask/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
