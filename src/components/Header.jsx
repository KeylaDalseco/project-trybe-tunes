import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    user: '', // state para guardar os dados do local storage
    loading: false, // reseta o carregamento
  };

  async componentDidMount() { // Aqui preciso do didmount pois estou fazendo uma requisição a função getUser
    this.setState({ loading: true }); // ativo a mensagem de loading

    const usuario = await getUser(); // dados que foram salvos no local storage
    if (usuario) {
      this.setState({
        user: usuario,
        loading: false, // desativo a mensagem de loading
      });
    }
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          { loading
            ? <Carregando />
            : (<p data-testid="header-user-name">{user.name}</p>) }
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">
                Search
              </Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
