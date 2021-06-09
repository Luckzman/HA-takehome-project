/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Card from '../Card';
import { API_URL } from '../../constants'
import { IResult } from '../../App'
import './Main.scss';

interface IProps {
  fetchData: (apiUrl: string) => Promise<IResult>
}

let CACHE: Record<string, IResult> = {};

export const Main: React.FC<IProps> = ({fetchData}) => {
  const [result, setResult] = useState<IResult>({results: [], info: { count: 0, next: '', prev: ''}});
  const [page, setPage] = useState(1);

  // This function checks if data has been cached before making async call
  const getPageData = (page: number) => {
    if (CACHE[page] !== undefined) {
      setResult(CACHE[page]);
    }else{
      fetchData(API_URL(page)).then((data) => {
        if(data.info.count){
          CACHE[page] = data;
          setResult(data);
        }
      })
    }
  }

  // Loads data when component mount
  React.useEffect(() => {
    getPageData(page)
  }, [])

  // This function is called when the prev button is clicked
  const handlePrevPagination = () => {
    setPage(page - 1);
  }
  
  // This function is called when the next button is clicked
  const handleNextPagination = () => {
    setPage(page + 1);
  }

  // This hook runs when the page number changes.
  useEffect(() => {
    if(result.info.prev !== null || result.info.next !== null ) {
      getPageData(page)
    }
  }, [page])
  
  return (
    <>
      <div id="main" className="main">
        {result?.results.map((item, index) => 
          <Card 
            key={`a${index}`} 
            image={item.image} 
            name={item.name}
            status={item.status}
            species={item.species}
            location={item.location.name}
            origin={item.origin.name}
          />)}
      </div>
      <div className="paginate-container">
        {<button
          id="prevBtn"
          disabled={result.info.prev === null}
          className={`${result.info.prev === null ? 'disabled-cursor' : ''}`}
          onClick={handlePrevPagination}>Prev</button>}
        {<button 
          id="nextBtn"
          disabled={result.info.next === null}
          className={`${result.info.next === null ? 'disabled-cursor' : ''}`}
          onClick={handleNextPagination}>Next</button>}
      </div>
    </>
  )
}
