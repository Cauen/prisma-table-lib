import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { WritableDraft } from "immer/dist/internal";
import { immer } from "zustand/middleware/immer";
import { ModelOptions } from "./ModelConfig";
import { DMMF } from "@prisma/generator-helper";
import useGetSchema2 from "../shared/data/useGetSchema2";

export interface SchemaSettingsActions {
  setState: (updater: (state: WritableDraft<State>) => void) => void;
  deleteEverything: () => void;
}

type State = {
  models: Record<string, ModelOptions | undefined>;
  selectedSchema: string | undefined;
};
const initialState: State = {
  models: {},
  selectedSchema: undefined,
};

export const useSchemaSettings = create<State & SchemaSettingsActions>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
          ...initialState,
          deleteEverything: () =>
            set({ ...initialState }, undefined, "deleteEverything"),
          setState: (e: any) => set(e, undefined, "setState"),
        }),
        {
          name: "useSchemaSettings",
        }
      )
    ),
    {
      name: "useSchemaSettings",
      serialize: true,
      enabled: true,
      anonymousActionType: "useSchemaSettingsAnon",
    }
  )
);

export const useModalSettings = ({ model }: { model: DMMF.Model }) => {
  const models = useSchemaSettings((s) => s.models);
  const { data: { customizations } } = useGetSchema2()

}

export const useSetModelSettings = ({ model }: { model: DMMF.Model }) => {
  const setState = useSchemaSettings((s) => s.setState);

  const setModelSettings = (partial: ModelOptions) => {
    setState((old) => {
      old.models[model.name] = partial;
    });
  };

  return { setModelSettings };
};
