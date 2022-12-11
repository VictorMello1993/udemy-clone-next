import styled from "styled-components";
import { userSchema, UserSchema } from "../schemas/userSchema";
import useAxios from "axios-hooks";
import { useZorm } from "react-zorm";

export function SignInForm() {
  const [{}, execute] = useAxios<UserSchema, UserSchema>(
    {
      url: "/api/signin",
      method: "POST",
    },
    {
      manual: true,
    },
  );

  const { ref, fields, errors, validation } = useZorm("signin", userSchema, {
    onValidSubmit(event) {
      event.preventDefault();
      console.log(event.data);
      // execute({
      //   data: event.data,
      // });
    },
  });

  const disabled = validation?.success === false;

  const texts = {
    title: "Faça login na sua conta da Udemy",
    submit: "Fazer login",
    alreadyHasAccount: "Ainda não tem uma conta? Inscreva-se",
  };

  function ErrorMessage({ message }: { message: string }) {
    console.log(message);
    if (!message) {
      return null;
    }

    return <span className="error-message">{message}</span>;
  }

  const SignInFormContainer = styled.div`
    width: 400px;
    margin: 48px auto;
    padding: 48px 24px;

    .signin-title {
      margin-bottom: 16px;
      font-size: 16px;
      font-family: udemy sans, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
    }

    .signin-field,
    .signin-button {
      width: 100%;
      outline: none;
    }

    .signin-field {
      margin-bottom: 8px;
      padding: 20px 16px;
      outline: none;
      border: 1px solid #1c1d1f;
      display: block;
      box-sizing: border-box;
      background-color: #f0f0f0;
    }

    .signin-field::placeholder {
      font-weight: 700;
      font-family: udemy sans, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
      color: #1c1d1f;
    }

    .signin-field:focus {
      border-color: #5624d0;
    }

    .signin-button {
      border: none;
      padding: 12px 0;
      background-color: #a435f0;
      color: #fff;
      font-weight: 800;
      height: 48px;
    }

    .signin-button:disabled {
      border-color: #ccc;
      background-color: #ccc;
    }

    .signin-button:hover {
      cursor: pointer;
      background-color: #8710d8;
    }

    .label-subscribe-to-email {
      display: flex;
      margin-top: 20px;
      border: none;
      padding: 8px 0;
      cursor: pointer;
      user-select: none;
    }

    .signin-field-checkbox {
      margin: 0;
      appearance: none;
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      box-sizing: border-box;
      border: 1px solid #000;
      display: none;
    }

    .subscribe-text {
      display: inline-block;
      margin-left: 5px;
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
      margin-top: 8px;
      display: flex;
      justify-content: center;
    }

    .footer-form-text {
      font-size: 14px;
    }

    .footer-form-link {
      color: #5624d0;
      text-underline-offset: 4px;
      font-weight: 700;
    }

    .footer-form-link:hover {
      color: #401b9c;
    }

    .error {
      border-color: #f11212;
    }

    .error-message {
      color: #f11212;
      font-size: 10px;
      display: block;
      margin-bottom: 16px;
    }
  `;

  return (
    <SignInFormContainer>
      <form noValidate ref={ref}>
        <h1 className="signin-title">{texts.title}</h1>
        <input type="email" placeholder="E-mail" className={`signin-field ${errors.email("error")}`} name={fields.email()} />
        {errors.email((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <input type="password" placeholder="Senha" className={`signin-field ${errors.password("error")}`} name={fields.password()} />
        {errors.password((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <button type="submit" className="signin-button" disabled={disabled}>
          {texts.submit}
        </button>
        <div className="footer-form">
          <span className="footer-form-text">
            {`${texts.alreadyHasAccount.split("?")[0]}?`}
            <a href="/" className="footer-form-link">
              {texts.alreadyHasAccount.split("?")[1]}
            </a>
          </span>
        </div>
      </form>
    </SignInFormContainer>
  );
}
