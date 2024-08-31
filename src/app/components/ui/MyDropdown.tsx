"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

interface Props {
  editMode: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}

const MyDropdown = ({ editMode, handleDelete }: Props) => {
  return (
    <Menu>
      <MenuButton>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 bg-gray-800 origin-top-right rounded-xl border border-white/5  p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            onClick={() => editMode(true)}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
          >
            <PencilIcon className="size-4 fill-white/30" />
            Edit
          </button>
        </MenuItem>

        <MenuItem>
          <button
            onClick={handleDelete}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
          >
            <TrashIcon className="size-4 fill-white/30" />
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default MyDropdown;
