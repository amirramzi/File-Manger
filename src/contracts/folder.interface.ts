export interface File {
  id: string;
  name: string | any;
  url: string;
}
export interface Folder {
  id: string;
  name: string;
  children?: Folder[];
  files?: File[];
}
