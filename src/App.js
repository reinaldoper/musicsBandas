import './App.css';
import { useState } from 'react';
import { search } from './service/feths';

const album = 'Pesquise por bandas de musicas'
function App() {
  const [listMusic, setListMusic] = useState([]);
  const [name, setName] = useState('');

  const handleChange = async (event) => {
    const options = {
      method: 'GET',
    };
    const result = await search(name, options);
    setListMusic(result.data);
  };
  console.log(listMusic);
  const listRenderMusics = listMusic.map((music) => (
    <div key={ music.id } className='music-render'>
      <p>{ music.title }</p>
      <img src={ music.album.cover} alt={ music.title } className='img-music' />
      <audio id="player"  controls="controls">
        <source src={music.preview} type="audio/mp3" />
        seu navegador não suporta HTML5
      </audio>
    </div>
  ));
  return (
    <div className="App">
      <ul>
        <li>{listMusic.length > 0 ? <h2>{listMusic[0].artist.name}</h2> : album}</li>
        <li>{listMusic.length > 0 ? <img src={listMusic[0].artist.picture} alt='img' /> : null}</li>
        <li><input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='search' /></li>
        <li><button type='button' onClick={handleChange}>search</button></li>
      </ul>
      {listMusic.length > 0 ? <div className='control-music'>{listRenderMusics}</div> : null}
    </div>
  );
}

export default App;
