import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { produce } from 'immer'
import { WritableDraft } from 'immer/dist/internal'
import { immer } from 'zustand/middleware/immer'

interface LayerOptions {
    type?: "centered" | "slide-over" | "notification",
    category?: "Model" // Model, ...
}
export interface ModalActions {
    closeOne: () => void
    closeAll: () => void
    addLayer: (layer: LayerCreateInput) => void
    setState: (updater: (state: WritableDraft<State>) => void) => void
}

interface Layer {
    Component: JSX.Element
    id: string // uniqueID of the layer
    // type?: string // classification of this Layer, ex: "read-user-4"
    options?: LayerOptions
}
type LayerCreateInput = Partial<Omit<Layer, "Component" | "id">> & Pick<Layer, "Component">
type State = {
    layers: Layer[]
}
const initialState: State = {
    layers: []
}

export const useModal = create<State & ModalActions>()(
    devtools(
        immer(
            (set, get) => (
                {
                    ...initialState,
                    // close: () => set({ ...initialState }, undefined, 'deleteEverything'),
                    closeOne: () => set(old => {
                        const [first, ...rest] = old.layers
                        old.layers = rest
                    }, undefined, 'closeOne'),
                    addLayer: (layer) => set(old => {
                        const newLayerId = `${+new Date}${Math.floor(Math.random() * 100)}`
                        old.layers = [{ ...layer, id: newLayerId }, ...old.layers]
                    }, undefined, 'addLayer'),
                    closeAll: () => set({ layers: [] }, undefined, 'closeAll'),
                    setState: (e: any) => set(e, undefined, 'setState'),
                }
            )
        ),
        { name: "modal", serialize: true, enabled: true, anonymousActionType: 'modalAnon' }
    )
)