/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModal } from "../../../providers/Modal/store";
// import ModalHeader from "./Header";
// import ModalFooter from "./Footer";

export default function Modal({
  children,
  ModalFooter,
  ModalHeader,
}: {
  children: React.ReactNode;
  ModalHeader?: React.ReactNode;
  ModalFooter?: React.ReactNode;
}) {
  const { index } = useModalIndex();
  const close = useModal((s) => s.closeOne);
  const layers = useModal((s) => s.layers).filter(
    (el) =>
      el.options?.type !== "centered" && el.options?.type !== "notification"
  );
  const margin = layers.length - index - 1;

  const scale = 1 - 0.05 * margin;
  const finalScale = scale < 0 ? 0 : scale;

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={close}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-10 transition-opacity" />
          </Transition.Child>

          <div
            style={{
              transform: `translateX(-${
                margin * (45 - margin)
              }px) scale(${finalScale})`,
              // transitionProperty: "transform",
              transitionDuration: "220ms",
              transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
            }}
            className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
          >
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-7xl">
                <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  {ModalHeader}
                  <div className="h-0 flex-1 overflow-y-auto">
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="divide-y divide-gray-200 p-4 sm:p-6">
                        {children}
                      </div>
                    </div>
                  </div>
                  {ModalFooter}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

import Footer from "./Footer";
import Header from "./Header";
import { useModalIndex } from "../Context";

export { Footer, Header };
