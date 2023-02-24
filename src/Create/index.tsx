import * as React from "react";
import { DMMF } from "@prisma/generator-helper";
import useGetSchema2 from "../shared/data/useGetSchema2";
import { filterModelFieldsFromCustomization } from "../Model/data/useGetModelItemsQuery/utils/getModelFieldsFromCustomization";
import Input from "../shared/components/Input";
import shallow from "zustand/shallow";
import { useCreate } from "./store";
import { toIsoString } from "./utils/date";
import { useModal } from "../shared/providers/Modal/store";
import { RefreshIcon } from "@heroicons/react/solid";
import useModelMutation from "../shared/data/useModelMutation";
import useHandleError from "../shared/hooks/useHandleError";
import { getCreatableOrUpdatableFields } from "../shared/utils/selectors/getCreatableOrUpdatableFields";
import RelationField from "./RelationField";
import { useGetRouterPath } from "../shared/utils/router";
import { getWhereUnique } from "../shared/utils/selectors/getWhereUnique";
import { useGetModelItemsQuery } from "../Model/data/useGetModelItemsQuery";
import Loading from "../shared/components/Loading";
import { useParseRowDataStoreData } from "./utils/useParseRowDataStoreData";
import { useParseStoreDataUpdateMutationData } from "./utils/useParseStoreDataUpdateMutationData";
import { useSettings } from "../shared/providers/Settings";
import Button from "../shared/components/Button";
import useTranslate from "../shared/hooks/useTranslate";
import { useApolloClient } from "@apollo/client";

type CreateProps = {
  model: DMMF.Model;
  paramId?: any; // if editing
};

export default function Create({ model, paramId }: CreateProps) {
  const { data: schemaData } = useGetSchema2();
  const { models, customizations } = schemaData;
  
  const settings = useSettings()
  const router = settings.router
  const { handle } = useHandleError();

  // Edit logic
  const [modelName, type, routerId] = useGetRouterPath();
  const id = paramId || routerId;
  const operationType = id ? "update" : "create";
  const isUpdate = operationType === "update"
  const queried = useGetModelItemsQuery({
    model,
    queryType: "findUnique",
    // TODO DYNAMIC ID
    variables: isUpdate ? { where: getWhereUnique({ idOrObjectString: id, model }) } : undefined,
    customizations,
    models,
    skip: !isUpdate,
  });
  const data = queried.data?.[queried.queryName]
  const { parse } = useParseRowDataStoreData({ model })
  React.useEffect(() => {
    if (data) {
      const rowData = parse({ row: data })
      setState((old) => {
        old.update._touchedFields = []
        old.update[model.name] = rowData
      });
    }
  }, [data]);

  // Change values
  const { setState, state, setFieldValue } = useCreate(
    (state) => ({
      setState: state.setState,
      state: state[operationType],
      setFieldValue: state.setFieldValue
    }),
    shallow
  );
  const columns = filterModelFieldsFromCustomization(
    model,
    `actions.${operationType}`,
    customizations,
    settings,
  );
  const [runner, { loading }] = useModelMutation({
    model,
    mutation: operationType,
  });
  const layers = useModal((s) => s.layers);
  const closeOne = useModal((s) => s.closeOne);
  const { parse: parseToUpdate } = useParseStoreDataUpdateMutationData({ model })
  const { translateLabel, translateModel, translateField } = useTranslate()
  const { reFetchObservableQueries } = useApolloClient()

  if (queried.loading) return <Loading />

  return (
    <div className="bg-white p-4">
      <p className="text-lg pb-4 font-medium capitalize">{translateLabel(operationType)} {translateModel(model)}</p>
      {loading || queried.loading && <div>Loading</div>}
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = isUpdate ? parseToUpdate() : state[model.name]
          const runned = await runner({
            variables: { 
              data,
              ...(isUpdate && { where:  getWhereUnique({ idOrObjectString: id, model }) })
            },
          });

          if (runned.errors) return; 

          // Clear store
          setState((store) => {
            store[operationType][model.name] = {};
          });

          if (layers.length) {
            reFetchObservableQueries()
            closeOne()
            return
          }

          if (router?.push) {
            // router.back();
            router.push(`/panel/${modelName}`)
          }
        }}
      >
        {columns.map((el) => {
          const required = el.isRequired && !el.hasDefaultValue;
          const type: React.HTMLInputTypeAttribute = (() => {
            if (["Float", "Int", "BigInt", "Decimal"].includes(el.type))
              return "number";
            if (el.type === "DateTime") return "datetime-local";
            if (el.type === "Boolean") return "checkbox";
            return "text";
          })();

          // Value from DB, can be string, number, array, object, ...
          const value = (() => {
            const value = state[model.name]?.[el.name];
            if (type === "datetime-local")
              return toIsoString(value).substring(0, 16);
            return value;
          })();

          const setValue = (value: any, field: DMMF.Field) => {
            const parsedValue = (() => {
              if (field.type === "Boolean") return Boolean(value)
              return (type === "number" && Number(value)) ||
              (type === "datetime-local" &&
                value &&
                new Date(value).toISOString()) ||
              value;
            })()
            setFieldValue({ modelName: model.name, fieldName: el.name, type: operationType, value: parsedValue })
          };

          const field = (() => {
            if (el.relationName) {
              return <RelationField type={operationType} value={value} model={model} field={el} />;
            }

            return (
              <Input
                type={type}
                required={required}
                placeholder={JSON.stringify(el.default)}
                label={`${translateField({ model, field: el, decoration: "create" })}`}
                value={value}
                checked={(() => {
                  if (el.type === "Boolean") return value
                  return undefined
                })()}
                onChange={(e) => setValue((() => {
                  if (el.type === "Boolean") return e.target.checked
                  return e.target.value
                })(), el)}
              />
            );
          })();
          return (
            <div key={el.name} className="flex items-end gap-4 w-full">
              <div className="flex-1">{field}</div>
              {value && (
                <RefreshIcon
                  className="w-5 h-5 cursor-pointer hover:opacity-80"
                  onClick={() => setValue("", el)}
                />
              )}
            </div>
          );
        })}
        <Button
          type="submit"
        >
          {translateLabel('Send')}
        </Button>
      </form>
    </div>
  );
}
