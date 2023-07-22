import { useState } from "react";
import { IProtein } from "../../types/IProtein";
import "./protein-details.css";
import copy from "clipboard-copy";

interface ProteinProps {
  proteinData: IProtein;
}

const ProteinDetails: React.FC<ProteinProps> = ({ proteinData }) => {
  const [copyButtonText, setCopyButtonText] = useState(" Copy");

  const handleCopyClick = () => {
    copy(proteinData.sequence);
    setCopyButtonText(" Copied!");
    setTimeout(() => setCopyButtonText(" Copy"), 2000);
  };

  return (
    <div className="protein-details-wrapper">
      <div className="protein-details-title">Sequence</div>
      <table className="protein-property-table">
        <tbody>
          <tr>
            <td>
              <div className="protein-property">
                <div className="protein-title">Length</div>
                <div className="protein-text">{proteinData.length}</div>
              </div>
            </td>
            <td>
              <div className="protein-property">
                <div className="protein-title">Last Updated</div>
                <div className="protein-text">{proteinData.lastUpdated}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="protein-property">
                <div className="protein-title">Mass (Da)</div>
                <div className="protein-text">{proteinData.molWeight}</div>
              </div>
            </td>
            <td>
              <div className="protein-property">
                <div className="protein-title">Checksum</div>
                <div className="protein-text">{proteinData.checksum}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="protein-sequence-button-copy">
        <div
          className="protein-sequence-button-copy-clickable"
          onClick={handleCopyClick}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.6C0 1.17565 0.168571 0.768687 0.468629 0.468629C0.768687 0.168571 1.17565 0 1.6 0H9.6C10.0243 0 10.4313 0.168571 10.7314 0.468629C11.0314 0.768687 11.2 1.17565 11.2 1.6V4.8H14.4C14.8243 4.8 15.2313 4.96857 15.5314 5.26863C15.8314 5.56869 16 5.97565 16 6.4V14.4C16 14.8243 15.8314 15.2313 15.5314 15.5314C15.2313 15.8314 14.8243 16 14.4 16H6.4C5.97565 16 5.56869 15.8314 5.26863 15.5314C4.96857 15.2313 4.8 14.8243 4.8 14.4V11.2H1.6C1.17565 11.2 0.768687 11.0314 0.468629 10.7314C0.168571 10.4313 0 10.0243 0 9.6V1.6ZM6.4 11.2V14.4H14.4V6.4H11.2V9.6C11.2 10.0243 11.0314 10.4313 10.7314 10.7314C10.4313 11.0314 10.0243 11.2 9.6 11.2H6.4ZM9.6 9.6V1.6H1.6V9.6H9.6Z"
              fill="#0D0D0D"
            />
          </svg>
          {copyButtonText}
        </div>
      </div>
      <div className="protein-sequence">{proteinData.sequence}</div>
    </div>
  );
};

export default ProteinDetails;
