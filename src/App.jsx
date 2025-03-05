import './App.css'
import Create from './components/Create'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Read from './components/Read'
import EditUser from './components/EditUser'
import Login from './page/Login'
import Signup from './page/Signup'
import ProjectView from './components/project/ProjectView'
import AddProject from './components/project/AddProject'
import EditProject from './components/project/EditProject'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Create />} />
          <Route path='/read' element={<Read />} />
          <Route path='/edituser/:id' element={<EditUser />} />
          <Route path='/project' element={<ProjectView/>} />
          <Route path='/add-project' element={<AddProject/>} />
          <Route path='/edit-project-details/:id' element={<EditProject/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
