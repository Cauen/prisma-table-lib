import * as React from "react";
import { FilterProps } from "..";
import { cameCaseSplit } from "../../../Read/utils/string";
import { useListFilter, useSetListFilter } from "../../store";
import DrawAdd from "./Add";

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="inline-flex justify-center items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-300 dark:hover:text-gray-900"
      data-dismiss-target="#badge-dismiss-dark"
      aria-label="Remove"
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        className="w-3.5 h-3.5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Remove badge</span>
    </button>
  );
}

export default function DrawFilter({ model }: FilterProps) {
  const { set } = useSetListFilter({ model });
  const { state } = useListFilter({ model });

  const entries = state ? Object.entries(state) : []

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {entries.map((entry) => {
          const [key, value] = entry;
          const isArray = Array.isArray(value);

          return (
            <div key={key}>
              <span
                id="badge-dismiss-dark"
                className="gap-2 inline-flex items-center py-1 px-2 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-200 dark:text-gray-800"
              >
                {cameCaseSplit(key)}
                {(() => {
                  if (!isArray) return JSON.stringify(value);
                  if (value.length === 1) return JSON.stringify(value);
                  return (
                    <div>
                      {value.map((el, index) => {
                        return (
                          <p key={index} className="flex items-center">
                            {JSON.stringify(el)}
                            <DeleteButton
                              onClick={() => {
                                const newEntries = entries.filter(
                                  (el) => el[0] !== key
                                );
                                const newState = Object.fromEntries(newEntries);
                                set(JSON.stringify({
                                  ...state,
                                  [key]: value.filter(function(value, arrIndex) {
                                    return index !== arrIndex;
                                  }),
                                }));
                              }}
                            />
                          </p>
                        );
                      })}
                    </div>
                  );
                })()}
                <DeleteButton
                  onClick={() => {
                    const newEntries = entries.filter((el) => el[0] !== key);
                    const newState = Object.fromEntries(newEntries);
                    set(JSON.stringify(newState));
                  }}
                />
              </span>
            </div>
          );
        })}
      </div>
      {/* {JSON.stringify({ state, entries })} */}
      <DrawAdd model={model} />
    </div>
  );
}
