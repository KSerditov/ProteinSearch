import { useSelector } from "react-redux";
import "./search-filters.css";
import { useMemo, useState } from "react";
import { RootState } from "../../store/store";
import { ISearchFilters } from "../../types/ISearchFilters";
import Select, { ActionMeta, MultiValue } from "react-select";
import { IFacetsItem } from "../../types/IFacets";

const SearchFilters: React.FC<{
  onApply: (filters: ISearchFilters) => void;
  onClose: () => void;
}> = ({ onApply, onClose }) => {
  const searchFilters = useSelector(
    (state: RootState) => state.appState.searchFilters
  );

  const filterOptions = useSelector(
    (state: RootState) => state.appState.searchFacets
  );

  const [filters, setFilters] = useState<ISearchFilters>(searchFilters);
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    if (filters.sequenceLengthMin) {
      const lengthMin = Number(filters.sequenceLengthMin);
      if (!Number.isInteger(lengthMin) || lengthMin < 0) {
        setErrorMsg("Sequence length must be positive integer value");
        return true;
      }
    }

    if (filters.sequenceLengthMax) {
      const lengthMax = Number(filters.sequenceLengthMax);
      if (!Number.isInteger(lengthMax) || lengthMax < 0) {
        setErrorMsg("Sequence length must be positive integer value");
        return true;
      }
    }

    if (filters.sequenceLengthMin && filters.sequenceLengthMax) {
      const lengthMin = Number(filters.sequenceLengthMin);
      const lengthMax = Number(filters.sequenceLengthMax);
      if (lengthMax < lengthMin) {
        setErrorMsg(
          "Sequence length maximum value must be larger than minimum value"
        );
        return true;
      }
    }

    if (
      (filters.sequenceLengthMin && !filters.sequenceLengthMax) ||
      (!filters.sequenceLengthMin && filters.sequenceLengthMax)
    ) {
      setErrorMsg(
        "Both or none of min and max sequence length values must be populated"
      );
      return true;
    }

    setErrorMsg("");
    return false;
  };

  const disabled: boolean = useMemo(() => {
    return validate();
  }, [filters]);

  const emptyFilters: ISearchFilters = {
    geneName: "",
    organism: [],
    sequenceLengthMin: "",
    sequenceLengthMax: "",
    annotationScore: "",
    proteinWith: [],
  };

  const handleCancelClick = () => {
    setFilters(emptyFilters);
    onApply(emptyFilters);
    onClose();
  };

  const handleApplyClick = () => {
    onApply(filters);
    onClose();
  };

  const onOrganismChange = (
    option: MultiValue<IFacetsItem>,
    _: ActionMeta<IFacetsItem>
  ) => {
    const selectedValues = option.map((o) => o.value);

    setFilters({
      ...filters,
      ["organism"]: selectedValues,
    });
  };

  const onProteinWithChange = (
    option: MultiValue<IFacetsItem>,
    _: ActionMeta<IFacetsItem>
  ) => {
    const selectedValues = option.map((o) => o.value);

    setFilters({
      ...filters,
      ["proteinWith"]: selectedValues,
    });
  };

  return (
    <div className="search-filters-wrapper">
      <div className="search-filters-title">Filters</div>
      <div className="search-filter-input-wrapper">
        <label htmlFor="gene-name" className="search-filters-label">
          Gene Name
        </label>
        <input
          type="text"
          className="search-filter-input"
          name="gene-name"
          id="gene-name"
          placeholder="Enter Gene Name"
          value={filters.geneName}
          onChange={(e) => {
            setFilters({
              ...filters,
              ["geneName"]: e.target.value,
            });
          }}
        />
      </div>

      <div className="search-filter-input-wrapper">
        <label htmlFor="organism" className="search-filters-label">
          Organisms
        </label>
        <Select
          name="organism"
          className="search-filter-input-wrapper"
          isMulti
          options={filterOptions.organisms}
          defaultValue={filterOptions.organisms.filter((item) =>
            filters.organism.some((value) => value === item.value)
          )}
          classNamePrefix="search-filter-react-select"
          onChange={onOrganismChange}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "#f5f5f5",
              textAlign: "left",
              fontWeight: 400,
              fontSize: "14px",
              color: "#6c6c6c",
            }),
          }}
        />
      </div>

      <div className="search-filter-input-wrapper">
        <label htmlFor="sequence-min" className="search-filters-label">
          Sequence Length
        </label>
        <div className="search-filter-input-row-wrapper">
          <input
            type="text"
            className="search-filter-input"
            name="sequence-min"
            id="sequence-min"
            placeholder="From"
            value={filters.sequenceLengthMin}
            onChange={(e) => {
              setFilters({
                ...filters,
                ["sequenceLengthMin"]: e.target.value,
              });
            }}
          />
          <span className="search-filter-dash">&mdash;</span>
          <input
            type="text"
            className="search-filter-input"
            name="sequence-max"
            id="sequence-max"
            placeholder="To"
            value={filters.sequenceLengthMax}
            onChange={(e) => {
              setFilters({
                ...filters,
                ["sequenceLengthMax"]: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="search-filter-input-wrapper">
        <label htmlFor="annotation-score" className="search-filters-label">
          Annotation Score
        </label>

        <select
          className="search-filter-input"
          name="annotation-score"
          id="annotation-score"
          placeholder="Select an option"
          value={filters.annotationScore}
          onChange={(e) => {
            setFilters({
              ...filters,
              ["annotationScore"]: e.target.value,
            });
          }}
        >
          <option value=""></option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>

      <div className="search-filter-input-wrapper">
        <label htmlFor="protein-with" className="search-filters-label">
          Proteins With
        </label>
        <Select
          name="protein-with"
          className="search-filter-input-wrapper"
          isMulti
          options={filterOptions.proteinsWith}
          defaultValue={filterOptions.proteinsWith.filter((item) =>
            filters.proteinWith.some((value) => value === item.value)
          )}
          classNamePrefix="search-filter-react-select"
          onChange={onProteinWithChange}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "#f5f5f5",
              textAlign: "left",
              fontWeight: 400,
              fontSize: "14px",
              color: "#6c6c6c",
            }),
          }}
        />
      </div>

      <div className="search-filter-error-message">{errorMsg}</div>

      <div className="search-filter-input-row-wrapper">
        <button className="form-button" onClick={handleCancelClick}>
          Clear
        </button>

        <button
          className="form-button"
          disabled={disabled}
          onClick={handleApplyClick}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
