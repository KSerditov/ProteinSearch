import React from "react";
import "./protein-table.css";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import { fetchAdditionalItemsAsync } from "../../store/actions";
import { useSelector } from "react-redux";
import { useState } from "react";
import Spinner from "../../components/spinner/spinner";

const ProteinTable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchResults = useSelector(
    (state: RootState) => state.appState.searchResults
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleEntryClick = (proteinid: string) => {
    if (!proteinid) return;

    const url = `/protein/${proteinid}`;
    navigate(url);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <
      e.currentTarget.clientHeight + 100;
    if (
      bottom &&
      !isLoading &&
      searchResults.items.length < searchResults.totalResults
    ) {
      setIsLoading(true);

      const url = new URL(searchResults.nextLink);
      dispatch(
        fetchAdditionalItemsAsync(url, searchResults.searchString)
      ).finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="protein-table-wrapper" onScroll={handleScroll}>
      <table className="protein-table">
        <thead className="protein-table-header">
          <tr className="protein-table-header-row">
            <th className="protein-table-header-column">#</th>
            <th className="protein-table-header-column">Primary Accession</th>
            <th className="protein-table-header-column">ID</th>
            <th className="protein-table-header-column">Organism Name</th>
            <th className="protein-table-header-column">Gene Names</th>
            <th className="protein-table-header-column">
              Subcellular Location
            </th>
            <th className="protein-table-header-column">Length</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.items.map((item, index) => (
            <tr key={item.primaryAccession}>
              <td className="protein-table-content protein-table-column-generic">{index + 1}</td>
              <td className="protein-table-content protein-table-column-entry">
                <span
                  className="protein-table-entry"
                  onClick={() => {
                    handleEntryClick(item.primaryAccession);
                  }}
                >
                  {item.primaryAccession}
                </span>
              </td>
              <td className="protein-table-content protein-table-column-generic">
                {item.id}
              </td>
              <td className="protein-table-content">
                <div data-organism={item.organism_name}>
                  {item.organism_name}
                </div>
              </td>
              <td className="protein-table-content protein-table-column-generic">
                <span className="protein-table-gene-main">
                  {item.gene_names.name}
                </span>
                {item.gene_names.synonyms.length > 0 ? ", " : ""}
                {item.gene_names.synonyms.join(", ")}
              </td>
              <td className="protein-table-content protein-table-column-generic">
                {item.cc_subcellular_location}
              </td>
              <td className="protein-table-content protein-table-column-generic">
                {item.length}
              </td>
            </tr>
          ))}
          {isLoading && (
            <tr className="protein-table-content-loading">
              <td colSpan={7}>
                <Spinner />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProteinTable;
