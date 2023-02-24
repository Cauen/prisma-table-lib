import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import * as React from "react";
import { useModal } from "../../../providers/Modal/store";

type ModalHeaderProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  theme?: "accent" | "red"
};

export default function ModalHeader({ title, description, theme = "accent" }: ModalHeaderProps) {
  const close = useModal(s => s.closeOne)
  const themeColors = (() => {
    if (theme === "accent") return {
      bg: "bg-indigo-700",
      title: "text-white",
      description: "text-indigo-300"
    }

    return {
      bg: "bg-red-400",
      title: "text-white",
      description: "text-red-300"
    }
  })()

  return (
    <div className={`${themeColors.bg} py-6 px-4 sm:px-6`}>
      <div className={`flex items-center justify-between`}>
        {title && (
          <Dialog.Title className={`text-lg font-medium ${themeColors.title}`}>
            {title}
          </Dialog.Title>
        )}
        <div className={`ml-3 flex h-7 items-center`}>
          <button
            type="button"
            className={`rounded-md ${themeColors.bg} ${themeColors.description} hover:text-white focus:outline-none focus:ring-2 focus:ring-white`}
            onClick={() => close()}
          >
            <span className={`sr-only`}>Close panel</span>
            <XIcon className={`h-6 w-6`} aria-hidden="true" />
          </button>
        </div>
      </div>
      {description && (
        <div className={`mt-1`}>
          <p className={`text-sm ${themeColors.description}`}>{description}</p>
        </div>
      )}
    </div>
  );
}
