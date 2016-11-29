import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm from './TeamSignup';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';


// Form submit button tests
describe('Submit Form Button', () => {
  var wrapper;

  beforeEach(() => {
    wrapper = mount(<SignUpForm />);
    console.log(wrapper.find('#submitButton').props());
    console.log(wrapper.find('#submitButton').props().disabled)
  })



  // it('checks button is invald when name is invalid', () => {
  //   const name = wrapper.find('#name');
  //   name.simulate('change', { target: { value: '' } });
  //   expect(wrapper.find('#submitButton').props().disabled).toEqual(false)

  // });

  // it('checks button is invald when birthdate is invalid', () => {
  //   const password = wrapper.find('#password');
  //   password.simulate('change', { target: { value: '' } });
  //   expect(wrapper.find('#submitButton').props().disabled).toEqual(false)

  // });

  // it('checks button is invald when password is invalid', () => {
  //   const confirmPassword = wrapper.find('#passwordConf');
  //   confirmPassword.simulate('change', { target: { value: '' } });
  //   expect(wrapper.find('#submitButton').props().disabled).toEqual(false)

  // });

  // it('checks button is invald when confirm password is invalid', () => {
  //   const birthdate = wrapper.find('#dob');
  //   birthdate.simulate('change', { target: { value: '' } });
  //   expect(wrapper.find('#submitButton').props().disabled).toEqual(false)

  // });

  //   it('checks if submit is enabled when form is blank', () => {
  //   const name = wrapper.find('#name');
  //   name.simulate('change', { target: { value: '' } });
  //   const password = wrapper.find('#password');
  //   password.simulate('change', { target: { value: '' } });
  //   const confirmPassword = wrapper.find('#passwordConf');
  //   confirmPassword.simulate('change', { target: { value: '' } });
  //   const birthdate = wrapper.find('#dob');
  //   birthdate.simulate('change', { target: { value: '' } });
  //   expect(wrapper.find('#submitButton').props().disabled).toEqual(false)
  // })

  it('checks if submit is enabled when form is valid', () => {
    const name = wrapper.find('#name');
    name.simulate('change', { target: { value: 'Sarah' } });
    const password = wrapper.find('#password');
    password.simulate('change', { target: { value: 'password' } });
    const confirmPassword = wrapper.find('#passwordConf');
    confirmPassword.simulate('change', { target: { value: 'password' } });
    const birthdate = wrapper.find('#dob');
    birthdate.simulate('change', { target: { value: '11/19/95' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)
  })

});