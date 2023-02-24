import Input from "../../../../shared/components/Input";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import { FilterProps } from "../..";
import { selectOptions } from "./filterSelectOptions";
import { useListFilter, useSetListFilter } from "../../../store";
import { filterModelFieldsFromCustomization } from "../../../data/useGetModelItemsQuery/utils/getModelFieldsFromCustomization";
import { getModelFieldsOrder } from "../../../data/useGetModelItemsQuery/utils/getModelFieldsOrder";
import useGetSchema2 from "../../../../shared/data/useGetSchema2";
import useTranslate from "../../../../shared/hooks/useTranslate";

export default function DrawAdd({ model }: FilterProps) {
  // key name or undefined
  const [adding, setAdding] = React.useState<DMMF.Field | undefined>(undefined);
  const [value, setValue] = React.useState("");
  const [key, setKey] = React.useState("");
  const types = ["AND", "OR"] as const;
  type TypeOptions = typeof types[number];
  const [type, setType] = React.useState<TypeOptions>(types[0]);
  const { set } = useSetListFilter({ model });
  const { state } = useListFilter({ model });
  const { translateField, translateLabel } = useTranslate();

 
  const { data: schemaData } = useGetSchema2();
  const { models, customizations } = schemaData;
  const columns = filterModelFieldsFromCustomization(
    model,
    "tableView.filter",
    customizations
  );
  const columnsSorted = getModelFieldsOrder(
    columns,
    customizations?.[model.name]
  );

  if (adding) {
    const options = selectOptions[adding.type] || [];
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!key) return;
          const parsedValue = (() => {
            // TODO parse it as util
            const isFieldNumber = [
              "Int",
              "Decimal",
              "Float",
              "BigInt",
            ].includes(adding.type);
            return isFieldNumber ? Number(value) : value;
          })();
          const toAdd = {
            [adding.name]: { [key]: parsedValue },
          };
          const currentType = state?.[type] || [];
          const newAND = [...currentType, toAdd];
          set(
            JSON.stringify({
              ...state,
              [type]: newAND,
            })
          );
        }}
        className="border border-gray-200 p-2 flex gap-2 flex-col"
      >
        <div className="header flex gap-2 items-center p-2">
          <ArrowLeftIcon
            className="cursor-pointer w-4 h-4"
            onClick={() => setAdding(undefined)}
          />
          {adding.name}
        </div>
        <div>
          <select
            className="h-10 rounded-lg border border-gray-200"
            onChange={(e) => setType(e.target.value as TypeOptions)}
          >
            {types.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="h-10 rounded-lg border border-gray-200"
            onChange={(e) => setKey(e.target.value)}
          >
            <option>-</option>
            {options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <Input
            className="w-40 border border-gray-200 h-10 rounded-lg"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            label="Value"
          />
        </div>
        <div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="my-4">
        <p className="text-lg font-medium">{translateLabel('Add filters')}:</p>
        <div className="flex gap-2 flex-col my-2">
          {columnsSorted.map((field) => {
            return (
              <div
                onClick={() => setAdding(field)}
                className="cursor-pointer hover:underline"
                key={field.name}
              >
                {translateField({ model, field })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
