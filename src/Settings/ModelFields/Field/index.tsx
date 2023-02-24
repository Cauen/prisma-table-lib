import * as React from "react";
import { DMMF } from "@prisma/generator-helper";
import Input from "../../../shared/components/Input";
import { useUpdatePrismaTable } from "../../ModelConfig/graphql/update";
import { ModelOptions } from "../../ModelConfig";
import useGetSchema2 from "../../../shared/data/useGetSchema2";
import Label from "../../../shared/components/Label";
import Button from "../../../shared/components/Button";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useApolloClient } from "@apollo/client";

type FieldProps = {
  field: DMMF.Field;
  model: DMMF.Model;
};

type FieldOptions = NonNullable<ModelOptions["fields"]>[string];
export default function Field({ field, model }: FieldProps) {
  const [runUpdate] = useUpdatePrismaTable();
  const schema = useGetSchema2();
  const customizations = 'customizations' in schema ? schema.customizations : undefined
  const { reFetchObservableQueries } = useApolloClient()
  const defaultField = customizations?.[model.name]?.fields?.[field.name];
  const [options, setOptions] = React.useState<FieldOptions>(
    defaultField || {}
  );

  const saveSettings = async () => {
    const configPart = {
      [model.name]: {
        fields: {
          [field.name]: options,
        },
      },
    };
    const runt = await runUpdate({
      variables: { config: JSON.stringify(configPart) },
    });
    // re populate cache
    await reFetchObservableQueries();
  };

  return (
    <Disclosure>
      {/* {JSON.stringify(defaultField)} */}
      {({ open }) => {
        const Eye = open ? EyeIcon : EyeOffIcon;

        return (
          <>
            <Disclosure.Button className="flex w-full align-middle justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
              <span className="text-lg font-medium">
                {options.title || field.name}
              </span>
              <div className="flex gap-2">
                <ChevronDownIcon className={`h-6 w-6 text-indigo-500`} />
                <ChevronUpIcon className={`h-6 w-6 text-indigo-500`} />
                <Eye className={`h-6 w-6 text-indigo-500`} />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className="flex flex-col gap-2">
                <div>
                  <Label>Field name:</Label>
                  <span>
                    {field.name} {field.dbNames ? `(db: ${field.dbNames})` : ""}
                  </span>
                </div>
                <Input
                  defaultValue={options.title}
                  onChange={(e) =>
                    setOptions((old) => ({ ...old, title: e.target.value }))
                  }
                  label="Display Name"
                />
                <Input
                  defaultValue={options.position}
                  type="number"
                  onChange={(e) =>
                    setOptions((old) => ({ ...old, position: Number(e.target.value) }))
                  }
                  label="Position"
                />
                <Input
                  defaultValue={options.width}
                  onChange={(e) =>
                    setOptions((old) => ({ ...old, width: e.target.value }))
                  }
                  label="Width"
                />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Table View</Label>
                  <Input
                    type="checkbox"
                    defaultChecked={options.tableView?.read !== false} // default checked
                    onChange={(e) => {
                      setOptions((old) => ({
                        ...old,
                        tableView: {
                          ...(old.tableView || {}),
                          read: !!e.target.checked,
                        },
                      }));
                    }}
                    label="Read"
                  />
                  <Input
                    type="checkbox"
                    defaultChecked={options.tableView?.filter !== false} // default checked
                    onChange={(e) => {
                      setOptions((old) => ({
                        ...old,
                        tableView: {
                          ...(old.tableView || {}),
                          filter: !!e.target.checked,
                        },
                      }));
                    }}
                    label="Filter"
                  />
                  <Input
                    type="checkbox"
                    defaultChecked={options.tableView?.sort !== false} // default checked
                    onChange={(e) => {
                      setOptions((old) => ({
                        ...old,
                        tableView: {
                          ...(old.tableView || {}),
                          sort: !!e.target.checked,
                        },
                      }));
                    }}
                    label="Sort"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Actions</Label>
                  <Input
                    type="checkbox"
                    defaultChecked={options.actions?.create !== false} // default checked
                    onChange={(e) => {
                      setOptions((old) => ({
                        ...old,
                        actions: {
                          ...(old.actions || {}),
                          create: !!e.target.checked,
                        },
                      }));
                    }}
                    label="Create"
                  />
                  <Input
                    type="checkbox"
                    defaultChecked={options.actions?.update !== false} // default checked
                    onChange={(e) => {
                      setOptions((old) => ({
                        ...old,
                        actions: {
                          ...(old.actions || {}),
                          update: !!e.target.checked,
                        },
                      }));
                    }}
                    label="Update"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="w-40" onClick={saveSettings}>
                  Save
                </Button>
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
}
