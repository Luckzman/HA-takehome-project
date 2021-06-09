import React from 'react';
import { shallow } from 'enzyme';
import Card  from './';

it('renders without crashing', () => {
  const props = {
    item: {
      species: "Human",
      status: "Alive",
      gender: "Male",
      location: {name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20"},
      name: "Rick Sanchez",
      origin: {name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1"},
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  }
  const wrapper = shallow(<Card {...props} />);
  expect(wrapper).toHaveLength(1);
});