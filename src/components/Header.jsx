import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate } from "react-router-dom"
import "./Header.css"
import { useTheme } from '@emotion/react'

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home")
    const location = useLocation()
    const [search,setSearch] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(location.pathname === "/"){
            setActiveTab("Home")
        }else if(location.pathname === "/add"){
            setActiveTab("AddContact")
        }else if(location.pathname === "/about"){
            setActiveTab("About")
        }
    },[location])
  
    const handleSubmit = async(e) => {
        e.preventDefault()
        navigate(`/search?name=${search}`)
        setSearch("")
    }

    return (
    <div className='header'>
        <Link to="/crud-firebase">
            <p className='logo'>Sistema de usuarios</p>
        </Link>
        <div className='header-right'>
            <form onSubmit={handleSubmit} style={{display:"inline"}}>
                <input 
                    type="text"
                    className='inputField'
                    placeholder='Buscar'
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                />
            </form>
            <Link to="/">
                <p 
                    className={`${activeTab === "Home" ? "active" : ""}`}
                    onClick={() => setActiveTab("Home")}
            >
                Inicio
                </p>     
            </Link>
            <Link to="/crud-firebase/add">
                <p 
                    className={`${activeTab === "AddContact" ? "active" : ""}`}
                    onClick={() => setActiveTab("AddContact")}
            >
                Alta de usuario
                </p>     
            </Link>
        </div>     
    </div>
  )
}

export default Header