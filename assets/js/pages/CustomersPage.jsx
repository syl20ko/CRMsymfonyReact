import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";
import { Link } from "react-router-dom";

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Permet de récuper les customers
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  //Au chargement du composant
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Suppression d'un customer
  const handleDelete = async (id) => {
    const originalCustomers = [...customers];

    setCustomers(customers.filter((customer) => customer.id !== id));

    try {
      await CustomersAPI.delete(id);
    } catch (error) {
      setCustomers(originalCustomers);
    }
  };

  // Changement de la page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 10;

  // RECHERCHE CUSTOMERS
  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };
  //Filtrage des customer en fonction de la recherche
  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination.getData est une fonction dans le component Pagination (fin du fichier)
  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="d-flex justify-content align-items-center mb-3">
        <h1>Liste des clients</h1>
        <Link to="/customers/new" className="btn btn-primary">
          Créer un client
        </Link>
      </div>

      <div className="form-group">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="form-control"
          placeholder="rechercher"
        />
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <a href="#">
                  {customer.firstName} {customer.lastName}
                </a>
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td className="text-center">
                <span className="badge badge-light">
                  {customer.invoices.length}
                </span>
              </td>
              <td className="text-center">
                {customer.totalAmount.toLocaleString()} €
              </td>
              <td>
                <button
                  onClick={() => handleDelete(customer.id)}
                  disabled={customer.invoices.length > 0}
                  className="btn btn-sm btn-danger"
                >
                  Supprimer
                </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage < filteredCustomers.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCustomers.length}
          onPageChanged={handlePageChange}
        />
      )}
    </>
  );
};

export default CustomersPage;
