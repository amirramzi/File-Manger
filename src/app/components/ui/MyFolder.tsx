"use client";
import { FolderIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import MyDropdown from "./MyDropdown";
import { useState } from "react";
import MyInput from "./MyInput";
import { useAppDispatch } from "@/hooks/useRedux"; // Import the dispatch hook
import { deleteFolder, updateFolderName } from "@/store/slice/folderSlice"; // Import the action

interface Props {
  id: string;
  name: string;
  onClick: (id: string) => void;
}

const MyFolder = ({ id, name, onClick }: Props) => {
  const [editFolderName, setEditFolderName] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const dispatch = useAppDispatch();

  const handleSaveName = () => {
    if (newName.trim() !== "") {
      dispatch(updateFolderName({ folderId: id, newName }));
      setEditFolderName(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteFolder(id));
  };
  return (
    <div className="flex justify-between items-center rounded border-2 mb-4 py-2 px-4 text-sm text-white border-purple-600 bg-purple-950 hover:bg-purple-800">
      <div
        onClick={editFolderName ? () => {} : () => onClick(id)}
        className="flex items-center w-[96%] cursor-pointer"
      >
        <FolderIcon className="w-10 h-10" />
        {editFolderName ? (
          <div className="pl-6">
            <MyInput
              label=""
              value={newName}
              onChangeHandler={(e) => setNewName(e.target.value)}
            />
          </div>
        ) : (
          <div className="font-bold text-xl pl-6">{name}</div>
        )}
      </div>
      {editFolderName ? (
        <PencilSquareIcon
          onClick={handleSaveName}
          className="w-8 h-8 cursor-pointer"
        />
      ) : (
        <MyDropdown editMode={setEditFolderName} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default MyFolder;
