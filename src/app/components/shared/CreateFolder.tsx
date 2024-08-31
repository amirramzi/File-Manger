"use client";

import MyButton from "../ui/MyButton";
import {
  FolderPlusIcon,
  NoSymbolIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import MyDialog from "../ui/MyDialog";
import { useState } from "react";
import MyInput from "../ui/MyInput";
import { useAppDispatch } from "@/hooks/useRedux";
import { addFolder } from "@/store/slice/folderSlice";

interface CreateFolderProps {
  parentId?: string | null;
}

const CreateFolder = ({ parentId }: CreateFolderProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [folderName, setFolderName] = useState("");
  const dispatch = useAppDispatch();

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const newFolder = {
        id: Date.now().toString(), 
        name: folderName,
        children: [],
      };
      dispatch(addFolder({ parentId: parentId || null, folder: newFolder }));
      setOpenDialog(false);
      setFolderName("");
    }
  };

  return (
    <>
      <MyButton
        onClick={() => setOpenDialog(true)}
        btnIcon={<FolderPlusIcon className="h-5 w-5" />}
      >
        Add Folder
      </MyButton>
      <MyDialog
        open={openDialog}
        close={() => setOpenDialog(false)}
        title="Create Folder"
      >
        <div className="px-4 pt-5 space-y-8">
          <MyInput
            label="Folder Name"
            value={folderName}
            onChangeHandler={(e) => setFolderName(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <MyButton
              error={true}
              onClick={() => setOpenDialog(false)}
              btnIcon={<NoSymbolIcon className="h-5 w-5" />}
            >
              Cancel
            </MyButton>
            <MyButton
              onClick={handleCreateFolder}
              btnIcon={<PlusIcon className="h-5 w-5" />}
            >
              Create
            </MyButton>
          </div>
        </div>
      </MyDialog>
    </>
  );
};

export default CreateFolder;
