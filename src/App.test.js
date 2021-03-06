import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm, { RequiredInput, PasswordConfirmationInput, EmailInput, BirthdayInput } from './TeamSignUp';
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

  //sinon in progress
  it('update parent should be called with correct parameters', () => {
    const spyEmail = sinon.spy();
    const wrapper = shallow(<EmailInput updateParent={spyEmail}/>);
    const input = wrapper.find('#email');
    var expected = {
      'email': {
        value: 'e@e.com',
        valid: true
      }
    };

    input.simulate('change', {target:{value: "e@e.com"}})
    //input.simulate('change',{target:{value:{expected}}});
    expect(spyEmail.called).toEqual(true);
    var param = spyEmail.getCall(0).args[0];
     expect(param).toEqual(expected);
  });
});

describe('Birthday input', () => {

  it('should have ISO date format and no error message', () => {
    const wrapper = shallow(<BirthdayInput value="2000-03-25" />) 
    expect(wrapper.find('p').length).toEqual(0);
  });
  it('should have short date format and no error message', () => {
    const wrapper = shallow(<BirthdayInput value="03/25/2000" />) 
    expect(wrapper.find('p').length).toEqual(0);
  });
  it('should have long date format and no error message', () => {
    const wrapper = shallow(<BirthdayInput value="Mar 25 2000" />) 
    expect(wrapper.find('p').length).toEqual(0);
  })
  it('should have full date format and no error message', () => {
    const wrapper = shallow(<BirthdayInput value="Wednesday March 25 2000" />) 
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

    it('update parent should be called with correct parameters', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<BirthdayInput updateParent={spy}/>);
    const input = wrapper.find('#dob');
    var expected = {
        'dob': {
          value: "08/11/1997",
          valid: true
        }
      };

    input.simulate('change', {target:{value: "08/11/1997"}})
    expect(spy.called).toEqual(true);
    var param = spy.getCall(0).args[0];
     expect(param).toEqual(expected);
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

  it('checks button is disabled when email is blank', () => {
    const email = wrapper.find('#email');
    email.simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });
    it('checks button is disabled when email is invalid', () => {
    const email = wrapper.find('#email');
    email.simulate('change', { target: { value: 'sarah' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });

  it('checks button is disabled when name is invalid', () => {
    const name = wrapper.find('#name');
    name.simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });

  it('checks button is disabled when birthdate is blank', () => {
    const password = wrapper.find('#password');
    password.simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });

    it('checks button is disabled when birthdate is invalid', () => {
    const password = wrapper.find('#password');
    password.simulate('change', { target: { value: '11/20' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });

    it('checks button is disabled when birthdate is too young', () => {
    const password = wrapper.find('#password');
    password.simulate('change', { target: { value: '11/20/2013' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });

  it('checks button is disabled when password is blank', () => {
    const confirmPassword = wrapper.find('#passwordConf');
    confirmPassword.simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });

    it('checks button is disabled when password and confirm password don\'t match', () => {
    const password = wrapper.find('#password');
    const confirmPassword = wrapper.find('#passwordConf');
    password.simulate('change', { target: { value: 'password' } });
    confirmPassword.simulate('change', { target: { value: 'pass' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });

  it('checks button is disabled when confirm password is blank', () => {
    const birthdate = wrapper.find('#dob');
    birthdate.simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)

  });

  it('checks if submit is disabled when form is blank', () => {
    const name = wrapper.find('#name');
    name.simulate('change', { target: { value: '' } });
    const password = wrapper.find('#password');
    password.simulate('change', { target: { value: '' } });
    const confirmPassword = wrapper.find('#passwordConf');
    confirmPassword.simulate('change', { target: { value: '' } });
    const birthdate = wrapper.find('#dob');
    birthdate.simulate('change', { target: { value: '' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(true)
  })

  it('checks if submit is enabled when form is valid', () => {
    const email = wrapper.find('#email');
    email.simulate('change', { target: { value: 'sarahf95@gmail.com' } });
    const name = wrapper.find('#name');
    name.simulate('change', { target: { value: 'Sarah' } });
    const password = wrapper.find('#password');
    password.simulate('change', { target: { value: 'password' } });
    const confirmPassword = wrapper.find('#passwordConf');
    confirmPassword.simulate('change', { target: { value: 'password' } });
    const birthdate = wrapper.find('#dob');
    birthdate.simulate('change', { target: { value: '11/19/95' } });
    expect(wrapper.find('#submitButton').props().disabled).toEqual(false)
  })

  it('checks if alert appears when invalid form is submitted', () =>{
    const alert = wrapper.state().alertMessage;
    console.log(alert);
    expect(alert).toEqual(false);
  })

    it('checks if alert appears when valid form is submitted', () =>{
    const alert = wrapper.state().alertMessage;
    const form = wrapper.find('#form');
    form.simulate('submit');
    console.log(alert);
    expect(alert).toEqual(false);
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

 it("should show no message for valid input", () => {
   const wrapper = shallow(<RequiredInput value="abc" />)
   expect(wrapper.find('.error-missing').text.length).toEqual(0);
 });

 it("should show proper error message for missing input", () => {
   const wrapper = shallow(<RequiredInput value="" />)
   expect(wrapper.find('.error-missing').length).toEqual(1);
 });

 it("should call updateParent function with the correct parameters for name input", () => {
   const searchSpy = sinon.spy(); 
   const wrapper = shallow(<RequiredInput updateParent={searchSpy} id="name" field="name" type="text"
         label="Name" placeholder="your name"
         errorMessage="we need to know your name"/>);
   const nameInput = wrapper.find('input');

   var expectedName = {
     'name': {
       value: 'Jane Doe',
       valid: true
     }
   };

   nameInput.simulate('change', {target:{value: 'Jane Doe'}});
   expect(searchSpy.called).toEqual(true); 
   var param = searchSpy.getCall(0).args[0]; 
   expect(param).toEqual(expectedName);

 });

 it("should call updateParent function with the correct parameters for password input", () => {
   const searchSpy = sinon.spy(); 
   const wrapper = shallow(<RequiredInput updateParent={searchSpy} id="password" field="password" type="password"
         label="Password" placeholder=""
         errorMessage="your password can't be blank" />); 
   const passwordInput = wrapper.find('input');

   var expectedPassword = {
     'password': {
       value: 'abc', 
       valid: true
     }
   };

   passwordInput.simulate('change', {target:{value:'abc'}}); 
   expect(searchSpy.called).toEqual(true); 
   var param = searchSpy.getCall(0).args[0]; 
   expect(param).toEqual(expectedPassword); 
 });
});

describe("<PasswordConfirmationInput> component", () => {
  
 it("should show no error message for passwords that match", () => {
   const wrapper = shallow(<PasswordConfirmationInput value="123" password="123" />);
   expect(wrapper.find('.error-mismatched').length).toEqual(0); 
 });

 it("should show error message for passwords that do not match", () => {
   const wrapper = shallow(<PasswordConfirmationInput value="123" password="1234" />);
   expect(wrapper.find('.error-mismatched').length).toEqual(1); 
 });

 it("should call updateParent function with the correct parameters", () => {
   const searchSpy = sinon.spy(); 
   const wrapper = shallow(<PasswordConfirmationInput updateParent={searchSpy} value='abc' password='abc' />); 
   const passwordConfInput = wrapper.find('#passwordConf');

   var expectedPasswordConf = {
     'passwordConf': {
       value: 'abc', 
       valid: true
     }
   };

   passwordConfInput.simulate('change', {target:{value:'abc'}}); 
   expect(searchSpy.called).toEqual(true); 
   var param = searchSpy.getCall(0).args[0]; 
   expect(param).toEqual(expectedPasswordConf); 
 });
});