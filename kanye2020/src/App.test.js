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



describe("Reset button", () => {

  let wrapperForm;
  let resetButton;

  beforeEach(() => {
    wrapperForm = mount(<SignUpForm />);
    resetButton = wrapperForm.find('#resetButton');
  });

  it("should clear email form", () => {
    const emailInput = wrapperForm.find('#email');
    emailInput.simulate('change', { target: { value: 'a@a.com' } });
    expect(emailInput.props().value).toEqual('a@a.com');
    resetButton.simulate('click');
    expect(emailInput.props().value).toEqual('');
  });

  it("should clear name form", () => {
    const nameInput = wrapperForm.find('#name');
    nameInput.simulate('change', { target: { value: 'Jane Doe' } });
    expect(nameInput.props().value).toEqual('Jane Doe');
    resetButton.simulate('click');
    expect(nameInput.props().value).toEqual('');
  });

  it("should clear birthday form", () => {
    const birthInput = wrapperForm.find('#dob');
    birthInput.simulate('change', { target: { value: '10/10/1990' } });
    expect(birthInput.props().value).toEqual('10/10/1990');
    resetButton.simulate('click');
    expect(birthInput.props().value).toEqual('');
  });

  it("should clear first password form", () => {
    const passInput = wrapperForm.find('#password');
    passInput.simulate('change', { target: { value: '123456' } });
    expect(passInput.props().value).toEqual('123456');
    resetButton.simulate('click');
    expect(passInput.props().value).toEqual('');
  });

  it("should clear confirm password form", () => {
    const confirmInput = wrapperForm.find('#passwordConf');
    confirmInput.simulate('change', { target: { value: '123456' } });
    expect(confirmInput.props().value).toEqual('123456');
    resetButton.simulate('click');
    expect(confirmInput.props().value).toEqual('');
  });

});



