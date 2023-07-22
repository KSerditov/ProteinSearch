import { useEffect, useRef } from "react";
import { IProtein } from "../../types/IProtein";
import "./protein-feature-viewer.css";

// @ts-ignore
import ProtvistaUniprot from "protvista-uniprot";

interface ProteinProps {
  proteinData: IProtein;
}

const ProteinFeatureViewer: React.FC<ProteinProps> = ({ proteinData }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.document) {
      if (!window.customElements.get("protvista-uniprot")) {
        window.customElements.define("protvista-uniprot", ProtvistaUniprot);
      }
      if (ref.current) {
        const element = document.createElement("protvista-uniprot");
        element.setAttribute("accession", proteinData.id);
        ref.current.appendChild(element);
      }
    }
  }, [proteinData.id]);

  return <div ref={ref} className="protein-feature-viewer-wrapper"></div>;
};

export default ProteinFeatureViewer;
