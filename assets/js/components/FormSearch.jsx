import React from "react";

const FormSearch = ({ handleSearch, search }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        onChange={handleSearch}
        value={search}
        className="form-control"
        placeholder="Rechercher ..."
      />
    </div>
  );
};

export default FormSearch;
