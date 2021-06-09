import React from 'react';
import { ReactComponent as Indicator } from '../../circle-solid.svg';
import './Card.scss';

interface IProps {
  name: string
  image: string
  species: string
  status: string
  location:  string
  origin: string
}

// This function returns the color of Status Indicator component depending on the status value from the endpoint
const characterStatus = (status: string): {color: string} => {
  switch (status) {
    case 'Alive':
      return {color: 'green'}
    case 'Dead':
      return {color: 'red'}
    default:
      return {color: 'grey'}
  }
}

const Card: React.FC<IProps> = ({image, name, status, species, location, origin}) => {
  return (
    <div className="card-container">
      <div className="card-img">
        <img src={image} alt="" />
      </div>
      <div className="card-info">
        <div className="card-group-item">
          <h3>{name}</h3>
          <div>
            <p><Indicator className="indicator" style={characterStatus(status)} /><span>{status}</span> - <span>{species}</span></p>
          </div>
        </div>
        <div className="card-group-item">
          <p className="card-title">Last known location:</p>
          <p>{location}</p>
        </div>
        <div className="card-group-item">
          <p className="card-title">First seen in:</p>
          <p>{origin}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
