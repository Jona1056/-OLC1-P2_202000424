import React from 'react';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
function Home() {
  return (
    <Fragment>
      <h1>Bienvenido a mi sitio web</h1>
      <p>Esta es la página de inicio</p>
      <button   onClick={handleGoToAbout()}>Ir a Acerca de</button>

    </Fragment>
  );
}
function HomePage() {
    const history = useHistory();
  
    function handleGoToAbout() {
      history.push('/about');
    }
}  
export default Home;