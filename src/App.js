import './App.css';
import { useState } from 'react';
import { search } from './service/feths';

const album = 'Pesquise por bandas de musicas'
function App() {
  const [listMusic, setListMusic] = useState([]);
  const [name, setName] = useState('');
  const [favorites, setFavorites] = useState([])
  const [music, setMusic] = useState(true)

  const handleChange = async (event) => {
    const options = {
      method: 'GET',
      secret: '.env',
    };
    const result = await search(name, options);
    setListMusic(result.data);
    setMusic(true)
  };

  const handleClicks = (id, { target }) => {
    if (!target.checked) {
      const music = favorites.filter((item) => item.id !== id);
      setFavorites(music);
    } else {
      const result = listMusic.find((music) => music.id === id);
      setFavorites([...favorites, result])
    }
  };

  const handleNotFavorities = (id) => {
    const music = favorites.filter((item) => item.id !== id);
    setFavorites(music);
  }

  const handleFavoriti = () => {
    setMusic(false)
  };

  const listRenderMusics = listMusic.map((music) => (
    <div key={music.id} className='music-render'>
      <p>{music.title}</p>
      <p>Favoritar</p>
      <input
        type="checkbox"
        name='check'
        checked={favorites.find((i) => i.id === music.id) ? true : false}
        onChange={(event) => handleClicks(music.id, event)}
      />
      <img src={music.album.cover} alt={music.title} className='img-music' />
      <audio id="player" controls="controls">
        <source src={music.preview} type="audio/mp3" />
        seu navegador não suporta HTML5
      </audio>
    </div>
  ));

  const listRenderFavorities = favorites.map((music) => (
    <div key={music.id} className='music-render'>
      <p>{music.title}</p>
      <p>Favoritar</p>
      <input
        type="checkbox"
        name='check'
        checked={favorites.find((i) => i.id === music.id) ? true : false}
        onChange={() => handleNotFavorities(music.id)}
      />
      <img src={music.album.cover} alt={music.title} className='img-music' />
      <audio id="player" controls="controls">
        <source src={music.preview} type="audio/mp3" />
        seu navegador não suporta HTML5
      </audio>
    </div>
  ));


  return (
    <div className="App">
      <ul>
        <li><button type='button' onClick={handleFavoriti}>favorite</button></li>
        <li>{listMusic.length > 0 ? <h2>{listMusic[0].artist.name}</h2> : album}</li>
        <li>{listMusic.length > 0 ? <img src={listMusic[0].artist.picture} alt='img' /> : null}</li>
        <li><input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='search' /></li>
        <li><button type='button' onClick={handleChange}>search</button></li>
      </ul>
      {listMusic.length > 0 && music ? <div className='control-music'>{listRenderMusics}</div> : <div className='control-music'>{listRenderFavorities}</div>}
    </div>
  );
}

export default App;
