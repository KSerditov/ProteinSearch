import { useEffect, useMemo, useState } from "react";
import "./protein-publications.css";
import { RootState, useAppDispatch } from "../../store/store";
import { fetchProteinPublicationsAPIAsync } from "../../store/actions";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner";
import ProteinPublicationLink, {
  LinkType,
} from "./protein-publications-link/protein-publications-link";

interface IProteinPublicationProps {
  proteinid: string;
}

const ProteinPublications: React.FC<IProteinPublicationProps> = ({
  proteinid,
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const proteinDataCache = useSelector(
    (state: RootState) => state.appState.proteinCache
  );

  const pubData = useMemo(() => {
    return proteinDataCache[proteinid as string].publications;
  }, [proteinDataCache, proteinid]);

  useEffect(() => {
    if (!pubData || pubData.length === 0) {
      setIsLoading(true);

      // TBD should I make it downloaded in the background when Protein page is opened
      // OR it is fine as is
      dispatch(fetchProteinPublicationsAPIAsync(proteinid)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [pubData, dispatch]);

  const renderPublicationsResults = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (!pubData) {
      return (
        <div className="protein-publications-no-data">
          {"No Publications found"}
        </div>
      );
    }

    return (
      <>
        {pubData.map((pub) => (
          <div key={pub.id} className="protein-publications-publication">
            <div className="protein-publications-publication-title">
              {pub.title}
            </div>
            <div className="protein-publications-publication-authors">
              {Array.isArray(pub.authors) &&
                pub.authors?.map((author, index) => {
                  return (
                    <span key={pub.id + author + index}>
                      {index > 0 ? ", " : ""}
                      <span className="protein-publication-author">
                        {author}
                      </span>
                    </span>
                  );
                })}
            </div>
            <div className="protein-publications-publication-prop">
              <span className="protein-publications-publication-prop-key">
                {"Categories: "}
              </span>
              <span className="protein-publications-publication-prop-value">
                {Array.isArray(pub.references) &&
                  Array.isArray(pub.references[0]?.categories) &&
                  pub.references[0]?.categories?.map((category, index) => (
                    <span key={pub.id + category}>
                      {index > 0 ? ", " : ""}
                      {category}
                    </span>
                  ))}
              </span>
            </div>
            <div className="protein-publications-publication-prop">
              <span className="protein-publications-publication-prop-key">
                {"Cited for: "}
              </span>
              <span className="protein-publications-publication-prop-value">
                {Array.isArray(pub.references) &&
                  Array.isArray(pub.references[0].positions) &&
                  pub.references[0]?.positions?.map((position, index) => (
                    <span key={pub.id + position}>
                      {index > 0 ? ", " : ""}
                      {position}
                    </span>
                  ))}
              </span>
            </div>
            <div className="protein-publications-publication-prop">
              <span className="protein-publications-publication-prop-key">
                {"Source: "}
              </span>
              <span className="protein-publications-publication-prop-value">
                {(Array.isArray(pub.references) && pub.references[0]?.source) ??
                  ""}
              </span>
            </div>
            <div className="protein-publications-publication-links">
              <ProteinPublicationLink
                id={pub.id}
                key={"pm_" + pub.id}
                title="PubMed"
                type={LinkType.PUBMED}
              />
              <ProteinPublicationLink
                id={pub.id}
                key={"ep_" + pub.id}
                title="Europe PMC"
                type={LinkType.EUROPEPMC}
              />
              <ProteinPublicationLink
                id={pub.doiId}
                key={"doi_" + pub.doiId}
                title={`${pub.journal} ${pub.volume}:${pub.firstPage} ${pub.lastPage} (${pub.publicationDate})`}
                type={LinkType.DOI}
              />
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="protein-publications-wrapper">
      {renderPublicationsResults()}
    </div>
  );
};

export default ProteinPublications;
