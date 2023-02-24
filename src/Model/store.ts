import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
// import { produce } from 'immer'
import { WritableDraft } from 'immer/dist/internal'
import { immer } from 'zustand/middleware/immer'
import { DMMF } from '@prisma/generator-helper'
import { tryParseJson } from '../shared/utils/object'
import { useModalIndex } from '../shared/components/Modal/Context'
import { useModal } from '../shared/providers/Modal/store'
import { useEffect } from 'react'

type ModelName = string // User, Post
type State = { list: Record<ModelName, { where: any }> }

interface Actions {
  deleteEverything: () => void
  setState: (updater: (state: WritableDraft<State>) => void) => void
  deleteTemp: () => void
}

const initialState: State = {
  list: {},
}

export const useList = create<State & Actions>()(
  devtools(
    immer(
      persist(
        (set, get) => (
          {
            ...initialState,
            deleteEverything: () => set({ ...initialState }, undefined, 'deleteEverything'),
            setState: (e: any) => set(e, undefined, 'setState'),
            deleteTemp: () => set(old => {
              const toRemoveIds = Object.keys(get().list).filter(el => el.startsWith(MODEL_SUBFILTER))
              for (const id of toRemoveIds) {
                delete old.list[id]
              }
          }, undefined, 'deleteTemp'),
          }
        ), {
        name: "prismaTableList",
      })
    ),
    { name: "prismaTableList", serialize: true, enabled: true, anonymousActionType: 'prismaTableListAnon' }
  )
)

type HandleIndex = (str: string) => string
const MODEL_SUBFILTER = "MODEL_SUBFILTER"
const handleIndex = (id?: string): HandleIndex => (modelName) => id ? `${MODEL_SUBFILTER}_${modelName}_${id}` : modelName

// export const useHandleClearModalFilters = () => {
//   const { layers } = useModal()
//   const toRemoveIds = useList((s) => Object.keys(s.list).filter(el => el.startsWith(MODEL_SUBFILTER)))


//   useEffect(() => {
//     const closedAll = layers.length === 0
//     // // const toRemoveIds = layers.filter(el => el.id.startsWith(MODEL_SUBFILTER))

//     // if (closedAll) {
//     // }
//     return () => {
//       // if (closedAll) {
//       // }
//     }
//   }, [layers.length])
// }

const useLastModelIndexModalID = () => {
  const { layers } = useModal()
  const id = layers.find(el => el.options?.category === "Model")?.id
  return { id }
}

const useListFilterUncontext = ({ model, handleIndex }: { model: DMMF.Model, handleIndex?: HandleIndex }) => {
  const currentIndex = model.name
  const index = handleIndex ? handleIndex(currentIndex) : currentIndex
  const modelFilter = useList((s) => s.list[index]?.where);
  return { state: modelFilter }
}

export const useListFilter = ({ model }: { model: DMMF.Model }) => {
  const { id } = useLastModelIndexModalID()
  return useListFilterUncontext({ model, handleIndex: handleIndex(id) })
}

const useSetListFilterUncontext = ({ model, handleIndex }: { model: DMMF.Model, handleIndex?: (str: string) => string }) => {
  const setModelFilter = useList((s) => s.setState);

  const set = (value: string | undefined) => {
    const valueParsed = (() => {
      if (!value) return ""

      const fixedJson = value // bad json
        // Replace ":" with "@colon@" if it's between double-quotes
        .replace(/:\s*"([^"]*)"/g, function (match, p1) {
          return ': "' + p1.replace(/:/g, "@colon@") + '"';
        })
        // Replace ":" with "@colon@" if it's between single-quotes
        .replace(/:\s*'([^']*)'/g, function (match, p1) {
          return ': "' + p1.replace(/:/g, "@colon@") + '"';
        })
        // Add double-quotes around any tokens before the remaining ":"
        .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
        // Turn "@colon@" back into ":"
        .replace(/@colon@/g, ":");
      const parsedText = tryParseJson(fixedJson);

      return parsedText
    })()

    const currentIndex = model.name
    const index = handleIndex ? handleIndex(currentIndex) : currentIndex
    setModelFilter(old => {
      if (old.list[index]) {
        old.list[index].where = valueParsed;
      } else {
        old.list[index] = { where: valueParsed };
      }
    })
  }

  return { set }
}

export const useSetListFilter = ({ model }: { model: DMMF.Model }) => {
  const { id } = useLastModelIndexModalID()
  return useSetListFilterUncontext({ model, handleIndex: handleIndex(id) })
}