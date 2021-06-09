import React from 'react';
import { shallow } from 'enzyme';
import { Main } from './';


describe('Main Component', () => {
  let wrapper;
  let useEffect;
  let props;

  let mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  const results = [{
    species: "Human",
    status: "Alive",
    gender: "Male",
    location: {name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20"},
    name: "Rick Sanchez",
    origin: {name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1"},
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  },
  {
    species: "Human",
    status: "Alive",
    gender: "Male",
    location: {name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20"},
    name: "Rick Sanchez",
    origin: {name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1"},
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  }];

  const info = {
    count: 671,
    next: "https://rickandmortyapi.com/api/character?page=2",
    pages: 34,
    prev: null
  }

  let result = {
    results,
    info
  }
    beforeEach(() => {
      useEffect = jest.spyOn(React, "useEffect");
      props = {
        fetchData: jest.fn().mockResolvedValue(result)
      }
      mockUseEffect();
      mockUseEffect();
      wrapper = shallow(<Main {...props} />);
    })
    describe('on start', () => {
      it('loads the cards', () => {
        expect(props.fetchData).toHaveBeenCalled();
      })
      it('should render cards', () => {
        expect(wrapper.find('Card')).toHaveLength(2);
        const firstCard = wrapper.find("Card").first();
        expect(firstCard.prop('name')).toEqual('Rick Sanchez');
        expect(firstCard.prop('status')).toEqual('Alive');
      })
    })
    describe('on paginate', () => {
      beforeEach(() => {
        mockUseEffect();
        mockUseEffect();
      })
      it('paginate when next button is clicked', () => {
        wrapper.find('#nextBtn').simulate('click')
        expect(props.fetchData).toHaveBeenCalled()
      })
      it('paginate when prev button is clicked', () => {
        wrapper.find('#prevBtn').simulate('click')
        expect(props.fetchData).toHaveBeenCalled()
      })
    })
})
