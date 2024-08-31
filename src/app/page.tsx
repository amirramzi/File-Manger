"use client";

import CreateFolder from "./components/shared/CreateFolder";
import SidebarLayout from "./components/sidebar/SidebarLayout";
import MyButton from "./components/ui/MyButton";
import { DocumentIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import Directory from "./components/shared/Directory";
import { Folder } from "@/contracts/folder.interface";
import MyFileInput from "./components/ui/MyFileInput";

const FoldersPage = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const folders = useAppSelector((state) => state.folder.folders);

  useEffect(() => {
    console.log("folder :", folders);
  }, [folders]);

  const findFolderById = (folders: Folder[], id: string): Folder | null => {
    for (const folder of folders) {
      if (folder.id === id) return folder;
      if (folder.children) {
        const found = findFolderById(folder.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const currentFolder = currentFolderId
    ? findFolderById(folders, currentFolderId)
    : null;

  // folder click
  const handleFolderClick = (id: string) => {
    if (currentFolderId) {
      setHistory((prevHistory) => [...prevHistory, currentFolderId]);
    }
    setCurrentFolderId(id);
  };

  // back to parent
  const handleBackClick = () => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const previousFolderId = newHistory.pop() || null;
      setCurrentFolderId(previousFolderId);
      return newHistory;
    });
  };

  return (
    <SidebarLayout>
      <div className="flex justify-between pb-6">
        <div className="flex space-x-4">
          <CreateFolder parentId={currentFolderId} />
          {history.length == 0 && currentFolderId == null ? (
            ""
          ) : (
            <MyFileInput currentFolderId={currentFolderId} />
          )}
        </div>
        {history.length == 0 && currentFolderId == null ? (
          ""
        ) : (
          <MyButton
            error={true}
            onClick={handleBackClick}
            btnIcon={<ArrowUturnLeftIcon className="h-5 w-5" />}
          >
            Back
          </MyButton>
        )}
      </div>
      <Directory
        currentFolderId={currentFolderId}
        folders={folders}
        handleFolderClick={handleFolderClick}
        currentFolder={currentFolder}
      />
    </SidebarLayout>
  );
};

export default FoldersPage;
