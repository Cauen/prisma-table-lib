import * as React from "react";
import { DMMF } from "@prisma/generator-helper";
import { useApolloClient, useMutation } from "@apollo/client";
import { updatePrismaTableModel, useUpdatePrismaTable } from "./graphql/update";
import useGetSchema2 from "../../shared/data/useGetSchema2";
import Input from "../../shared/components/Input";
import Label from "../../shared/components/Label";
import Button from "../../shared/components/Button";
import Select from "../../shared/components/Select";
import { useSchemaSettings, useSetModelSettings } from "../store";

type ModelConfigProps = {
  model: DMMF.Model;
};

const modelActions = ["create", "update", "delete", "filter"] as const;

export type ModelOptions = {
  title?: string;
  idField?: string;
  displayFields?: string[];
  actions?: Partial<Record<typeof modelActions[number], boolean>>;
  fields?: Record<
    string,
    {
      title?: string;
      position?: number;
      width?: string;
      tableView?: {
        read?: boolean;
        filter?: boolean;
        sort?: boolean;
      };
      actions?: {
        read?: boolean;
        create?: boolean;
        update?: boolean;
      };
    }
  >;
};
export default function ModelConfig({ model }: ModelConfigProps) {
  // const [modelSettings, setModelSettings] = React.useState<ModelOptions>({});
  // const { setModelSettings } = useSetModelSettings({ model })
  const setState = useSchemaSettings(s => s.setState)
  const modelSettingsState: ModelOptions | undefined = useSchemaSettings(s => s.models[model.name])
  const modelSettings = modelSettingsState || {}
  const schema = useGetSchema2();
  const { loading, refetch } = schema
  const { reFetchObservableQueries } = useApolloClient()
  const customizations = 'customizations' in schema ? schema.customizations : undefined
  const [runUpdate] = useUpdatePrismaTable();
  // const data = usePrismaTable()

  const saveSettings = async () => {
    const configPart = {
      [model.name]: modelSettings,
    };
    const runt = await runUpdate({
      variables: { config: JSON.stringify(configPart) },
    });
    // re populate cache
    await reFetchObservableQueries();
  };

  if (loading) return <div>Loading...</div>;

  const defaultTitle = customizations?.[model.name]?.title;
  const title = modelSettings.title || defaultTitle || ""

  const defaultIdField = customizations?.[model.name]?.idField;
  const defaultDisplayFields = customizations?.[model.name]?.displayFields;

  const idFields = model.fields
    .filter((el) => el.isUnique || el.isId)
    .map((el) => ({ id: el.name, name: el.name }));
  const selectedIdFieldId = modelSettings.idField || defaultIdField;
  const selectedIdFields = idFields.find((el) => el.name === selectedIdFieldId);

  const displayFieldsOptions = model.fields.map((el) => ({
    id: el.name,
    name: el.name,
  }));
  const displayFieldsSelectedId =
    modelSettings.displayFields || defaultDisplayFields;
  const displayFieldsValue = displayFieldsOptions.filter((el) =>
    displayFieldsSelectedId?.includes(el.name)
  );

  return (
    <div className="bg-white p-4">
      <div className="text-lg font-medium">{model.name}</div>
      <div className="flex flex-col gap-2">
        <div>
          <Input
            type="text"
            label="Title"
            value={title}
            onChange={(e) => {
              setState(old => {
                const config = old.models[model.name]
                if (!config) {
                  old.models[model.name] = { title: e.target.value }
                  return
                }
                config.title = e.target.value
              })
              // const { setModelSettings } = useSetModelSettings()
            }}
          />
        </div>
        <div>
          <Label>ID Field</Label>
          <Select
            onChange={(e) => {
              setState(old => {
                const config = old.models[model.name]
                if (!config) {
                  old.models[model.name] = { idField: e.id }
                  return
                }
                config.idField = e.id

                // const config = old.models[model.name] || {}
                // config.idField = e.id
              })
            }}
            options={idFields}
            value={selectedIdFields}
            popupFullWidth
          />
        </div>
        <div>
          <Label>Display Fields</Label>
          <Select
            value={displayFieldsValue}
            popupFullWidth
            onChange={(e) => {
              const isSelected = modelSettings.displayFields?.find(
                (el) => el === e.id
              );

              // Remove
              if (isSelected) {
                setState(old => {
                  const config = old.models[model.name]
                  const newDisplayFields = [...(config?.displayFields || [])].filter(
                    (el) => !el.includes(e.id)
                  )
                  if (!config) {
                    old.models[model.name] = { displayFields: newDisplayFields }
                    return
                  }
                  config.displayFields = newDisplayFields
                })
                return;
              }

              // Add
              setState(old => {
                const config = old.models[model.name]
                const newDisplayFields = [...(config?.displayFields || []), e.id]
                if (!config) {
                  old.models[model.name] = { displayFields: newDisplayFields }
                  return
                }
                config.displayFields = newDisplayFields
              })
            }}
            options={displayFieldsOptions}
          />
        </div>
        <div>
          <Label>Actions</Label>
          <div className="flex gap-4 capitalize">
            {modelActions.map((modelAction) => {
              const checked = (() => {
                if (typeof modelSettings.actions?.[modelAction] === "boolean") return modelSettings.actions?.[modelAction]
                if (customizations?.[model.name]?.actions?.[modelAction] === false) return false
                return true
              })()

              return (
                <Input
                  key={modelAction}
                  fullWidth={false}
                  type="checkbox"
                  checked={checked} // default checked
                  onChange={(e) => {
                    setState(old => {
                      const config = old.models[model.name]

                      if (!config) {
                        old.models[model.name] = { actions: {[modelAction]: !!e.target.checkValidity} }
                        return
                      }

                      config.actions = {
                        ...config.actions,
                        [modelAction]: !!e.target.checked,
                      }
                    })
                  }}
                  label={modelAction}
                />
              );
            })}
          </div>
        </div>
        <Button onClick={saveSettings}>Save</Button>
      </div>
    </div>
  );
}
