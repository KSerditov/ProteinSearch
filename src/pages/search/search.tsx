import "./search.css";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchItemsAsync } from "../../store/actions";
import { useSelector } from "react-redux";
import ProteinTable from "../../components/protein-table/protein-table";
import Spinner from "../../components/spinner/spinner";
import SearchFilters from "../../components/search-filters/search-filters";
import { ISearchFilters } from "../../types/ISearchFilters";

// TBD move to separate component
const NoResults: React.FC = () => {
  return (
    <div className="search-results-wrapper">
      <div className="search-results-nodata-wrapper">
        <span className="search-results-text">{"No data to display"}</span>
        <span className="search-results-text">
          {"Please start search to display results"}
        </span>
      </div>
    </div>
  );
};

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchResults = useSelector(
    (state: RootState) => state.appState.searchResults
  );

  const searchFilters = useSelector(
    (state: RootState) => state.appState.searchFilters
  );

  const [searchStringLocal, setSearchStringLocal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  useEffect(() => {
    const searchString = searchParams.get("query");

    const searchFilters: ISearchFilters = {
      geneName: searchParams.get("geneName") || "",
      organism: searchParams.get("organism")?.split(",") || [],
      sequenceLengthMin: searchParams.get("sequenceLengthMin") || "",
      sequenceLengthMax: searchParams.get("sequenceLengthMax") || "",
      annotationScore: searchParams.get("annotationScore") || "",
      proteinWith: searchParams.get("proteinWith")?.split(",") || [],
    };

    if (searchString) {
      setIsLoading(true);
      setSearchStringLocal(decodeURIComponent(searchString));
      dispatch(fetchItemsAsync(searchString, searchFilters)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [searchParams, dispatch]);

  const buildUrlAndNavigate = (filters?: string) => {
    const searchParams = new URLSearchParams();
    const path = "/search";

    if (searchStringLocal) {
      searchParams.append("query", encodeURIComponent(searchStringLocal));
    } else {
      searchParams.append("query", encodeURIComponent("*"));
    }

    let url = `${path}?${searchParams.toString()}`;

    if (filters) {
      url = `${url}&${filters}`;
    }

    navigate(url);
  };

  const handleSearchClick = () => {
    handleApplyFilters(searchFilters);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleApplyFilters(searchFilters);
    }
  };

  const renderSearchResults = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (searchResults.items.length === 0) {
      return <NoResults />;
    } else {
      return (
        <>
          <div className="search-results-count">
            {searchResults.totalResults}
            {` Search Results for "${decodeURIComponent(
              searchResults.searchString
            )}"`}
          </div>
          <ProteinTable />
        </>
      );
    }
  };

  const handleFilterPopupToggle = () => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  const handleApplyFilters = (filters: ISearchFilters) => {
    const filtersQueryString = Object.entries(filters)
      .filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }

        return key && value;
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            value.join(",")
          )}`;
        }

        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join("&");

    buildUrlAndNavigate(filtersQueryString);
  };

  const getFiltersSet = (filters: ISearchFilters) => {
    return Object.values(filters).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== "";
    });
  };

  // TBD process search on hitting Enter in search field, block and unblock Search field and Search, Filters buttons
  return (
    <>
      <Header />
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input form-text-input"
          placeholder="Enter search value"
          value={searchStringLocal}
          onChange={(e) => setSearchStringLocal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="search-button-search search-button"
          onClick={handleSearchClick}
        >
          {"Search"}
        </button>
        <button
          className={
            "search-button-filters search-button" +
            (isFilterPopupOpen ? " search-filters-popup-opened" : "")
          }
          onClick={handleFilterPopupToggle}
        >
          <svg
            width="22px"
            height="18px"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.2 10.8C8.87744 10.8 10.2869 11.9473 10.6866 13.5H20.7C21.197 13.5 21.6 13.903 21.6 14.4C21.6 14.8419 21.2816 15.2093 20.8618 15.2854L20.7 15.3L10.6861 15.3018C10.2858 16.8536 8.87679 18 7.2 18C5.52321 18 4.11417 16.8536 3.71389 15.3018L0.9 15.3C0.402948 15.3 0 14.897 0 14.4C0 13.9581 0.318384 13.5907 0.738216 13.5146L0.9 13.5H3.71342C4.11307 11.9473 5.52256 10.8 7.2 10.8ZM7.2 12.6C6.2059 12.6 5.4 13.4059 5.4 14.4C5.4 15.3941 6.2059 16.2 7.2 16.2C8.1941 16.2 9 15.3941 9 14.4C9 13.4059 8.1941 12.6 7.2 12.6ZM14.4 0C16.0774 0 17.487 1.14728 17.8866 2.69996L20.7 2.7C21.197 2.7 21.6 3.10295 21.6 3.6C21.6 4.04183 21.2816 4.4093 20.8618 4.48549L20.7 4.5L17.8861 4.50184C17.4859 6.05362 16.0769 7.2 14.4 7.2C12.7232 7.2 11.3142 6.05362 10.9139 4.50184L0.9 4.5C0.402948 4.5 0 4.09705 0 3.6C0 3.15817 0.318384 2.7907 0.738216 2.71451L0.9 2.7L10.9134 2.69996C11.3131 1.14728 12.7226 0 14.4 0ZM14.4 1.8C13.4059 1.8 12.6 2.6059 12.6 3.6C12.6 4.5941 13.4059 5.4 14.4 5.4C15.3941 5.4 16.2 4.5941 16.2 3.6C16.2 2.6059 15.3941 1.8 14.4 1.8Z" />
          </svg>
          {getFiltersSet(searchFilters) && (
            <div className="search-filter-alert" />
          )}
        </button>
      </div>
      {isFilterPopupOpen && (
        <div className="search-filters-popup">
          <SearchFilters
            onClose={handleFilterPopupToggle}
            onApply={handleApplyFilters}
          />
        </div>
      )}

      {renderSearchResults()}
    </>
  );
};

export default Search;
