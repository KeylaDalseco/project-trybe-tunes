import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import dance from '../images/Dance.gif';
import user from '../images/5087579.png';

class Login extends React.Component {
  state = {
    name: '',
    btnLogin: true,
    loading: false,
  };

  // validação do botão
  validationButton = () => {
    const { name } = this.state;

    const lengthName = 3;
    const nomeLogin = name.length >= lengthName;

    this.setState({
      btnLogin: !(nomeLogin),
    });
  };

  // função para criar os names e values dinamicos
  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationButton);
  };

  // função de renderização do loading e uso da função
  rendering = async () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });

    await createUser({ name });

    this.setState({ loading: false });

    history.push('/search');
  };

  render() {
    const { name, btnLogin, loading } = this.state;
    return (
      <div
      // style={ { backgroundImage: url('/src/images/Dance.gif') } }
        data-testid="page-login"
        className="flex items-center
      justify-center min-h-screen
      bg-gradient-to-r from-sky-500 to-indigo-500 bg-no-repeat bg-center ..."
      >
        <img src={ dance } className="px-32 min-h-screen mr-56 " alt="gif dançando" />
        <div
          className="text-5xl font-extrabold"
          style={ { position: 'absolute', top: 200, left: 1330, zIndex: 1 } }
        >
          Trybe Tunes

        </div>
        { loading ? <Carregando /> : (
          <div className="w-1/1 mr-96 bg-white p-4 rounded-xl shadow-2xl">
            <div
              className="flex items-center
      justify-center"
            >
              <img className="w-24 " src={ user } alt="imagem de fone" />
              <h1
                className="py-10 text-center text-5xl
              text-blue-600 font-bold"
              >
                Login
              </h1>
            </div>
            <form
              className="flex items-center
                justify-center"
            >
              <label
                htmlFor="login-name-input"
              >
                <input
                  className=" mr-4 pr-8 px-3 py-2 bg-white
                  border border-black focus:ring-sky-500
                rounded-md sm:text-sm focus:ring-1"
                  type="text"
                  name="name"
                  placeholder="Insira seu nome completo..."
                  data-testid="login-name-input"
                  value={ name }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                className=" rounded-md px-8 py-2
                bg-sky-500 hover:bg-sky-700
                disabled:opacity-30"
                type="button"
                disabled={ btnLogin }
                data-testid="login-submit-button"
                onClick={ this.rendering }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
