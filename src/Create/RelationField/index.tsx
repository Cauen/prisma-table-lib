import { XIcon } from "@heroicons/react/outline";
import { PlusIcon, UserCircleIcon } from "@heroicons/react/solid";
import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import shallow from "zustand/shallow";
import { SlideOver } from "../../shared/components/Modal";
import ModalHeader from "../../shared/components/Modal/SlideOver/Header";
import useTranslate from "../../shared/hooks/useTranslate";
import { useModal } from "../../shared/providers/Modal/store";
import { useCreate } from "../store";
import LinkCreate from "./LinkCreate";
import { isObjectEquals } from "./LinkCreate/utils";
import { OptionalConnect, useConnection } from "./useConnection";

const Button = ({
  children,
  type,
  action,
}: {
  children: React.ReactNode;
  type: "add" | "remove";
  action?: () => void;
}) => {
  const isRemove = type === "remove";
  const Icon = isRemove ? XIcon : PlusIcon;

  return (
    <div
      onClick={(e) => {
        if (!isRemove) return;
        e.preventDefault();
        e.stopPropagation();
        if (action) action();
      }}
      className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3"
    >
      <span className={"text-gray-900 hidden truncate sm:mr-2 sm:block"}>
        {children}
      </span>
      <Icon
        className={`flex-shrink-0 h-5 w-5 text-gray-300 sm:-mr-1 ${
          isRemove ? "hover:text-red-500" : ""
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

const RenderValues = ({
  value,
  field,
  model,
  type,
}: {
  value?: OptionalConnect;
  field: DMMF.Field;
  model: DMMF.Model;
  type: "create" | "update";
}) => {
  const { translateLabel, translateField } = useTranslate()
  const Add = () => (
    <Button type="add">
      {field.isList ? `${translateLabel('Connect a')} ${field.type}` : `${translateLabel('Set')} ${translateField({ field, model })}`}
    </Button>
  );

  const { removeConnection, getConnectList } = useConnection({ model, type });
  const list = getConnectList(value);

  return (
    <div className="flex gap-2">
      {list.map((theConnection, key) => {
        return (
          <Button
            key={key}
            action={() => removeConnection(theConnection, field)}
            type="remove"
          >
            {JSON.stringify(theConnection)}
          </Button>
        );
      })}
      <Add />
    </div>
  );
};

type RelationFieldProps = {
  model: DMMF.Model;
  field: DMMF.Field;
  // Value from DB, can be string, number, array, object, ...
  value: OptionalConnect;
  type: "create" | "update";
};
export default function RelationField({
  model,
  field,
  value,
  type,
}: RelationFieldProps) {
  const addLayer = useModal((s) => s.addLayer);
  const { translateField } = useTranslate();

  const openLinker = () =>
    addLayer({
      options: {
        category: "Model",
      },
      Component: (
        <SlideOver
          ModalHeader={
            <ModalHeader
              title={model.name}
              description={`Link ${field.isList ? "A LIST" : "ONE"} ${
                field.name
              }(${field.type}) to${" "}`}
            />
          }
        >
          <LinkCreate type={type} model={model} field={field} />
        </SlideOver>
      ),
    });

  const typedValue: OptionalConnect = value;

  return (
    <div className="cursor-pointer" onClick={openLinker}>
      <label className="block text-sm font-medium text-gray-700">
        {translateField({ model, field, decoration: "create" })}
      </label>
      <RenderValues
        type={type}
        model={model}
        field={field}
        value={typedValue}
      />
    </div>
  );
}
