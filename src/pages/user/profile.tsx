import * as userRepository from "../../user/userRepository";
import type { GetServerSideProps } from "next";
import styled from "styled-components";
import { getServerSession } from "../../auth/getServerSession";

type ProfilePageProps = {
  user: userRepository.User;
};

export default function ProfilePage({ user: { fullname, email } }: ProfilePageProps) {
  return (
    <>
      <h1 className="profile-title">{`Bem vindo, ${fullname}!`}</h1>
      <ProfilePageContainer>
        <h2 className="profile-form-title">Perfil do usuário</h2>
        <span className="profile-form-secondary-title">Adicione informações sobre você</span>
        <form noValidate className="profile-form">
          <section className="form-group">
            <fieldset className="form-group-fs">
              <legend>Dados básicos</legend>
              <input type="text" placeholder="Nome completo" className="profile-field" value={fullname} />
              <input type="email" placeholder="E-mail" className="profile-field" value={email} />
            </fieldset>
          </section>
          <footer className="form-group">
            <fieldset className="form-group-fs">
              <button type="submit" className="profile-savebutton">
                Salvar
              </button>
            </fieldset>
          </footer>
        </form>
      </ProfilePageContainer>
    </>
  );
}

const ProfilePageContainer = styled.div`
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

  .form-group {
    margin-top: 24px;
  }

  .form-group-fs {
    border: none;
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
