import logo from './logo.svg';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [eventos, setEventos] = useState([
    { date: new Date(2022, 0, 10), title: 'Evento 1' },
    { date: new Date(2022, 0, 15), title: 'Evento 2' },
    
  ]);
  const onChangeData = data => {
    setDataSelecionada(data);
  };

  const [imagemPerfil, setImagemPerfil] = useState(null);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [mensagem, setMensagem] = useState('Clique na caneta para editar a mensagem.');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [novaMensagem, setNovaMensagem] = useState('');
  const maxCaracteres = 50;
  const iniciarEdicao = () => {
    setModoEdicao(true);
  };

  const salvarEdicao = () => {
    setMensagem(novaMensagem);
    setModoEdicao(false);
    setNovaMensagem('');
  };

  const cancelarEdicao = () => {
    setModoEdicao(false);
    setNovaMensagem('');
  };

  return (
    <div className="tudo">

      <div className="lado">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {imagemPerfil && (
            <img
              src={imagemPerfil}
              alt="Imagem de Perfil"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          )}
          <label htmlFor="input-imagem" style={{ cursor: 'pointer', marginLeft: '-30px', marginTop: '80px' }}>
            📷
          </label> 
          <input
            id="input-imagem"
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
            style={{ display: 'none' }}
          />
        </div>
        <h3>Hilise</h3>

        <div className='lembretes'>
          <h2>Lembrete do dia</h2>
          {modoEdicao ? (
            <div>
              <input className='mensagemm'
                type="text"
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
              />
              <button className="botao-salvar" onClick={salvarEdicao}>Salvar</button>
              <button className="botao-cancelar" onClick={cancelarEdicao}>Cancelar</button>
            </div>
          ) : (
            <div>

              <div id="mensagem" style={{ overflowWrap: 'break-word' }}>{mensagem}</div>
              <span
                role="img"
                aria-label="Caneta"
                style={{ cursor: 'pointer', paddingLeft: '50px', wordWrap: 'break-word' }}
                onClick={iniciarEdicao}
              >
                ✏️
              </span>
            </div>
          )}
        </div>
        <div>
      <h2>Meu Calendário</h2>
      <Calendar
        onChange={onChangeData}
        value={dataSelecionada}
      />
    </div>
      </div>
      

    </div>
  );
}

export default App;
