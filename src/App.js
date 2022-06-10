import './App.css';
import {fetchTicketsOf} from './api/UseCaver';
import {useState} from 'react';

function App() {
  const [tickets,setTickets] = useState([])

   const getMyTicekts = async () =>{
    const Tickets= await fetchTicketsOf('0xbC14CB49b93Ee36AfdF4b49eCB7C9512f9353c93');
    setTickets(Tickets);
  }
  return (
    <div className="App">
      <button onClick={()=>{getMyTicekts()}}>test</button>
      <div>{tickets.map((el)=>{
        return <div key={el.id}>{el.name}</div>
      })}</div>
    </div>
  );
}

export default App;
