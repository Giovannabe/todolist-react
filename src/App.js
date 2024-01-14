import React, { useState, Fragment, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import axios from 'axios';

Modal.setAppElement('#root');

function App() {

   //evento do tempo
  const [location, setLocation] = useState(false);
  const [weather, setWeather]  = useState(false);

  let getWeather = async (lat, long) => {
     let res = await axios.get("https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=-22.0675&lon=-46.5649&zoom=5" , {
      params: {
        lat: lat,
        long: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
     });
     setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  // evento do calendario
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDates, setEventDates] = useState([]);
  const handleDateChange = (date) => {
    setDate(date);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEvent('');
  };

  const handleEventChange = (e) => {
    setEvent(e.target.value);
  };

  const handleAddEvent = () => {
    if (event.trim() !== '') {
      setEvents([...events, { date, event }]);
      setEventDates((prevEventDates) => [...prevEventDates, date]);
    }
    
    closeModal();
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };
  

  // evento de mudança de foto de perfil
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

  // evento de mudança de lembrete do dia
  const [mensagem, setMensagem] = useState('Clique na caneta para editar a mensagem.');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [novaMensagem, setNovaMensagem] = useState('');
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

// evento de mudança de lembrete do dia
const [mensagem2, setMensagem2] = useState('Clique na caneta para editar a mensagem.');
const [modoEdicao2, setModoEdicao2] = useState(false);
const [novaMensagem2, setNovaMensagem2] = useState('');
const iniciarEdicao2 = () => {
  setModoEdicao2(true);
};

const salvarEdicao2 = () => {
  setMensagem2(novaMensagem2);
  setModoEdicao2(false);
  setNovaMensagem2('');
};

const cancelarEdicao2 = () => {
  setModoEdicao2(false);
  setNovaMensagem2('');
};

// evento da lista
const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // inicio
  return (
    <div className="tudo">

     <div className='primeiro'>
      <img src='imagens/my.png' alt='immmm'/>
    
      <img src='imagens/login.jpg' alt='immm'/>

      <img src='imagens/my.png' alt='imm'/>

      <img src='imagens/my.png' alt='imm'/>

      <img src='imagens/my.png' alt='imm'/>

      <img src='imagens/my.png' alt='imm'/>

      <img src='imagens/my.png'  alt='immm'/>

    <Fragment>
        <h3>Clima (Exemplo)</h3>
        <hr/>
        <ul>
          <li>Temperatura atual: x°</li>
          <li>Temperatura Max: x°</li>
          <li>Temperatura Min: x°</li>
        </ul>

      </Fragment> 

     </div>
     

      <div className="lado">
        <div className='bordaperfil'>
        <div className='fotoperfil' style={{ display: 'flex', alignItems: 'center' }}>
          {imagemPerfil && (
            <img
              src={imagemPerfil}
              alt="Imagem de Perfil"
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
       </div>
        <div className='lembretes'>
          <h2>Lembrete do dia</h2>
          {modoEdicao ? (
            <div>
              <input
                maxLength={60}
                className='mensagemm'
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

        <div className='lembretes'>
          <h2>Lembrete da semana</h2>
          {modoEdicao2 ? (
            <div>
              <input
                maxLength={60}
                className='mensagemm'
                type="text"
                value={novaMensagem2}
                onChange={(e) => setNovaMensagem2(e.target.value)}
              />
              <button className="botao-salvar" onClick={salvarEdicao2}>Salvar</button>
              <button className="botao-cancelar" onClick={cancelarEdicao2}>Cancelar</button>
            </div>
          ) : (
            <div>

              <div id="mensagem" style={{ overflowWrap: 'break-word' }}>{mensagem2}</div>
              <span
                role="img"
                aria-label="Caneta"
                style={{ cursor: 'pointer', paddingLeft: '50px', wordWrap: 'break-word' }}
                onClick={iniciarEdicao2}
              >
                ✏️
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='outrolado'>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileClassName={({ date, view }) =>
            eventDates.some((eventDate) => date.getDate() === eventDate.getDate()) && view === 'month'
              ? 'react-calendar__tile--hasEvent'
              : null
          }
        />

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Adicionar Evento"
          className="modal"
        >
          <h2>Adicionar Evento</h2>
          <div>
            <p>Data selecionada: {date.toLocaleDateString()}</p>
            <label>
              Evento:
              <input type="text" value={event} onChange={handleEventChange} />
            </label>
          </div>
          <div>
            <button onClick={handleAddEvent}>Adicionar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </Modal>
        <div>
          <div className='eventosdiv'>
          <h3>Eventos Adicionados:</h3>
          <ul className='cora'>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.date.toLocaleDateString()}</strong>: {event.event}
                <button className='deletar' onClick={() => handleDeleteEvent(index)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>

    <div className='outrolado2'>
      <h1>Planejamento do Dia</h1>

      <div className='listadia'>
      <input
      className='listaa'
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Digite uma tarefa"
        />
        <button className='bot' onClick={addTask}>Adicionar Tarefa</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className='listu'>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <span
              className="deleteTask"
              onClick={() => deleteTask(index)}
            >
              ❌
            </span>
          </li>
        ))}
      </ul>
      </div>
    </div>

  );
}

export default App;
