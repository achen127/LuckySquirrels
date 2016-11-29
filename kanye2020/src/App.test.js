import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {EmailInput, BirthdayInput} from './TeamSignUp';

import {shallow} from 'enzyme';
import sinon from 'sinon';

describe('email input', () => {

    it('should have correct format and no error messages', () => {
       const wrapper = shallow(<EmailInput value="handle@something.com" />);
       expect(wrapper.find('p').length).toEqual(0);
    });

    it('should have incorrect format and 1 error messages', () => {
      const wrapper = shallow(<EmailInput value="notAnEmail"/>);
      expect(wrapper.find('p').length).toEqual(1);
      expect(wrapper.find('p').text()).toEqual("this is not a valid email address");
    });

  it('should be empty and have 1 error message', () => {
      const wrapper = shallow(<EmailInput value=""/>);
      expect(wrapper.find('p').length).toEqual(1);
      expect(wrapper.find('p').text()).toEqual("we need to know your email address");
  });

  sinon in progress
  it('update parent should be called with correct parameters',() => {
    const spyEmail = sinon.spy(EmailInput.prototype, 'updateParent');
    const wrapper = shallow(<EmailInput value="email@email.com"/>);
    var param = spyEmail.getCall(0);
    var target =  {
      'email': {
        value: 'email@email.com',
        valid: 'true'
      }
    };

    expect(param).toEqual(target);
  });

describe('Birthday input', () => {

  it('should have ISO date format and no error message',() => {
      const wrapper = shallow(<BirthdayInput value="2000-03-25"/>) // render email input
      expect(wrapper.find('p').length).toEqual(0);
  });
  it('should have short date format and no error message',() => {
      const wrapper = shallow(<BirthdayInput value="03/25/2000"/>) // render email input
      expect(wrapper.find('p').length).toEqual(0);
  });
  it('should have long date format and no error message',() => {
      const wrapper = shallow(<BirthdayInput value="Mar 25 2000"/>) // render email input
      expect(wrapper.find('p').length).toEqual(0);
  })
  it('should have full date format and no error message',() => {
      const wrapper = shallow(<BirthdayInput value="Wednesday March 25 2000"/>) // render email input
      expect(wrapper.find('p').length).toEqual(0);
  })
  it('should have wrong format and 1 error message', () => {
    const wrapper = shallow(<BirthdayInput value="March"/>)
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual("that isn't a valid date");
  });

  it('should be empty and 1 error message',() => {
    const wrapper = shallow(<BirthdayInput value=""/>)
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual("we need to know your birthdate");
  });

  describe('years', () => {
    it('should greater than or equal to 13 years ago and have no error message',() => {
      const wrapper = shallow(<BirthdayInput value="03/25/2003"/>)
      expect(wrapper.find('p').length).toEqual(0);
    });
    it('should be less than 13 years ago and have an error message',() => {
    const wrapper = shallow(<BirthdayInput value="2004"/>)
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual("sorry, you must be at least 13 to sign up");
    });
  });
});