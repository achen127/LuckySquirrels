import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm from './TeamSignUp';
import { EmailInput, BirthdayInput, RequiredInput } from './TeamSignUp';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

describe('email input', () => {

  it('should have correct format and no error messages', () => {
    const wrapper = shallow(<EmailInput value="handle@something.com" />);
    expect(wrapper.find('p').length).toEqual(0);
  });

  it('should have incorrect format and 1 error messages', () => {
    const wrapper = shallow(<EmailInput value="notAnEmail" />);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual("this is not a valid email address");
  });

  it('should be empty and have 1 error message', () => {
    const wrapper = shallow(<EmailInput value="" />);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual("we need to know your email address");
  });

  sinon in progress
  it('update parent should be called with correct parameters', () => {
    const spyEmail = sinon.spy(EmailInput.prototype, 'updateParent');
    const wrapper = shallow(<EmailInput value="email@email.com" />);
    var param = spyEmail.getCall(0);
    var target = {
      'email': {
        value: 'email@email.com',
        valid: 'true'
      }
    };

    expect(param).toEqual(target);
  });
});

describe('Birthday input', () => {

  it('should have ISO date format and no error message', () => {
    const wrapper = shallow(<BirthdayInput value="2000-03-25" />) // render email input
    expect(wrapper.find('p').length).toEqual(0);
  });
  it('should have short date format and no error message', () => {
    const wrapper = shallow(<BirthdayInput value="03/25/2000" />) // render email input
    expect(wrapper.find('p').length).toEqual(0);
  });
  it('should have long date format and no error message', () => {
    const wrapper = shallow(<BirthdayInput value="Mar 25 2000" />) // render email input
    expect(wrapper.find('p').length).toEqual(0);
  })
  it('should have full date format and no error message', () => {
    const wrapper = shallow(<BirthdayInput value="Wednesday March 25 2000" />) // render email input
    expect(wrapper.find('p').length).toEqual(0);
  })
  it('should have wrong format and 1 error message', () => {
    const wrapper = shallow(<BirthdayInput value="March" />)
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual("that isn't a valid date");
  });

  it('should be empty and 1 error message', () => {
    const wrapper = shallow(<BirthdayInput value="" />)
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual("we need to know your birthdate");
  });

  describe('years', () => {
    it('should greater than or equal to 13 years ago and have no error message', () => {
      const wrapper = shallow(<BirthdayInput value="03/25/2003" />)
      expect(wrapper.find('p').length).toEqual(0);
    });
    it('should be less than 13 years ago and have an error message', () => {
      const wrapper = shallow(<BirthdayInput value="2004" />)
      expect(wrapper.find('p').length).toEqual(1);
      expect(wrapper.find('p').text()).toEqual("sorry, you must be at least 13 to sign up");
    });
  });
});

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