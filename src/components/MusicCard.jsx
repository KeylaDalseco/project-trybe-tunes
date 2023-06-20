import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    favoriteSongs: [], // onde armazena as musicas favoritadas
  };

  componentDidMount() {
    this.getSaveFavorites();
  }

  favorite = async (event, songs) => {
    const { checked } = event.target;

    this.setState({ isLoading: true });

    if (checked) {
      await addSong(songs); // funçaõ que adiciona uma musica salva no localStorage
      await this.getSaveFavorites();
      this.setState({
        isLoading: false,
        // favorites: { ...prevs.favorites, [songs.trackId]: songs },
      });
    } else {
      await removeSong(songs); // funçaõ que remove uma musica salva
      await this.getSaveFavorites(); // atualiza depois de remover a musica do favoritos
      this.setState({ isLoading: false });
    }
  };

  getSaveFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });

    console.log(favoriteSongs);
  };

  render() {
    const { allSongs } = this.props;
    const { isLoading, favoriteSongs } = this.state;
    if (isLoading) {
      return <Carregando />;
    }
    return (
      allSongs.map((album, index) => (
        <div key={ index }>
          <div>
            <p>{ album.trackName }</p>
            <audio data-testid="audio-component" src={ album.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label
              data-testid={ `checkbox-music-${album.trackId}` }
            >
              Favorita
              <input
                type="checkbox"
                name="favoriteSongs"
                checked={ favoriteSongs.some((song) => song.trackId === album.trackId) }
                onChange={ (event) => this.favorite(event, album) }
              />
            </label>
          </div>
        </div>
      ))
    );
  }
}

MusicCard.propTypes = {
  allSongs: PropTypes.arrayOf(
    PropTypes.shape({
    }),
  ).isRequired,
};

export default MusicCard;
