import React from 'react';
import './StyleL.css';  //direcciona

const Footer: React.FC = () => {
  return (
    <footer className="text-white pt-4" style={{ backgroundColor: 'brown' }} >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="#" className="text-white text-decoration-none">Nosotros</a></li>
              <li><a href="#" className="text-white text-decoration-none">Vinculación</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Horario de atención</h5>
            <ul className="list-unstyled">
              <li>Lun - Vier: 09:00 hrs - 17:00 hrs</li>
              <li>Sáb - Dom: Cerrado</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contáctanos</h5>
            <address>
              Smza. 255, Mza. 11, Lote 1119-33<br />
              77500 Cancún, México<br />
              Tel: 9982831859<br />
              <a href="mailto:prensaydifusion@upqroo.edu.mx" className="text-white text-decoration-none">prensaydifusion@upqroo.edu.mx</a>
            </address>
          </div>
        </div>
        <div className="text-center py-3">
          <hr className="border-light" />
          <h6>Síguenos en nuestras redes sociales</h6>
          <a href="https://www.facebook.com/upqroo" className="text-white me-3" target="_blank" rel="noopener noreferrer">
  <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
</a>
<a href="https://www.instagram.com/up_qroo" className="text-white me-3" target="_blank" rel="noopener noreferrer">
  <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
</a>
          <a href="#" className="text-white me-3"><i className="bi bi-tiktok" style={{ fontSize: '1.5rem' }}></i></a>
          <a href="#" className="text-white me-3"><i className="bi bi-youtube" style={{ fontSize: '1.5rem' }}></i></a>
        </div>
        <div className="text-center mt-3">
          <a href="#" className="text-white text-decoration-none me-3">Política de privacidad</a>
          <a href="#" className="text-white text-decoration-none">Términos y condiciones</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
