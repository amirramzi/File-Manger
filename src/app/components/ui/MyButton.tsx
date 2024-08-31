"use client";
import { Button } from "@headlessui/react";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: any;
  btnIcon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  error?: boolean;
  green?: boolean;
  disabled?: boolean;
}

const MyButton = ({
  children,
  btnIcon,
  onClick,
  error,
  green,
  disabled,
}: Props) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={`rounded border-2  py-2 px-4 text-sm text-white    inline-flex ${
        error
          ? " border-red-600 bg-red-950 data-[hover]:data-[active]:bg-red-800 data-[hover]:bg-red-700"
          : green
          ? "border-green-600 bg-green-950 data-[hover]:data-[active]:bg-green-800 data-[hover]:bg-green-700"
          : "border-purple-600 bg-purple-950 data-[hover]:data-[active]:bg-purple-800 data-[hover]:bg-purple-700"
      }  `}
    >
      {btnIcon}
      <span className="pl-1"> {children}</span>
    </Button>
  );
};

export default MyButton;
