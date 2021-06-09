import React from 'react';
import axios from 'axios';
import { Main } from './Component/Main';
import './App.css';

export interface IResult {
  results: {
      name: string
      image: string
      species: string
      status: string
      location: {
        name: string
      }
      origin: {
        name: string
      }
  }[],
  info: {
    count: number
    prev: string
    next: string
  }
}

// This function makes async call to fetch data from endpoint
const fetchData = async(apiUrl: string): Promise<IResult> => {
  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return error
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <h1>Rick and Monty</h1>
        <hr/>
        <Main fetchData={fetchData} />
      </div>
    </div>
  );
}

export default App;
