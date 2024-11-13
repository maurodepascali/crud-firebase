import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate } from "react-router-dom"
import "./Header.css"
import { useTheme } from '@emotion/react'

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home")
    const location = useLocation()
    const [search, setSearch] = useState("")
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

    // Obtener el título de la página según la ruta
    const getPageTitle = () => {
        if (location.pathname === "/") return
        if (location.pathname === "/add") return
        if (location.pathname.includes("/view")) return
        if (location.pathname.includes("/update")) return
        return "";
    }

    return (
        <>
            <header className="header">
                <div className="header-content">
                    {window.innerWidth > 768 ? (
                        // Desktop version
                        <>
                            <Link to="/" className="logo">
                                Sistema de usuarios
                            </Link>
                            <div className="header-right">
                                <div className="nav-search">
                                    <form onSubmit={handleSubmit}>
                                        <input 
                                            type="text"
                                            className="inputField"
                                            placeholder="Buscar usuario..."
                                            onChange={e => setSearch(e.target.value)}
                                            value={search}
                                        />
                                    </form>
                                </div>
                                <nav className="nav-links">
                                    <Link 
                                        to="/" 
                                        className={`nav-link ${activeTab === "Home" ? "active" : ""}`}
                                        onClick={() => setActiveTab("Home")}
                                    >
                                        Inicio
                                    </Link>
                                    <Link 
                                        to="/add" 
                                        className={`nav-link ${activeTab === "AddContact" ? "active" : ""}`}
                                        onClick={() => setActiveTab("AddContact")}
                                    >
                                        Alta
                                    </Link>
                                </nav>
                            </div>
                        </>
                    ) : (
                        // Mobile version
                        <>
                            <Link to="/" className="logo">
                                Sistema de usuarios
                            </Link>
                            <div className="nav-search">
                                <form onSubmit={handleSubmit}>
                                    <input 
                                        type="text"
                                        className="inputField"
                                        placeholder="Buscar usuario..."
                                        onChange={e => setSearch(e.target.value)}
                                        value={search}
                                    />
                                </form>
                            </div>
                            <nav className="nav-links">
                                <Link 
                                    to="/" 
                                    className={`nav-link ${activeTab === "Home" ? "active" : ""}`}
                                    onClick={() => setActiveTab("Home")}
                                >
                                    Inicio
                                </Link>
                                <Link 
                                    to="/add" 
                                    className={`nav-link ${activeTab === "AddContact" ? "active" : ""}`}
                                    onClick={() => setActiveTab("AddContact")}
                                >
                                    Alta
                                </Link>
                            </nav>
                        </>
                    )}
                </div>
            </header>
            <h1 className="page-title">{getPageTitle()}</h1>
        </>
    );
}

export default Header