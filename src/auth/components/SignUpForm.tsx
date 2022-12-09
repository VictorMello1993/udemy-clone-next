import styled from "styled-components";
import { IoCheckboxSharp } from "react-icons/io5";
import { useState } from "react";

export function SignUpForm() {
  const [isChecked, setIsChecked] = useState(false);

  function handleOnChange() {
    console.log("executando...");
    setIsChecked(!isChecked);
    console.log(isChecked);
  }

  return (
    <SignUpFormContainer>
      <form noValidate>
        <h1 className="signup-title">Inscreva-se e comece a aprender</h1>
        <input type="text" placeholder="Nome completo" className="signup-field" />
        <input type="email" placeholder="E-mail" className="signup-field" />
        <input type="password" placeholder="Senha" className="signup-field" />
        <button type="submit" className="signup-button">
          Cadastre-se
        </button>
        <label htmlFor="subscribe-to-email" className="signup-field label-subscribe-to-email">
          <input type="checkbox" className="signup-field-check" id="subscribe-to-email" name="subscribeToEmail" onChange={handleOnChange} checked={isChecked} />
          {isChecked ? <IoCheckboxSharp className="checked-icon" size={40} /> : null}
          <span className="subscribe-text">Quero receber ofertas especiais, recomendações personalizadas e dicas de aprendizado.</span>
        </label>
        <div className="separator"></div>
        <div className="footer-form">
          <span className="footer-form-text">
            Já tem uma conta?{" "}
            <a href="/" className="footer-link">
              Faça login
            </a>
          </span>
        </div>
      </form>
    </SignUpFormContainer>
  );
}

const SignUpFormContainer = styled.div`
  width: 400px;
  margin: 48px auto;
  padding: 48px 24px;

  .signup-title {
    margin-bottom: 16px;
    font-size: 16px;
    font-family: udemy sans, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
  }

  .signup-field,
  .signup-button {
    width: 100%;
  }

  .signup-field {
    margin-bottom: 8px;
    padding: 20px 16px;
    outline: none;
    border: 1px solid #1c1d1f;
    display: block;
    box-sizing: border-box;
    background-color: #f0f0f0;
  }

  .signup-field::placeholder {
    font-weight: 700;
    color: #1c1d1f;
  }

  .signup-button {
    border: none;
    padding: 12px 0;
    background-color: #a435f0;
    color: #fff;
    font-weight: 800;
    height: 48px;
  }

  .signup-button:hover {
    cursor: pointer;
    background-color: #8710d8;
  }

  .label-subscribe-to-email {
    display: flex;
    margin-top: 20px;
    border: none;
    padding: 8px 0;
    cursor: pointer;
  }

  .signup-field-check {
    margin: 0;
    appearance: none;
    -webkit-appearance: none;
    height: 40px;
    width: 40px;
    box-sizing: border-box;
    border: 1px solid #000;
  }

  .subscribe-text {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;
    flex: 1;
  }

  .separator {
    border-top: 1px solid #aeb1b5;
    margin: 16px 0;
  }

  .footer-form {
    margin-top: px;
    display: flex;
    justify-content: center;
  }

  .footer-form-text {
    font-size: 14px;
  }
`;
