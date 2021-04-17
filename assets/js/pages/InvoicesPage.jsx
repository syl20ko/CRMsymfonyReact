import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/invoicesAPI";
import PageTitle from "../components/PageTitle";
import FormSearch from "../components/FormSearch";
import InvoicesTable from "../components/InvoicesTable";
import { Link } from "react-router-dom";

const InvoicesPage = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Récupération des invoices auprès de l'API
  const fetchInvoices = async () => {
    try {
      const data = await InvoicesAPI.findAll();
      setInvoices(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des factures !");
    }
  };

  // Charger les invoices au chargement du composant
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  // Gestion de la recherche :
  const filteredInvoices = invoices.filter(
    (i) =>
      i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      i.amount.toString().startsWith(search.toLowerCase()) /* ||
      STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase()) */
  );

  // Gestion de la suppression
  const handleDelete = async (id) => {
    const originalInvoices = [...invoices];

    setInvoices(invoices.filter((invoice) => invoice.id !== id));

    try {
      await InvoicesAPI.delete(id);
    } catch (error) {
      setInvoices(originalInvoices);
    }
  };

  // Pagination des données
  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
      <PageTitle title="Liste des factures" />
      <Link className="btn btn-primary" to="/invoices/new" >Créer une facture</Link>
      </div>

      <FormSearch handleSearch={handleSearch} search={search} />

      <InvoicesTable loading={loading} paginatedInvoices={paginatedInvoices} handleDelete={handleDelete}/>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChanged={handlePageChange}
        length={filteredInvoices.length}
      />
    </>
  );
};

export default InvoicesPage;
