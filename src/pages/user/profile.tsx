import * as userRepository from "../../user/userRepository";
import type { GetServerSideProps } from "next";
import styled from "styled-components";
import { getServerSession } from "../../auth/getServerSession";
import { Header } from "../../layout/Header";
import { useValue, useZorm, Value } from "react-zorm";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useState } from "react";
import useAxios from "axios-hooks";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { z, ZodIssue } from "zod";
import { updateUserSchema, UpdateUserSchema } from "../../user/schemas/updateUserSchema";
import { toast } from "react-toastify";

type ProfilePageProps = {
  user: userRepository.User;
};

export default function ProfilePage({ user: { fullname, email, id } }: ProfilePageProps) {
  const [fullnameState, setFullname] = useState(fullname);
  const [emailState, setEmail] = useState(email);
  const [idState, setId] = useState(id.toString());

  const texts = {
    submit: "Salvar",
    submitSuccess: "Dados alterados com sucesso",
    submitFailure: "Houve um erro ao atualizar o seu perfil",
  };

  const [{ data, loading }, execute] = useAxios<{ user: { id: number; fullname: string; email: string }; errors: ZodIssue[] }, UpdateUserSchema>(
    {
      url: "/api/user/profile",
      method: "PUT",
    },
    {
      manual: true,
    },
  );

  const { fields, errors, validation, ref } = useZorm("profile", updateUserSchema, {
    customIssues: data?.errors,
    async onValidSubmit(event) {
      event.preventDefault();
      const result = await execute({
        data: event.data,
      });

      if (!result.data.errors) {
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

  return (
    <>
      <Header />
      <h1 className="profile-title" style={{ textAlign: "center", marginTop: "20px" }}>{`Bem vindo, ${fullname}!`}</h1>
      <ProfilePageFormContainer>
        <h2 className="profile-form-title">Perfil do usuário</h2>
        <span className="profile-form-secondary-title">Adicione informações sobre você</span>
        <form noValidate className="profile-form" ref={ref}>
          <section className="form-group">
            <fieldset className="form-group-fs">
              <legend className="fs-legend">Dados básicos</legend>
              <input
                type="text"
                placeholder="Id"
                className={`profile-field ${errors.fullname("error")}`}
                value={idState}
                name={fields.id()}
                style={{ display: "none" }}
                disabled={loading}
                onChange={(event) => setId(event.target.value)}
              />
              <input
                type="text"
                placeholder="Nome completo"
                className={`profile-field ${errors.fullname("error")}`}
                value={fullnameState}
                name={fields.fullname()}
                onChange={(event) => setFullname(event.target.value)}
                disabled={loading}
              />
              {errors.fullname((error) => (
                <ErrorMessage message={error.message} />
              ))}
              <input
                type="email"
                placeholder="E-mail"
                className={`profile-field ${errors.fullname("error")}`}
                value={emailState}
                name={fields.email()}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
              />
              {errors.email((error) => (
                <ErrorMessage message={error.message} />
              ))}
            </fieldset>
          </section>
          <footer className="form-group">
            <fieldset className="form-group-fs">
              <button type="submit" className="profile-savebutton" disabled={disabled}>
                {loading ? <LoadingIndicator /> : "Salvar"}
              </button>
            </fieldset>
          </footer>
        </form>
      </ProfilePageFormContainer>
    </>
  );
}

const ProfilePageFormContainer = styled.div`
  width: 600px;
  margin: 48px auto;
  padding: 24px 0;
  border: 1px solid #d1d7dc;

  .profile-form-title {
    text-align: center;
  }

  .profile-form-secondary-title {
    display: block;
    text-align: center;
    margin-top: 8px;
  }

  .profile-field,
  .profile-savebutton {
    width: 100%;
  }

  .profile-field {
    display: block;
    margin-bottom: 8px;
    padding: 20px 16px;
    border: 1px solid #1c1d1f;
    box-sizing: border-box;
    background-color: #f0f0f0;
    outline: none;
  }

  .profile-field:focus {
    border-color: #5624d0;
  }

  .profile-savebutton {
    text-align: center;
    background-color: #a435f0;
    color: #fff;
    font-weight: 800;
    height: 48px;
    min-width: 80px;
    border: none;
    outline: none;
  }

  .profile-savebutton:hover:not(:disabled) {
    cursor: pointer;
    background-color: #8710d8;
  }

  .profile-savebutton:disabled {
    border-color: #ccc;
    background-color: #ccc;
    cursor: auto;
  }

  .form-group {
    margin-top: 24px;
  }

  .form-group-fs {
    border: none;
  }

  .fs-legend {
    font-weight: 700;
    padding-bottom: 8px;
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

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ req, res }) => {
  const session = await getServerSession(req, res);

  const user = (await userRepository.findById(session?.user.userId as number, {
    select: {
      id: true,
      fullname: true,
      email: true,
    },
  })) as userRepository.User;

  return { props: { user } };
};
