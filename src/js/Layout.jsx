import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Navbar } from "./components/Navbar"


import Home from "./pages/Home"
import ToDoList from "./pages/ToDoList"
import { Rick } from "./pages/Rick"



export const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todos" element={<ToDoList />} />
                <Route path="/rick" element={<Rick />} />
                <Route path="*" element={<h1>Not found 404</h1>} />
            </Routes>
        </BrowserRouter>
    )
}