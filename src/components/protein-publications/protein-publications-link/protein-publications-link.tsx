import "./protein-publications-link.css";
import { CONFIG } from "../../../config";

export enum LinkType {
  PUBMED,
  EUROPEPMC,
  DOI,
}

interface ProteinPublicationLinkProp {
  type: LinkType;
  id: string;
  title: string;
}

const ProteinPublicationLink: React.FC<ProteinPublicationLinkProp> = (data) => {
  if (!data.id && data.type != LinkType.DOI) {
    return <></>;
  }

  let link;
  switch (data.type) {
    case LinkType.PUBMED:
      link = `${CONFIG.PUBMED_HOST}${data.id}`;
      break;
    case LinkType.EUROPEPMC:
      link = `${CONFIG.PMC_HOST}${data.id}`;
      break;
    case LinkType.DOI:
      link = `${CONFIG.DOI_HOST}${data.id}`;
      break;
    default:
  }

  const renderLink = (title: string) => {
    return (
      <div className="protein-publications-link-content">
        {title}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.55556 1.55556C8.34928 1.55556 8.15145 1.47361 8.00558 1.32775C7.85972 1.18189 7.77778 0.984057 7.77778 0.777778C7.77778 0.571498 7.85972 0.373667 8.00558 0.227806C8.15145 0.0819442 8.34928 0 8.55556 0H13.2222C13.4285 0 13.6263 0.0819442 13.7722 0.227806C13.9181 0.373667 14 0.571498 14 0.777778V5.44444C14 5.65072 13.9181 5.84855 13.7722 5.99442C13.6263 6.14028 13.4285 6.22222 13.2222 6.22222C13.0159 6.22222 12.8181 6.14028 12.6722 5.99442C12.5264 5.84855 12.4444 5.65072 12.4444 5.44444V2.65533L5.21656 9.88322C5.06986 10.0249 4.8734 10.1033 4.66947 10.1015C4.46554 10.0998 4.27046 10.018 4.12625 9.87375C3.98205 9.72954 3.90025 9.53446 3.89848 9.33053C3.8967 9.1266 3.9751 8.93014 4.11678 8.78344L11.3447 1.55556H8.55556ZM0 3.11111C0 2.69855 0.163888 2.30289 0.455612 2.01117C0.747335 1.71944 1.143 1.55556 1.55556 1.55556H5.44444C5.65072 1.55556 5.84855 1.6375 5.99442 1.78336C6.14028 1.92922 6.22222 2.12705 6.22222 2.33333C6.22222 2.53961 6.14028 2.73744 5.99442 2.88331C5.84855 3.02917 5.65072 3.11111 5.44444 3.11111H1.55556V12.4444H10.8889V8.55556C10.8889 8.34928 10.9708 8.15145 11.1167 8.00558C11.2626 7.85972 11.4604 7.77778 11.6667 7.77778C11.8729 7.77778 12.0708 7.85972 12.2166 8.00558C12.3625 8.15145 12.4444 8.34928 12.4444 8.55556V12.4444C12.4444 12.857 12.2806 13.2527 11.9888 13.5444C11.6971 13.8361 11.3014 14 10.8889 14H1.55556C1.143 14 0.747335 13.8361 0.455612 13.5444C0.163888 13.2527 0 12.857 0 12.4444V3.11111Z" />
        </svg>
      </div>
    );
  };

  if (data.type != LinkType.DOI || data.id) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="protein-publications-link protein-publications-link-enabled"
      >
        {renderLink(data.title)}
      </a>
    );
  }

  return (
    <div className="protein-publications-link protein-publications-link-disabled">
      {renderLink(data.title)}
    </div>
  );
};

export default ProteinPublicationLink;
