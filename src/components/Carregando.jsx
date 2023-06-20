import React from 'react';
import { HashLoader } from 'react-spinners';

class Carregando extends React.Component {
  render() {
    return (
      <div
        className="flex items-center
      justify-center w-1/3 mr-96
      bg-white p-4 rounded-xl shadow-2xl"
      >
        <HashLoader color="#0369a1" size={ 35 } className="mr-10" />
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Carregando;
