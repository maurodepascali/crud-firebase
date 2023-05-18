import React, {useState,useEffect} from 'react'
import { getDatabase, ref, onValue, remove  } from "firebase/database";
import { Link } from 'react-router-dom'
import "./Home.css"
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { writeFile } from "xlsx";
import * as XLSX from "xlsx";

const Home = () => {

  const [data, setData] = useState({})

  const exportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(Object.values(data));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    writeFile(workbook, "usuarios.xlsx");
  };

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
  }, [])

  const onDelete = async (id) => {
    if(window.confirm("¿Estas seguro de eliminar el usuario?")){
      try {
      const db = getDatabase();
      const contactRef = ref(db, `contacts/${id}`);

      await remove(contactRef)
          toast.success("Usuario borrado con éxito");
      
    }catch(error){
      toast.error(error.message)
    }
      
    }
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
                  <th style={{ textAlign: "center" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((id, index) => (
                  <tr key={id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                    <td>
                      <Link to={`/update/${id}`}>
                        <button className='btn btn-edit'><EditIcon/></button>
                      </Link>
                      <button className='btn btn-delete' onClick={() => onDelete(id)}><DeleteForeverIcon/></button>
                      <Link to={`/view/${id}`}>
                        <button className='btn btn-view'><VisibilityIcon/></button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <button className='btn btn-export' style={{display:"flex", alignItems:"center"}} onClick={exportData}><FileDownloadIcon style={{color:"black"}}/> <p>Exportar</p></button>
            </table>
          ) : (
            <p style={{textAlign:"center", fontWeight:"bold"}}>No hay usuarios registrados</p>
          )}
        </div>
  )
}

export default Home
