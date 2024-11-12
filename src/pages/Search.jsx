import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import "./Search.css"
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";


const Search = () => {

    const [data, setData] = useState({})

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    let query = useQuery()
    let search = query.get("name")
    console.log("search", search)

    useEffect(() => {
        searchData()
    },[search])

    const searchData = () => {
        const db = getDatabase();
        const contactsRef = ref(db, "contacts")
    
        const handleSnapshot = (snapshot) => {
          const filteredData = {};

          snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const value = childSnapshot.val();
         
          const name = value.name ? value.name.toLowerCase() : "";
          const phone = value.phone ? value.phone.toLowerCase() : "";
          const email = value.email ? value.email.toLowerCase() : "";
          
          if (name.includes(search) || phone.includes(search) || email.includes(search)) {
            filteredData[key] = value;
          }
        });
        setData(filteredData);
      };

        const handleError = (error) => {
          console.error(error);
        };
        onValue(contactsRef, handleSnapshot, handleError)
 }
  return (
    <div style={{ marginTop: "100px" }}>
          {Object.keys(data).length > 0 ? (
            <table className='styled-table'>                        
              <thead>          
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Nombre</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((id, index) => (
                  <tr key={id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{textAlign:"center", fontWeight:"bold"}}>No hay coincidencia en la busqueda {query.get("name")}</p>
          )}
        </div>
  )
}

export default Search