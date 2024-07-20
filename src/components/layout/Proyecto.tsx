// src/Components/View/Proyecto.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Img from './img/Nata.webp';
import Header from '../layout/Header-Home';
import Footer from '../layout/Footer';

const Proyecto = () => {
  return (
    <>
      <Header/>
    <div className="row container">
        <div className="col-8 col-md-3 sidebar">
            <img src={Img} alt="Imagen de portada" className="img-fluid"/>
            <p><strong>Fecha de publicación</strong><br/>09 de Diciembre de 2023</p>
        </div>
        <div className="col-8 col-md-9">
            <h2>Natanael Cano Monje: Premio Internacional Carlos Fuentes a la Creación Literaria en el Idioma Español 2023</h2>
            <p><strong>Autor(es):</strong><br/> Poniatowska, Elena</p>
            <p><strong>Resumen:</strong><br/>Hélène Elizabeth Louise Amélie Paula Dolores Poniatowska Amor ha entregado su vida a las letras y se ha dedicado a dar voz al pueblo. A sus 91 años, se considera a Elena Poniatowska como la escritora viva más importante de México. Hélène Elizabeth Louise Amélie Paula Dolores Poniatowska Amor, conocida como Elena Poniatowska, es una escritora y periodista francomexicana. Su obra literaria tiene una marcada orientación social y política en la cual destacan sus crónicas bajo la fórmula, que se ha venido a denominar, de polifonía testimonial. Hélène Elizabeth Louise Amélie Paula Dolores Poniatowska Amor nació el 19 de mayo de 1932 en Francia, siendo hija de Jean Joseph Évremond Sperry Poniatowski, un noble francés de ascendencia polaca, y María de los Dolores Amor de Yturbe, una mujer francesa de ascendencia mexicana. Su abuelo Andreas era tataranieto de Kazimierz Poniatowski hermano de Estanislao II Poniatowski, rey de la República de las Dos Naciones, país que era una monarquía electiva y no hereditaria; su abuela paterna era estadounidense.nota 1​3​ Por el lado materno tiene ascendencia rusa.nota 1​ Es sobrina de la poeta mexicana Pita Amor (1918-2000); su familia cuenta con antepasados ilustres como un arzobispo, un músico y algunos escritores más. Debido a sus ideas y ascendencia, se la conoce también como La Princesa Roja.4​

                La familia de Elena Poniatowska emigró de Francia a México, como consecuencia de la Segunda Guerra Mundial. Elena llegó a los diez años de edad con su madre y su hermana Sofía (Kitzya) a la Ciudad de México. Mientras, el padre continuaba combatiendo para reunirse con ellas acabada la contienda.5</p>
        </div>
    </div>
    <div className="row mt-5 container">
        <div className="col-12">
            <h4>Carreras</h4>
            <ul className="list-unstyled">
                <li>Ingeniería en Software</li>
                <li>Ingeniería en Software</li>
                <li>Ingeniería en Software</li>
                <li>Ingeniería en Software</li>
                <li>Ingeniería en Software</li>
                <li>Ingeniería en Software</li>
                <li>Ingeniería en Software</li>
            </ul>
        </div>
    </div>

    <Footer/>

    </>

  );
};

export default Proyecto;