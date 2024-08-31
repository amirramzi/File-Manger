"use client";
import { ChangeEvent } from "react";
import { Field, Label, Input } from "@headlessui/react";
import clsx from "clsx";

interface MyInputProps {
  label: string;
  value: string | number;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput: React.FC<MyInputProps> = ({ label, value, onChangeHandler }) => {
  return (
    <div className="w-full max-w-md ">
      <Field className="space-y-4 mb-2">
        <Label className="text-sm/6 font-medium text-white">{label}</Label>
        <div className="relative">
          <Input
            type="text"
            value={value}
            onChange={onChangeHandler}
            className={clsx(
              "w-full rounded-lg bg-white/5 py-3 px-6 text-sm/6 text-white",
              "outline-none outline-2 -outline-offset-2 outline-purple-950",
              "[-moz-appearance:textfield]",
              "[&::-webkit-inner-spin-button]:appearance-none",
              "[&::-webkit-outer-spin-button]:appearance-none"
            )}
          />
        </div>
      </Field>
    </div>
  );
};

export default MyInput;
