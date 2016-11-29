import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm, {RequiredInput} from './TeamSignUp';

import { shallow, mount } from 'enzyme';

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

describe("<RequiredInput> component", () => {
  // beforeEach(() => {
  //   wrapper = shallow(<RequiredInput />);
  // }); 

  it("should show no message for valid input", () => {
    const wrapper = shallow(<RequiredInput value="abc" />)
    expect(wrapper.find('p').text.length).toEqual(0); 
  });

  it("should show proper error message for missing input", () => {
    const wrapper = shallow(<RequiredInput value="" />)
    expect(wrapper.find('p').props()).toEqual("we need to know your name");
    expect(wrapper.find('p').props()).toEqual("your password can't be blank"); 
  });

  it("should call updateParent function is called with the correct parameters", () => {

  });
}); 

describe("<PasswordConfirmationInput> component", () => {
  it("should show no error message for passwords that match", () => {

  });

  it("should show error message for passwords that do not match", () => {

  });
});


