import React, { useContext, useState } from "react";
import PageTitle from "../components/PageTitle";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../services/authAPI";
import Field from "../components/forms/Field";

const LoginPage = ({
  /* on ne recoit plus cette props à cause du usecontect onLogin, */ history,
}) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  //STATE
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  //Handle value in login form
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  //Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      history.replace("/customers");
    } catch (error) {
      setError(
        "Aucun compte ne possède cette adresse email ou les informations ne correspondent pas"
      );
    }
  };
  return (
    <>
      <PageTitle title="Connexion à l'application" />
      <form onSubmit={handleSubmit}>
        <Field
          label="Adresse Email"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="adresse email de connexion"
          error={error}
        />

        <Field
          name="password"
          label="Mot de passe"
          placeholder="mot de passe"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          error=""
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Connexion
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
