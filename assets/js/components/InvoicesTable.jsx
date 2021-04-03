import React from "react";
import moment from "moment";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "primary",
  CANCELLED: "danger",
};

const STATUS_LABELS = {
  PAID: "Payée",
  SENT: "Envoyée",
  CANCELLED: "Annulée",
};

const InvoicesTable = ({ loading, paginatedInvoices, handleDelete }) => {
  // Gestion du format de date
  const formatDate = (str) => moment(str).format("DD/MM/YYYY");

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Numéro</th>
          <th>Client</th>
          <th className="text-center">Date d'envoi</th>
          <th className="text-center">Statut</th>
          <th className="text-center">Montant</th>
          <th />
        </tr>
      </thead>
      {!loading && (
        <tbody>
          {paginatedInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.chrono}</td>
              <td>
                {invoice.customer.firstName} {invoice.customer.lastName}
              </td>
              <td className="text-center">{formatDate(invoice.sentAt)}</td>
              <td className="text-center">
                <span
                  className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                >
                  {STATUS_LABELS[invoice.status]}
                </span>
              </td>
              <td className="text-center">
                {invoice.amount.toLocaleString()} €
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default InvoicesTable;
