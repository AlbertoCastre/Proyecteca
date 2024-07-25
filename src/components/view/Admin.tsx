// src/views/Admin.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Admin: React.FC = () => {
  return (
    <div style={{padding:'70px  100px'}}>

<table className="table container" >
        <thead className="table-dark">
        <tr>
            <th className="date-cell" scope="col">Registro</th>
            <th className="date-cell" scope="col">Fecha de recibo</th>
            <th className="date-cell" scope="col">Origen</th>
            <th className="date-cell" scope="col">Estado</th>
        </tr>
        </thead>
        <tbody className="table-group-divider">
        <tr>
            <th className="date-cell"  scope="row">Ensayo de insectos venenosos</th>
            <td className="date-cell" id="date1"></td>
            <td className="date-cell" >202200444@upqroo.edu.mx</td>
            <td className="date-cell bg-success text-white" >Aprobado</td>
        </tr>
        <tr>
            <th className="date-cell"  scope="row">Ensayo de insectos venenosos</th>
            <td className="date-cell" id="date2"></td>
            <td className="date-cell" >202200444@upqroo.edu.mx</td>
            <td className="date-cell bg-warning text-white" >Pendiente</td>
        </tr>
        <tr>
            <th className="date-cell"  scope="row">Ensayo de insectos venenosos</th>
            <td className="date-cell" id="date3"></td>
            <td className="date-cell" >202200444@upqroo.edu.mx</td>
            <td className="date-cell bg-danger text-white" >Rechazado</td>
        </tr>
        <tr>
            <th className="date-cell"  scope="row">Ensayo de insectos venenosos</th>
            <td className="date-cell" id="date4"></td>
            <td className="date-cell" >202200444@upqroo.edu.mx</td>
            <td className="date-cell bg-warning text-white" >Pendiente</td>
        </tr>
        </tbody>
        
    </table>
    <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Admin;
