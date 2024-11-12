import React, {useState, useEffect} from 'react'
import {useNavigate , useParams} from "react-router-dom"
import './AddEdit.css'
import {toast} from "react-toastify"
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";

const initialState = {
  name:"",
  email: "",
  contact: ""
}

const AddEdit = () => {

  const [state, setState] = useState(initialState)
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const {name, email, contact} = state;

  const {id} = useParams()

  useEffect(() => {

    const db = getDatabase();
    const contactsRef = ref(db, "contacts");

    const handleSnapshot = (snapshot) => {
      if (snapshot.exists()) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    };
    const handleError = (error) => {
      console.error(error);
    };
    onValue(contactsRef, handleSnapshot, handleError);
  }, [id])

  
  useEffect(() => {
    if(id){
      setState({...data[id]})
    }else{
      setState({...initialState})
    }
    return () => {
      setState({...initialState})
    }
  }, [id, data])


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name] : value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!name || !email || !contact){
      toast.error("Complete los campos por favor")
    } else{
      if(!id){
        const db = getDatabase();
        const contactsRef = ref(db, "contacts");
        try {
          await push(contactsRef, state);
          toast.success("Usuario dado de alta con éxito");

        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      }else{
          const db = getDatabase();
          const contactsRef = ref(db, `contacts/${id}`);
          try {
            await set(contactsRef, state);
  
            toast.success("Se han actualizado los campos correctamente");
  
          } catch (error) {
            console.error(error);
            toast.error(error.message);
          }
    }
    setTimeout(() => navigate("/"), 1000);
  }
}
  
  return (
    <div style={{marginTop: "100px"}}>
      <form 
        style={{
          margin:"auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
          textAlign:"center"
        }}
        onSubmit={handleSubmit}
        >
          <label htmlFor="name">Nombre</label>
            <input 
            type="text" 
            id='name'
            name='name'
            placeholder='ingrese su nombre'
            value={name || ""}
            onChange={handleInputChange}
          />
           <label htmlFor="email">Correo eléctronico</label>
            <input 
            type="text" 
            id='email'
            name='email'
            placeholder='ingrese su correo eléctronico'
            value={email || ""}
            onChange={handleInputChange}
          />
           <label htmlFor="contact">Teléfono</label>
            <input 
            type="number" 
            id='contact'
            name='contact'
            placeholder='ingrese su teléfono'
            value={contact || ""}
            onChange={handleInputChange}
          />
          <input type="submit" value={id ? "Actualizar" : "Guardar"}/>
      </form>
    </div>
  )
}

export default AddEdit