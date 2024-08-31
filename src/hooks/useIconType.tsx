import {
  DocumentIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { FaHtml5 } from "react-icons/fa";
import { BsFiletypeJson } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { TbFileTypeJs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";

const useIconType = (fileType: string) => {
  switch (fileType) {
    case "image":
      return null;
    case "document":
      return <DocumentIcon className="h-10 w-10 text-white" />;
    case "html":
      return <FaHtml5 className="h-10 w-10 text-white" />;
    case "js":
      return <TbFileTypeJs className="h-10 w-10 text-white" />;
    case "jsx":
      return <FaReact className="h-10 w-10 text-white" />;
    case "json":
      return <BsFiletypeJson className="h-10 w-10 text-white" />;
    case "pdf":
      return <BsFiletypePdf className="h-10 w-10 text-white" />;
    case "excel":
      return <RiFileExcel2Fill className="h-10 w-10 text-white" />;
    case "audio":
      return <MusicalNoteIcon className="h-10 w-10 text-white" />;
    case "video":
      return <VideoCameraIcon className="h-10 w-10 text-white" />;
    case "archive":
      return <ArchiveBoxIcon className="h-10 w-10 text-white" />;
    default:
      return <DocumentIcon className="h-10 w-10 text-white" />;
  }
};

export default useIconType;
