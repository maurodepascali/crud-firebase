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
import ExcelJS from 'exceljs';

const Home = () => {

  const [data, setData] = useState({})

const exportData = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');
    
    // Añadir headers
    worksheet.columns = [
        { header: 'Nombre', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Teléfono', key: 'contact' }
    ];
    
    // Añadir datos
    worksheet.addRows(Object.values(data));
    
    // Guardar archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
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