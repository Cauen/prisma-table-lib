import * as React from "react";
import useGetSchema2 from "../../shared/data/useGetSchema2";
import { useSchemaSettings } from "../store";

type SettingsProps = {};

export default function SelectModel(props: SettingsProps) {
  const { data: schemaData } = useGetSchema2();
  const { enums, models } = schemaData;

//   const selectedSchema = useSchemaSettings(s => s.selectedSchema)
  const setState = useSchemaSettings(s => s.setState)

  return (
    <div className="flex flex-col gap-4">
      <select onChange={async (e) => {
        setState(s => { s.selectedSchema = e.target.value })
        // await new Promise((resolve) => setTimeout(resolve, 100));
        // setSelectedModel(e.target.value)
      }}>
        <option value={""}>--</option>
        {models.map((el) => (
          <option key={el.name} value={el.name}>{el.name}</option>
        ))}
      </select>
    </div>
  );
}
