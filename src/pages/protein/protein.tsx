import { useParams } from "react-router-dom";
import "./protein.css";
import Header from "../../components/header/header";
import { RootState, useAppDispatch } from "../../store/store";
import { useEffect, useMemo, useState } from "react";
import { fetchProteinAsync } from "../../store/actions";
import { useSelector } from "react-redux";
import ProteinCommon from "../../components/protein-common/protein-common";
import Spinner from "../../components/spinner/spinner";
import ProteinDetails from "../../components/protein-details/protein-details";
import ProteinFeatureViewer from "../../components/protein-feature-viewer/protein-feature-viewer";
import ProteinPublications from "../../components/protein-publications/protein-publications";

const Protein: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  const proteinDataCache = useSelector(
    (state: RootState) => state.appState.proteinCache
  );

  const proteinData = useMemo(() => {
    return proteinDataCache[id as string];
  }, [proteinDataCache, id]);

  useEffect(() => {
    if (id) {
      if (!proteinData) {
        setIsLoading(true);
        dispatch(fetchProteinAsync(id)).finally(() => {
          setIsLoading(false);
        });
      }
    }
  }, [id, dispatch]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderProteinSearchResults = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (!proteinData) {
      return <div className="protein-no-data">{"Protein ID is not found"}</div>;
    } else {
      return (
        <>
          <ProteinCommon proteinData={proteinData} />
          <div className="protein-page-tab-buttons">
            <div
              className={`protein-page-tab-button ${
                activeTab === "tab1" ? "protein-page-tab-button-active" : ""
              }`}
              onClick={() => handleTabClick("tab1")}
            >
              {"Details"}
            </div>
            <div
              className={`protein-page-tab-button ${
                activeTab === "tab2" ? "protein-page-tab-button-active" : ""
              }`}
              onClick={() => handleTabClick("tab2")}
            >
              {"Feature Viewer"}
            </div>
            <div
              className={`protein-page-tab-button ${
                activeTab === "tab3" ? "protein-page-tab-button-active" : ""
              }`}
              onClick={() => handleTabClick("tab3")}
            >
              {"Publications"}
            </div>
          </div>
        </>
      );
    }
  };

  const renderTabs = () => {
    if (!proteinData) {
      return null;
    }

    switch (activeTab) {
      case "tab1":
        return <ProteinDetails proteinData={proteinData} />;
      case "tab2":
        return <ProteinFeatureViewer proteinData={proteinData} />;
      case "tab3":
        return <ProteinPublications proteinid={proteinData.id} />;
      default:
        return <ProteinDetails proteinData={proteinData} />;
    }
  };

  return (
    <>
      <Header />
      <div className="protein-page-wrapper-scroll">
        <div className="protein-page-wrapper">
          {renderProteinSearchResults()}
          <div className="protein-page-tab">{renderTabs()}</div>
        </div>
      </div>
    </>
  );
};

export default Protein;
