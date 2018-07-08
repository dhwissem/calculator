import React  from 'react'
import Button from './button.js'

import { shallow } from 'enzyme'

describe('<Button />', () => {
  let wrapper, spy;

  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow(<Button onClick={spy}>5</Button>);
  });

  it('renders the button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('renders a button value', () => {
    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('renders a prop value of the button that passed to button comp', () => {
    expect(wrapper.find('button').text()).toBe('5');
  });
});
