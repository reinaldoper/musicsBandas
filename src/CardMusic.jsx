import React from 'react'

export default function CardMusic({ listRender, favorites, handleClicks }) {
  const listRenderMusics = listRender.map((music) => (
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
  return (
    <div>
      <div className='control-music' > { listRenderMusics } </div>
    </div>
  )
}

