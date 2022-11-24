import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Validate } from "../services/validate";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export interface Payload {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

function ErrorMessage({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return <span className="error">{message}</span>;
}

export function ContactForm() {
  const [formState, setFormState] = useState(initialValues);
  const [isDirty, setIsDirty] = useState(false);

  const { name, email, phoneNumber, message } = formState;

  useEffect(() => {
    if (name || email || phoneNumber || message) {
      setIsDirty(true);
    }
  }, [name]);

  const hasErrors = Validate({ name, email, phoneNumber, message });

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsDirty(true);

    if (hasErrors.length === 0) {
      const form = new FormData();

      form.append("name", formState.name);
      form.append("email", formState.email);
      form.append("phone-number", formState.phoneNumber);
      form.append("message", formState.message);

      console.log("Submission started");

      try {
        await fetch("https://getform.io/f/488e79f5-a724-4d29-bca2-4e1b6ab3eb09", {
          method: "POST",
          mode: "cors",
          body: form,
        });

        alert("Formulário enviado com sucesso!");
        setFormState(initialValues);
      } catch (error) {
        console.log(error);
        alert("Houve um erro ao enviar o formulário");
      }
    }
  }

  return (
    <ContactFormContainer>
      <h2 className="form-title">Entre em contato conosco</h2>
      <form method="POST" className="contact-form" noValidate onSubmit={(event) => submitForm(event)}>
        <div className="row">
          <div className="field-container">
            <input
              type="text"
              name="fullname"
              placeholder="Nome"
              id="fullname"
              className="field"
              value={formState.name}
              onChange={(event) => setFormState({ ...formState, name: event.target.value })}
            />
            {hasErrors
              .filter((validation) => validation.target === "name")
              .map((item) => (
                <ErrorMessage key={item.id} message={isDirty ? item.validationError : null} />
              ))}
          </div>
        </div>

        <div className="row">
          <div className="field-container email-container">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              id="email"
              className="field"
              value={formState.email}
              onChange={(event) => setFormState({ ...formState, email: event.target.value })}
            />
            {hasErrors
              .filter((validation) => validation.target === "email")
              .map((item) => (
                <ErrorMessage key={item.id} message={isDirty ? item.validationError : null} />
              ))}
          </div>

          <div className="field-container phone-number-container">
            <input
              type="tel"
              name="phone-number"
              placeholder="Telefone"
              id="phone-number"
              className="field"
              value={formState.phoneNumber}
              onChange={(event) => setFormState({ ...formState, phoneNumber: event.target.value })}
            />
            {hasErrors
              .filter((validation) => validation.target === "phoneNumber")
              .map((item) => (
                <ErrorMessage key={item.id} message={isDirty ? item.validationError : null} />
              ))}
          </div>
        </div>

        <div className="row">
          <textarea
            name="message"
            id="message"
            className="field"
            placeholder="Mensagem"
            rows={3}
            value={formState.message}
            onChange={(event) => setFormState({ ...formState, message: event.target.value })}
          />
        </div>
        {hasErrors
          .filter((validation) => validation.target === "message")
          .map((item) => (
            <ErrorMessage key={item.id} message={isDirty ? item.validationError : null} />
          ))}
        <div className="row">
          <button type="submit" className="submit-button">
            Enviar
          </button>
        </div>
      </form>
    </ContactFormContainer>
  );
}

const ContactFormContainer = styled.div`
  width: 85%;
  margin: 48px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);

  .contact-form {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }

  .form-title {
    font-size: 32px;
    font-family: udemy sans, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
  }

  .field {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px 18px;
    outline: none;
    box-sizing: border-box;
  }

  .row:not(:first-child) {
    margin-top: 12px;
  }

  .field-container {
    width: 100%;
  }

  .field:focus {
    border-color: #5624d0;
  }

  .submit-button {
    background-color: #5624d0;
    color: #fff;
    padding: 12px 18px;
    margin-top: 12px;
    border: none;
    border-radius: 4px;
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    font-family: udemy sans, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
    outline: none;
  }

  .submit-button:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  #message {
    resize: none;
  }

  /* Mobile */
  @media (max-width: 500px) {
    #email {
      margin-bottom: 12px;
    }

    .form-title {
      text-align: center;
    }
  }

  /* Desktop */
  @media (min-width: 500px) {
    .row {
      display: flex;
    }

    .email-container {
      margin-right: 12px;
      flex: 3;
    }

    .phone-number-container {
      flex: 2;
    }

    .form-title {
      text-align: left;
    }

    .error {
      color: #f11212;
      font-size: 10px;
    }
  }
`;
