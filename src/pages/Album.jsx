import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    allSongs: [],
    artistName: '',
    imageURL: '',
    albumName: '',
  };

  componentDidMount() {
    this.exibirMusicas();
  }

  exibirMusicas = async () => {
    const { match: { params: { id } } } = this.props;

    const musics = await getMusics(id);

    const musicas = musics.filter((musica) => musica.wrapperType === 'track');
    this.setState({
      allSongs: [...musicas],
      artistName: musics[0].artistName,
      imageURL: musics[0].artworkUrl100,
      albumName: musics[0].collectionName,
    });
  };

  render() {
    const { allSongs, artistName, albumName, imageURL } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <div>
            <h2 data-testid="artist-name">{ artistName }</h2>
            <h2 data-testid="album-name">{ albumName }</h2>
            <img src={ imageURL } alt={ albumName } />
          </div>
          <MusicCard allSongs={ allSongs } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
