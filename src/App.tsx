import { useCallback, useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

interface Advice{
  id: number;
  advice: string;
}

function App() {

  const [nome, setNome] = useState<String>();
  const [advice, setAdvice] = useState<String>();

  const getData = useCallback( async()=> {
    await axios.get('https://api.adviceslip.com/advice')
    .then(function (response) {
     console.log(response.data);
     setAdvice(response.data.slip.advice);
    })
    .catch(function (error) {
      console.error(error);
    })
  }, [])

  useEffect(()=>{
    getData();
  }, [])

  const defName = (nome: string) => {
    setNome(nome);
  }

  return (
    <div>
      <strong>Ola {nome}</strong>

      <strong>{advice}</strong>
      <button onClick={() => defName('Tomate')}>Tomate</button>
      <button onClick={() => defName('Batata')}>Batata</button>
      <button onClick={() => defName('Beterraba')}>Beterraba</button>

    </div>
  )
}

export default App
