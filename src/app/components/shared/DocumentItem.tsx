import { File } from "@/contracts/folder.interface";
import MyDropdown from "../ui/MyDropdown";
import {
  CloudArrowDownIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  deleteFileFromFolder,
  updateFileName,
} from "@/store/slice/folderSlice";
import useType from "@/hooks/useType";
import useIconType from "@/hooks/useIconType";
import { useState } from "react";
import MyInput from "../ui/MyInput";

interface DocumentProps {
  file: File;
  folderId: string;
}

const DocumentItem = ({ file, folderId }: DocumentProps) => {
  const [editFileId, setEditFileId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [newNameType, setNameType] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleDelete = (fileId: string) => {
    dispatch(deleteFileFromFolder({ folderId, fileId }));
  };

  const editModeHandler = (fileId: string, fileName: string) => {
    setEditFileId(fileId);
    setNewName(fileName.split(".")[0]);
    setNameType(fileName.split(".")[1]);
  };

  const handleSaveName = (fileId: string) => {
    const newFileName = `${newName}.${newNameType}`;
    if (newFileName.trim() !== "") {
      dispatch(updateFileName({ folderId, fileId, newName: newFileName }));
      setEditFileId(null);
      setNewName("");
    }
  };

  const fileType = useType(file.name);

  return (
    <div
      key={file.id}
      className="w-full   flex justify-between items-center rounded border-2 mb-4 py-4 px-2 text-sm text-white border-green-600 bg-green-950 hover:bg-green-800"
    >
      <div className="w-[80%] flex items-center">
        {fileType === "image" ? (
          <img
            src={file.url}
            alt={file.name}
            className="w-10 h-10 rounded-md"
          />
        ) : (
          useIconType(fileType)
        )}
        {editFileId === file.id ? (
          <div className="pl-5">
            <MyInput
              label=""
              value={newName}
              onChangeHandler={(e) => setNewName(e.target.value)}
            />
          </div>
        ) : (
          <p className="line-clamp-1 pl-2 md:pl-6"> {file.name}</p>
        )}
      </div>
      {editFileId === file.id ? (
        <PencilSquareIcon
          onClick={() => handleSaveName(file.id)}
          className="w-6 h-6 cursor-pointer"
        />
      ) : (
        <div className="w-[20%] md:w-[10%] flex justify-evenly items-center">
          <a href={file.url} target="_blank" download={file.name}>
            <CloudArrowDownIcon className="w-6 h-6" />
          </a>
          <MyDropdown
            editMode={() => editModeHandler(file.id, file.name)}
            handleDelete={() => handleDelete(file.id)}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentItem;
