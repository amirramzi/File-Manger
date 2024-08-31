import { Folder } from "@/contracts/folder.interface";
import MyFolder from "../ui/MyFolder";
import DocumentItem from "./DocumentItem";

interface DirectoryProps {
  currentFolderId: string | null;
  folders: Folder[];
  handleFolderClick: (id: string) => void;
  currentFolder: Folder | null;
}

const Directory: React.FC<DirectoryProps> = ({
  currentFolderId,
  folders,
  handleFolderClick,
  currentFolder,
}) => {
  const folderFiles = currentFolder?.files || [];

  return (
    <div className="space-y-4">
      {currentFolderId === null ? (
        folders.map((folder) => (
          <MyFolder
            key={folder.id}
            id={folder.id}
            name={folder.name}
            onClick={handleFolderClick}
          />
        ))
      ) : currentFolder ? (
        <>
          {currentFolder.children && currentFolder.children.length > 0 ? (
            currentFolder.children.map((child) => (
              <MyFolder
                key={child.id}
                id={child.id}
                name={child.name}
                onClick={handleFolderClick}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              No subfolders available
            </div>
          )}
          {folderFiles.length > 0 ? (
            <div className="flex flex-wrap justify-between">
              {folderFiles.map((file) => (
                <DocumentItem
                  key={file.id}
                  file={file}
                  folderId={currentFolderId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No files available</div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500">Folder not found</div>
      )}
    </div>
  );
};

export default Directory;
