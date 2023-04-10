import './App.css';
import { useState, useEffect } from 'react';
import { search } from './service/feths';
import CardMusic from './CardMusic';

const album = 'Pesquise por bandas de musicas'
function App() {
  const [listMusic, setListMusic] = useState([]);
  const [name, setName] = useState('');
  const [favorites, setFavorites] = useState([])
  const [music, setMusic] = useState(true)

  useEffect(() => {
    const local = () => {
      const result = JSON.parse(localStorage.getItem('music'));
      setFavorites(result);
    };
    local();
  }, [])

  const handleChange = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '66a8b6d81emsh798551a4ab13e56p1e20b9jsna74896fddd71',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };
    if (name.length === 0) {
      alert('Please provide a name');
    } else {
      const result = await search(name, options);
      setListMusic(result.data);
      setMusic(true)
    }
  };

  const handleClicks = (id, { target }) => {
    if (!target.checked) {
      const resul = JSON.parse(localStorage.getItem('music'));
      const music = resul.filter((item) => item.id !== id);
      setFavorites(music);
      localStorage.setItem('music', JSON.stringify(music));
    } else {
      const result = listMusic.find((music) => music.id === id);
      setFavorites([...favorites, result]);
      localStorage.setItem('music', JSON.stringify([...favorites, result]));
    }
  };

  const handleNotFavorities = (id) => {
    const resul = JSON.parse(localStorage.getItem('music'));
    const music = resul.filter((item) => item.id !== id);
    setFavorites(music);
    localStorage.setItem('music', JSON.stringify(music));
  }

  const handleFavoriti = () => {
    setMusic(false)
  };

  return (
    <div className="App">
      <ul>
        <li><button type='button' onClick={handleFavoriti}>favorite</button></li>
        <li>{listMusic.length > 0 ? <h2>{listMusic[0].artist.name}</h2> : album}</li>
        <li>{listMusic.length > 0 ? <img src={listMusic[0].artist.picture} alt='img' /> : null}</li>
        <li><input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='search' /></li>
        <li><button type='button' onClick={handleChange}>search</button></li>
      </ul>
      {listMusic.length > 0 && music ?
        <CardMusic listRender={listMusic} favorites={favorites} handleClicks={handleClicks} /> :
        <CardMusic listRender={favorites} favorites={favorites} handleClicks={handleNotFavorities} />}
    </div>
  );
}

export default App;
