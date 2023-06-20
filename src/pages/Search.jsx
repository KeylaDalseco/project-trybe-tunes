import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import '../components/search.css';

class Search extends React.Component {
  state = {
    artistaOuBanda: '',
    isDisabled: true,
    isLoading: false,
    artistName: '',
    albumList: [],
  };

  // renderização com o component
  componentDidMount() {
    // this.searchArtists();
  }

  // função de requisição da API
  searchArtists = async (artist) => {
    const { artistaOuBanda } = this.state;

    if (this.validationButton) {
      this.setState({
        artistaOuBanda: '',
        isDisabled: true,
      });
    }

    this.setState({ isLoading: true });

    const artists = await searchAlbumsAPI(artist);

    if (artists) {
      this.setState({
        isLoading: false, // desativo a mensagem de loading
        artistName: artistaOuBanda,
      });
    }

    this.setState({
      isLoading: false,
      albumList: [...artists],
    });
  };

  // validação do botão
  validationButton = () => {
    const { artistaOuBanda } = this.state;

    const lengthArtistaOuBanda = 2;
    const nomeLogin = artistaOuBanda.length >= lengthArtistaOuBanda;

    this.setState({
      isDisabled: !(nomeLogin),
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationButton);
  };

  render() {
    const {
      artistaOuBanda,
      isDisabled,
      isLoading,
      artistName,
      albumList } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            className=" mr-4 pr-8 px-3 py-2 bg-white
          border border-black focus:ring-sky-500
          rounded-md sm:text-sm focus:ring-1"
            type="text"
            name="artistaOuBanda"
            value={ artistaOuBanda }
            data-testid="search-artist-input"
            placeholder="Pesquisar artista ou banda"
            onChange={ this.onInputChange }
          />
          <button
            className=" rounded-md px-8 py-2
          bg-sky-500 hover:bg-sky-700
          disabled:opacity-30"
            data-testid="search-artist-button"
            onClick={ () => {
              this.searchArtists(artistaOuBanda);
            } }
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
          <div>
            <h3>
              Resultado de álbuns de:
              {' '}
              {artistName}
            </h3>
          </div>
          {isLoading ? (
            <Carregando />
          ) : (
            <div className="div__pai--album">
              {
                albumList.length > 0 ? (albumList.map((album, index) => (
                  <div key={ index } className="div__album">
                    <p>{ album.artistName }</p>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <p>{album.collectionName}</p>
                    <Link
                      key={ album.collectionId }
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Ver album
                      {' '}
                    </Link>
                  </div>
                ))) : (<p>Nenhum álbum foi encontrado</p>)
              }
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Search;
