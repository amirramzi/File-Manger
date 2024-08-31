"use client";
import { ReactNode } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";


interface MyDialogProps {
  open: boolean;
  close: () => void;
  children: ReactNode;
  title: string;
  btn?: boolean;
}

const MyDialog: React.FC<MyDialogProps> = ({
  open,
  close,
  children,
  title,
  btn,
}) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ring-1 ring-purple-950"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              {title}
            </DialogTitle>
            {children}

            {btn ? (
              <div className="mt-4 flex justify-end">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  بستن
                </Button>
              </div>
            ) : (
              ""
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default MyDialog;
