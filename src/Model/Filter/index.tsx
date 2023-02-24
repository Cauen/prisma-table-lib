import { FilterIcon } from "@heroicons/react/outline";
import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import { useModal } from "../../shared/providers/Modal/store";
import { tryParseJson } from "../../shared/utils/object";
import { useList, useListFilter, useSetListFilter } from "../store";
import { Tab } from "@headlessui/react";
import { AtSymbolIcon, CodeIcon, LinkIcon } from "@heroicons/react/solid";
import ModalFooter from "../../shared/components/Modal/SlideOver/Footer";
import { setGetParam } from "./utils";
import ModalHeader from "../../shared/components/Modal/SlideOver/Header";
import { SlideOver } from "../../shared/components/Modal";
import { useSettings } from "../../shared/providers/Settings";
import DrawFilter from "./Draw";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type FilterProps = {
  model: DMMF.Model;
};

const fixJson = (erroredJson: string) => {
  const fixedJson = erroredJson // bad json
    // Replace ":" with "@colon@" if it's between double-quotes
    .replace(/:\s*"([^"]*)"/g, function (match, p1) {
      return ': "' + p1.replace(/:/g, "@colon@") + '"';
    })
    // Replace ":" with "@colon@" if it's between single-quotes
    .replace(/:\s*'([^']*)'/g, function (match, p1) {
      return ': "' + p1.replace(/:/g, "@colon@") + '"';
    })
    // Add double-quotes around any tokens before the remaining ":"
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
    // Turn "@colon@" back into ":"
    .replace(/@colon@/g, ":");
  return fixedJson;
};

const getJson = (text: string) => {
  if (!text) return { beautified: text, error: false };
  const fixed = fixJson(text);
  try {
    return {
      beautified: JSON.stringify(JSON.parse(fixed), null, 2),
      error: false,
    };
  } catch (error) {
    return { beautified: text, error: true };
  }
};

const FilterUpdater = ({ model }: FilterProps) => {
  const { set } = useSetListFilter({ model });
  const { state } = useListFilter({ model });
  const [text, setText] = React.useState(
    state ? JSON.stringify(state, null, 2) : ""
  );
  const { beautified, error } = getJson(text);
  const closeOne = useModal((s) => s.closeOne);

  return (
    <div>
      <Tab.Group>
        {({ selectedIndex }) => (
          <>
            <Tab.List className="flex items-center">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                      : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                    "px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                  )
                }
              >
                Select
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                      : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                    "px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                  )
                }
              >
                Write
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                      : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                    "ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                  )
                }
              >
                Preview
              </Tab>

              {/* These buttons are here simply as examples and don't actually do anything. */}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                <DrawFilter model={model} />
              </Tab.Panel>
              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                <label htmlFor="filter" className="sr-only">
                  Filter
                </label>
                <div className="flex">
                  <textarea
                    rows={5}
                    onChange={(e) => {
                      const value = e.target.value;
                      setText(value);
                    }}
                    value={text}
                    name="filter"
                    id="filter"
                    className={classNames(
                      "h-96 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md",
                      error
                        ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                        : "focus:ring-indigo-500 focus:border-indigo-500"
                    )}
                    placeholder="Add your filter..."
                    defaultValue={""}
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                <div className="border-b">
                  <div className="mx-px mt-px px-3 pt-2 pb-12 text-sm leading-5 text-gray-800">
                    <pre>{beautified}</pre>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </>
        )}
      </Tab.Group>
      <div className="mt-2 flex justify-end gap-2">
        {text && (
          <button
            onClick={() => {
              setText("");
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear
          </button>
        )}
        {text !== beautified && (
          <button
            onClick={() => {
              setText(beautified);
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Beautify
          </button>
        )}
        <button
          disabled={!!text && error}
          type="button"
          onClick={() => {
            const encodedUri = encodeURI(text);
            setGetParam("filters", encodedUri);

            set(text ? beautified : "");
            closeOne();
          }}
          className={classNames(
            "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            !!text && error ? "opacity-80" : ""
          )}
        >
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {JSON.stringify({ state })}

      <textarea
        onChange={(e) => {
          const value = e.target.value;
          set(value);
        }}
        value={JSON.stringify(state)}
      />
    </div>
  );
};

export default function Filter({ model }: FilterProps) {
  const addLayer = useModal((s) => s.addLayer);
  const { state } = useListFilter({ model });
  const { router } = useSettings();
  const { set } = useSetListFilter({ model });

  function setUrlParamsFromZFilters() {
    if (!state) return;
    const encodedUri = encodeURI(JSON.stringify(state));
    setGetParam("filters", encodedUri);
  }

  React.useEffect(() => {
    setUrlParamsFromZFilters();
  }, [model.name]);

  function setZFiltersFromQueryFilters(query: string | string[] | undefined) {
    const filters = router?.query.filters;
    if (filters) {
      const json = decodeURI(
        Array.isArray(filters) ? filters.join("") : filters
      );
      const obj = JSON.parse(json);
      set(json);
    }
  }

  React.useEffect(() => {
    setZFiltersFromQueryFilters(router?.query.filters);
  }, [router?.query.filters]);

  return (
    <div>
      <FilterIcon
        onClick={() => {
          addLayer({
            Component: (
              <SlideOver
                ModalHeader={<ModalHeader title="Define the filters" />}
                ModalFooter={<ModalFooter />}
              >
                <FilterUpdater model={model} />
              </SlideOver>
            ),
          });
        }}
        className={classNames(
          "w-6 h-6 cursor-pointer hover:opacity-80",
          state ? "text-accent" : ""
        )}
      />
    </div>
  );
}
