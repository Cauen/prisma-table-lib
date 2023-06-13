import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
// import { produce } from 'immer'
import { WritableDraft } from 'immer/dist/internal'
import { immer } from 'zustand/middleware/immer'

type ModelName = string // User, Post
type FieldName = string // id, name
type InputEntries = Record<FieldName, any> | undefined
type State = { create: Record<ModelName, InputEntries>, update: Record<ModelName, InputEntries> & { _touchedFields: string[] } }

interface Actions {
  deleteEverything: () => void
  setState: (updater: (state: WritableDraft<State>) => void) => void
  setFieldValue: (props: { modelName: string, fieldName: string, value: any, type: "create" | "update" }) => void
}

const initialState: State = {
  create: {},
  update: {
    _touchedFields: [],
  },
}

export const useCreate = create<State & Actions>()(
  devtools(
    immer(
      persist(
        (set, get) => (
          {
            ...initialState,
            deleteEverything: () => set({ ...initialState }, undefined, 'deleteEverything'),
            setState: (e: any) => set(e, undefined, 'setState'),
            setFieldValue: ({ fieldName, modelName, type = "create", value }: { modelName: string, fieldName: string, value: any, type: "create" | "update" }) => set(state => {
              if (type === "update") {
                state.update._touchedFields.push(fieldName)
              }
              
              const modelObject = state[type][modelName]
              if (modelObject) {
                modelObject[fieldName] = value
              } else {
                state[type][modelName] = { [fieldName]: value }
              }
            }, undefined, 'setFieldValue'),
          }
        ), {
        name: "prismaTableCreate",
      })
    ),
    { name: "prismaTableCreate", serialize: true, enabled: true, anonymousActionType: 'prismaTableCreateAnon' }
  )
)