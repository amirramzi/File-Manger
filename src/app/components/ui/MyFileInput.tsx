"use client";

import { useRef } from "react";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import MyButton from "../ui/MyButton";
import { useAppDispatch } from "@/hooks/useRedux";
import { addFilesToFolder } from "@/store/slice/folderSlice"; // Updated path
import { v4 as uuidv4 } from "uuid";
interface MyFileInputProps {
  currentFolderId: string | null;
}

const MyFileInput: React.FC<MyFileInputProps> = ({ currentFolderId }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    console.log(files);

    if (currentFolderId) {
      const newFiles = files.map((file) => ({
        id: uuidv4(),
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
      }));

      dispatch(
        addFilesToFolder({ folderId: currentFolderId, files: newFiles })
      );
    }

    event.target.value = "";
  };

  return (
    <div>
      <MyButton
        green={true}
        onClick={handleButtonClick}
        btnIcon={<DocumentPlusIcon className="h-5 w-5" />}
      >
        Add File
      </MyButton>
      <input
        ref={fileInputRef}
        hidden
        type="file"
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
};

export default MyFileInput;
