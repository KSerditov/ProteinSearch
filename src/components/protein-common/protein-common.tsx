import { IProtein } from "../../types/IProtein";
import "./protein-common.css";

interface ProteinProps {
  proteinData: IProtein;
}

const ProteinCommon: React.FC<ProteinProps> = ({ proteinData }) => {
  return (
    <div className="protein-common-wrapper">
      <div className="protein-header-wrapper">
        <div className="protein-header">
          {proteinData.id}
          {" / "}
          {proteinData.uniProtkbId}
        </div>
        <div className="protein-organism" data-organism={proteinData.organism}>
          {proteinData.organism}
        </div>
      </div>
      <div className="protein-property">
        <div className="protein-title">{"Protein"}</div>
        <div className="protein-text">{proteinData.description}</div>
      </div>
      <div className="protein-property">
        <div className="protein-title">{"Gene"}</div>
        <div className="protein-text">{proteinData.gene}</div>
      </div>
    </div>
  );
};

export default ProteinCommon;
