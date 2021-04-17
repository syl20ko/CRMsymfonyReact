import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import customersAPI from "../services/customersAPI";

const CustomerPage = ({ history, match }) => {
  const { id = "new" } = match.params;

  if (id !== "new") {
    console.log(id);
  }
  const [customer, setCustomer] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: "",
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: "",
  });

  const [editing, setEditing] = useState(false);

  const fetchCustomer = async (id) => {
    try {
      const { firstName, lastName, email, company } = await customersAPI.find(
        id
      );
      setCustomer({
        firstName,
        lastName,
        email,
        company,
      });
    } catch (error) {
      /* notif flash error */
      console.log(error.response);
      history.replace("/customers");
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchCustomer(id);
    }
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editing) {
        const response = await customersAPI.update(id, customer);
        /* flash notice add feature */
      } else {
        const response = await customersAPI.create(customer);
        /* flash notice add feature */
        history.replace("/customers");
      }
      setErrors({});
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        /* flash notice add feature */

        setErrors(apiErrors);
      }
    }
  };
  return (
    <>
      {(!editing && <h1>Creation d'un client</h1>) || (
        <h1>Modification d'un client</h1>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          label="Nom de famille"
          placeholder="Nom de famille du client"
          value={customer.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Field
          name="firstName"
          label="Prénom "
          placeholder="Prénom du client"
          value={customer.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Field
          name="email"
          label="Email"
          placeholder="email du client"
          value={customer.email}
          onChange={handleChange}
          error={errors.email}
          type="email"
        />
        <Field
          name="company"
          label="Entreprise  "
          placeholder="Entreprise du client"
          value={customer.company}
          onChange={handleChange}
          error={errors.company}
        />

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
          <Link to="/customers" className="btn btn-link">
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  );
};

export default CustomerPage;
