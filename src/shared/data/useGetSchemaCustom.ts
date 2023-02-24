import { gql, rewriteURIForGET, useQuery } from "@apollo/client";
import { DMMF } from "@prisma/generator-helper";
import { ModelOptions } from "../../Settings/ModelConfig";
import { useSettings } from "../providers/Settings";
import { useEffect, useState } from "react";

type Customizations = Record<string, ModelOptions>
export type Schema = {
  models: DMMF.Model[];
  enums: DMMF.DatamodelEnum[];
  customizations?: Customizations;
};

const defaultSchema: Schema = { enums: [], models: [] };
const useGetSchemaCustom = () => {
  const settings = useSettings()
  const settingsSchema = settings?.data?.schema
  const loadSchema = settings?.data?.loadSchema

  const [schema, setSchema] = useState(settingsSchema ?? defaultSchema)
  const [loading, setLoading] = useState(false)

  async function load (loader: NonNullable<typeof loadSchema>) {
    setLoading(true)
    const loadedSchema = await loader()
    setSchema(loadedSchema)
    setLoading(false)
  }

  useEffect(() => {
    if (loadSchema) {
      load(loadSchema)
    }
  }, [!!loadSchema])

  return { data: schema, loading, refetch: load, defined: (!!loadSchema || !!settingsSchema) };
};

export default useGetSchemaCustom;
