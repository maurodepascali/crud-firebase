import React, {useEffect, useState} from 'react'
import fireDb from "../firebase"
import {useParams, Link} from "react-router-dom"
import "./View.css"
import { getDatabase, ref, onValue, remove  } from "firebase/database";

const View = () => {

  const [user, setUser] = useState({})

  const {id} = useParams()

  useEffect(() => {

    const db = getDatabase();
    const contactsRef = ref(db, `contacts/${id}`)

    const handleSnapshot = (snapshot) => {
      if (snapshot.exists()) {
        setUser({ ...snapshot.val() });
      } else {
        setUser({ ...snapshot.val() });
      }
    };

    const handleError = (error) => {
      console.error(error);
    };
    onValue(contactsRef, handleSnapshot, handleError);
  }, [id])


  return (
    <div style={{marginTop: "100px"}}>
      <div className="card">
        <div className="card-header">
          <p>Datos del usuario</p>
        </div>
        <div className="container">
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Nombre: </strong>
            <span>{user.name}</span>
            <br />
            <br />
            <strong>Email: </strong>
            <span>{user.email}</span>
            <br />
            <br />
            <strong>Teléfono: </strong>
            <span>{user.contact}</span>
            <br />
            <br />
            
            <Link to="/">
                <button className='btn btn-edit'>Volver</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default View