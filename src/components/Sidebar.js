import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function BrandExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className='mb-4'>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src='https://freesvg.org/img/folded-map.png'
              width="45"
              height="45"
              className="d-inline-block align-top me-3"
            />
            <span style={{ fontSize: '30px' }}>type-n-see</span>
          </Navbar.Brand>
        </Container>
      </Navbar >

      <ul >
        <li><a class="" href="#TRCities">Türkiye'nin İlleri</a></li>
        <li><a href="#WorldCities">Dünya Ülkeleri</a></li>

      </ul>
    </>
  );
}

export default BrandExample;