import { File, Folder } from "@/contracts/folder.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [],
};


const findAndUpdateFolder = (
  folders: Folder[],
  folderId: string,
  callback: (folder: Folder) => Folder
): Folder[] => {
  return folders.map((folder) => {
    if (folder.id === folderId) {
      return callback(folder);
    }

    if (folder.children) {
      return {
        ...folder,
        children: findAndUpdateFolder(folder.children, folderId, callback),
      };
    }

    return folder;
  });
};

const deleteFolderAndDescendants = (
  folders: Folder[],
  folderId: string
): Folder[] => {
  return folders.reduce((acc, folder) => {
    if (folder.id === folderId) {
      return acc;
    }
    if (folder.children) {
      folder.children = deleteFolderAndDescendants(folder.children, folderId);
    }
    return [...acc, folder];
  }, [] as Folder[]);
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (
      state,
      action: PayloadAction<{ parentId: string | null; folder: Folder }>
    ) => {
      const { parentId, folder } = action.payload;
      if (parentId === null) {
        state.folders.push(folder);
      } else {
        state.folders = findAndUpdateFolder(
          state.folders,
          parentId,
          (parent) => ({
            ...parent,
            children: [...(parent.children || []), folder],
          })
        );
      }
    },
    addFilesToFolder: (
      state,
      action: PayloadAction<{ folderId: string; files: File[] }>
    ) => {
      const { folderId, files } = action.payload;
      state.folders = findAndUpdateFolder(
        state.folders,
        folderId,
        (folder) => ({
          ...folder,
          files: [...(folder.files || []), ...files],
        })
      );
    },
    deleteFileFromFolder: (
      state,
      action: PayloadAction<{ folderId: string; fileId: string }>
    ) => {
      const { folderId, fileId } = action.payload;
      state.folders = findAndUpdateFolder(
        state.folders,
        folderId,
        (folder) => ({
          ...folder,
          files: folder.files?.filter((file) => file.id !== fileId) || [],
        })
      );
    },
    updateFileName: (
      state,
      action: PayloadAction<{
        folderId: string;
        fileId: string;
        newName: string;
      }>
    ) => {
      const { folderId, fileId, newName } = action.payload;
      state.folders = findAndUpdateFolder(
        state.folders,
        folderId,
        (folder) => ({
          ...folder,
          files:
            folder.files?.map((file) =>
              file.id === fileId ? { ...file, name: newName } : file
            ) || [],
        })
      );
    },
    updateFolderName: (
      state,
      action: PayloadAction<{ folderId: string; newName: string }>
    ) => {
      const { folderId, newName } = action.payload;
      state.folders = findAndUpdateFolder(
        state.folders,
        folderId,
        (folder) => ({
          ...folder,
          name: newName,
        })
      );
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      const folderId = action.payload;
      state.folders = deleteFolderAndDescendants(state.folders, folderId);
    },
  },
});

export const {
  addFolder,
  addFilesToFolder,
  deleteFileFromFolder,
  updateFolderName,
  deleteFolder,
  updateFileName,
} = folderSlice.actions;
export default folderSlice.reducer;
