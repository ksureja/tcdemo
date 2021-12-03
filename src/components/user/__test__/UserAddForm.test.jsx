
import React from 'react';
import {render,screen ,fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserAddForm from '../UserAddForm';

test('render registration form',()=>{
    const  {getByTestId} = render(<UserAddForm />);
    const inoutElUsername = getByTestId('username');
    expect(inoutElUsername).toBeInTheDocument();

    const inoutElEmail = getByTestId('email');
    expect(inoutElEmail).toHaveAttribute("type", "email");
    expect(inoutElEmail).toBeInTheDocument();
})
test('check form is valid', () => {
    const  {getByTestId,queryByTestId} = render(<UserAddForm />);
    const inoutElUsername = getByTestId('username');
    fireEvent.change(inoutElUsername, { target: { value: "Test user" } });
    expect(inoutElUsername).toHaveValue("Test user");

    const inoutElEmail = getByTestId('email');
    fireEvent.change(inoutElEmail, { target: { value: "test@mail.com" } });
    expect(inoutElEmail).toHaveValue("test@mail.com");

    fireEvent.click(getByTestId('submitReg'));
 
    expect(queryByTestId("username-error-msg")).not.toBeInTheDocument();
    expect(queryByTestId("email-error-msg")).not.toBeInTheDocument();
  });

  test('pass invalid email to input value', () => {
    const  {getByTestId,queryByTestId} = render(<UserAddForm />);
    
    const inoutElEmail = getByTestId('email');
    fireEvent.change(inoutElEmail, { target: { value: "test" } });
    expect(inoutElEmail).toHaveValue("test");
 
    fireEvent.click(getByTestId('submitReg'));
    expect(queryByTestId("email-error-msg")).toBeInTheDocument();
    expect(queryByTestId("email-error-msg").textContent).toEqual("Please enter a valid email");
  });

  test('check form is invalid', () => {
    const  {getByTestId,queryByTestId} = render(<UserAddForm />);

    fireEvent.click(getByTestId('submitReg'));
 
    const inoutElUsername = getByTestId("username");
    userEvent.type(inoutElUsername, "");
    expect(inoutElUsername).toHaveTextContent("");
    
    expect(queryByTestId("username-error-msg")).toBeInTheDocument();
    expect(queryByTestId("username-error-msg").textContent).toEqual("Please enter username");
 
    const inoutElEmail = getByTestId("email");
    userEvent.type(inoutElEmail, "");
    expect(inoutElEmail).toHaveTextContent("");
    
    expect(queryByTestId("email-error-msg")).toBeInTheDocument();
    expect(queryByTestId("email-error-msg").textContent).toEqual("Please enter email");
  });

