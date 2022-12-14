import styled from "styled-components";
import { useState } from "react";
import { CheckedImage } from "../../components/CheckedImage";
import { useZorm } from "react-zorm";
import { userSchema, UserSchema } from "../../user/schemas/userSchema";
import useAxios from "axios-hooks";
import { ZodIssue } from "zod";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../components/ErrorMessage";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { signIn } from "next-auth/react";

export function SignUpForm() {
  const [isChecked, setIsChecked] = useState(true);

  const [{ data, loading }, execute] = useAxios<{ user: { id: number }; errors: ZodIssue[] }, UserSchema>(
    {
      url: "/api/signup",
      method: "POST",
    },
    {
      manual: true,
    },
  );

  const { ref, fields, errors, validation, validate } = useZorm("signup", userSchema, {
    customIssues: data?.errors,

    async onValidSubmit(event) {
      event.preventDefault();

      const { data } = await execute({
        data: event.data,
      });

      if (data.user) {
        toast(texts.submitSuccess, {
          style: {
            backgroundColor: "#3c9e3c",
            color: "#fff",
          },
          autoClose: 5000,
          progressStyle: {
            background: "#afdfaf",
          },
        });
        signIn("credentials", {
          username: event.data.email,
          password: event.data.password,
        });
      } else {
        toast(texts.submitFailure, {
          style: {
            backgroundColor: "#f11212",
            color: "#fff",
          },
          autoClose: 5000,
          progressStyle: {
            background: "#e2a8b2",
          },
        });
      }
    },
  });

  const disabled = validation?.success === false || loading;

  const texts = {
    title: "Inscreva-se e comece a aprender",
    submit: "Cadastre-se",
    alreadyHasAccount: "Já tem uma conta? Faça login",
    submitSuccess: "Conta criada com sucesso",
    submitFailure: "Houve um erro ao criar sua conta",
  };

  const SignUpFormContainer = styled.div`
    width: 400px;
    margin: 48px auto;
    padding: 48px 24px;

    .signup-title {
      margin-bottom: 16px;
      font-size: 16px;
    }

    .signup-field,
    .signup-button {
      width: 100%;
    }

    .signup-field {
      display: block;
      margin-bottom: 8px;
      padding: 20px 16px;
      border: 1px solid #1c1d1f;
      box-sizing: border-box;
      background-color: #f0f0f0;
    }

    .signup-field::placeholder {
      font-weight: 700;
      color: #1c1d1f;
    }

    .signup-field:focus {
      border-color: #5624d0;
    }

    .signup-field:disabled {
      border-color: #ccc;
    }

    .signup-button {
      border: none;
      padding: 12px 0;
      background-color: #a435f0;
      color: #fff;
      font-weight: 800;
      height: 48px;
    }

    .signup-button:hover:not(:disabled) {
      cursor: pointer;
      background-color: #8710d8;
    }

    .signup-button:disabled {
      border-color: #ccc;
      background-color: #ccc;
      cursor: auto;
    }

    .label-subscribe-to-email {
      display: flex;
      margin-top: 20px;
      border: none;
      padding: 8px 0;
      cursor: pointer;
      user-select: none;
    }

    .signup-field-checkbox {
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
    <SignUpFormContainer>
      <form noValidate ref={ref} className="contact-form">
        <h1 className="signup-title">{texts.title}</h1>
        <input type="text" placeholder="Nome completo" className={`signup-field ${errors.fullname("error")}`} name={fields.fullname()} disabled={loading} />
        {errors.fullname((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <input type="email" placeholder="E-mail" className={`signup-field ${errors.email("error")}`} name={fields.email()} disabled={loading} />
        {errors.email((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <input type="password" placeholder="Senha" className={`signup-field ${errors.password("error")}`} name={fields.password()} disabled={loading} />
        {errors.password((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <button type="submit" className="signup-button" disabled={disabled}>
          {loading ? <LoadingIndicator /> : texts.submit}
        </button>
        <label htmlFor="subscribe-to-email" className="signup-field label-subscribe-to-email">
          <input type="checkbox" className="signup-field-checkbox" id="subscribe-to-email" onChange={() => setIsChecked(!isChecked)} />
          <CheckedImage width={20} height={20} checked={isChecked} />
          <span className="subscribe-text">Quero receber ofertas especiais, recomendações personalizadas e dicas de aprendizado.</span>
        </label>
        <div className="separator"></div>
        <div className="footer-form">
          <span className="footer-form-text">
            {`${texts.alreadyHasAccount.split("?")[0]}?`}
            <a href="/api/auth/signin" className="footer-form-link">
              {texts.alreadyHasAccount.split("?")[1]}
            </a>
          </span>
        </div>
      </form>
    </SignUpFormContainer>
  );
}
