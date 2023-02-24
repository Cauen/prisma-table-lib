import * as React from "react";
import { DMMF } from "@prisma/generator-helper";
import useGetSchema2 from "../shared/data/useGetSchema2";
import { filterModelFieldsFromCustomization } from "../Model/data/useGetModelItemsQuery/utils/getModelFieldsFromCustomization";
import { useModal } from "../shared/providers/Modal/store";
import { useGetModelItemsQuery } from "../Model/data/useGetModelItemsQuery";
import { useGetRouterPath } from "../shared/utils/router";
import { getWhereUnique } from "../shared/utils/selectors/getWhereUnique";
import Loading from "../shared/components/Loading";
import Value from "./Value";
import useTranslate from "../shared/hooks/useTranslate";
import { useSettings } from "../shared/providers/Settings";

type ReadProps = {
  model: DMMF.Model;
  id?: string;
};

export default function Read({ model, id: paramId }: ReadProps) {
  const { data: schemaData, loading } = useGetSchema2();
  const { models, customizations } = schemaData;
  const settings = useSettings()
  const columnsRaw = filterModelFieldsFromCustomization(
    model,
    "actions.read",
    customizations,
    settings,
  );
  const addLayer = useModal((s) => s.addLayer);

  const [modelName, type, routerId] = useGetRouterPath();

  // This can be: string or number containing the ID | string JSON of object containing the ids
  const id = paramId || routerId;

  // const idFieldsStrings = getPrimaryKeys(model);
  // const idFields = idFieldsStrings.map((fieldString) => {
  //   const found = model.fields.find((f) => f.name === fieldString);
  //   if (!found) throw new Error("PRIMARY KEY DONT EXIST IN MODEL SCHEMA");
  //   return found;
  // });

  // const getWhereUnique = () => {
  //   const parameter = tryParseJson(id);
  //   const where = idFields.reduce((obj, field) => {
  //     const value =
  //       (typeof parameter === "object" && parameter[field.name]) || parameter;
  //     obj[field.name] = value;
  //     return obj;
  //   }, {} as Record<string, any>);
  //   return { where };
  // };

  const modalHook = useModal();
  const queried = useGetModelItemsQuery({
    model,
    queryType: "findUnique",
    // TODO DYNAMIC ID
    viewType: "actions.read",
    variables: { where: getWhereUnique({ idOrObjectString: id, model }) },
    customizations,
    models,
  });
  const data = queried.data?.[queried.queryName];
  const { translateField } = useTranslate();

  if (queried.loading && !data) return <Loading />;
  if (!data) return <div>Data not found</div>;
  const row = queried.data?.[queried.queryName];

  return (
    <div className="_read-table">
      <div className="flex flex-col gap-2">
        {columnsRaw.map((field) => {
          return (
            <div key={field.name} className="">
              <p className="font-medium">
                {translateField({ model, field: field })}:
              </p>
              <Value row={row} onDelete={queried.refetch} model={model} field={field} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
