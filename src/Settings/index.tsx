import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import useGetSchema2 from "../shared/data/useGetSchema2";
import ModelConfig from "./ModelConfig";
import ModelFields from "./ModelFields";
import SelectModel from "./SelectModel";
import { useSchemaSettings } from "./store";

const RunModel = () => {
  const { data: schemaData } = useGetSchema2();
  const { enums, models } = schemaData;
  const selectedSchema = useSchemaSettings(s => s.selectedSchema)

  const model = models.find((el) => el.name === selectedSchema);

  if (!model) return null;

  return (
    <>
      <ModelConfig model={model} />
      <ModelFields model={model} />
    </>
  );
};

export default function Settings() {
  return (
    <div className="flex flex-col gap-4">
      <SelectModel />
      <RunModel />
      {/* <pre>
        {JSON.stringify(
          models.map((el) => el.name),
          null,
          2
        )}
      </pre> */}
    </div>
  );
}
