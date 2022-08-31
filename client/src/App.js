import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import SingleTask from './pages/SingleTask.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/api_v1/tasks/sync/:id" element={<SingleTask/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
