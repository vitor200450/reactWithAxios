import { useCallback, useEffect, useState } from 'react';
import './App.css'
import axios, { AxiosError } from 'axios';

interface Advice{
  id: number;
  advice: string;
}

function App() {

  const [nome, setNome] = useState<String>();
  const [advice, setAdvice] = useState<String>();
  
  const [personagem, setPersonagem] = useState<String>();
  const [nomePesquisa, setNomePesquisa] = useState<String>();

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

  const getSWData = useCallback( async() => {
    await axios.get('https://swapi.py4e.com/api/people/1/')
    .then((resp) => {
      console.log(resp.data.name);
      setPersonagem(resp.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

  useEffect(()=>{
    getSWData();
  }, [])

  const defName = (nome: string) => {
    setNome(nome);
  }

  return (
    <div>
      <strong>Olá {personagem && personagem.name}!</strong>
      <div>
        <strong>Características:<br></br></strong>

        <div className='characteristics'>
          <strong>Cor do cabelo: {personagem && personagem.hair_color}</strong>
          <strong>Cor de pele: {personagem && personagem.skin_color}</strong>
          <strong>Cor do olho: {personagem && personagem.eye_color}</strong>
          <strong>Ano de nascimento: {personagem && personagem.birth_year}</strong>
          <strong>Gênero: {personagem && personagem.gender}</strong> 
        </div>
        
      </div>
      <button onClick={() => defName('Tomate')}>Tomate</button>
      <button onClick={() => defName('Batata')}>Batata</button>
      <button onClick={() => defName('Beterraba')}>Beterraba</button>



    </div>
  )
}

export default App
