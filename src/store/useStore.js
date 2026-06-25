import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware'

const EMPTY_BUCKET_LIST = {
  dream: [],
  upcoming: [],
  visited: [],
}

function destinationLabel(dest) {
  return dest?.name ?? dest?.label ?? 'Destination'
}

function itemId(item) {
  return item?.id ?? item?.name
}

const useStore = create(
  subscribeWithSelector(
    persist(
      (set) => ({
        activeDestination: null,
        activePins: [],
        bucketList: { ...EMPTY_BUCKET_LIST },
        panelOpen: false,
        activeTab: 'overview',
        expandedCard: null,
        audioMuted: false,
        isFlying: false,
        breadcrumb: ['Elsewhere'],
        cameraZ: 2.8,
        lastAISuggestion: '',

        setActiveDestination: (dest) =>
          set({
            activeDestination: dest,
            panelOpen: true,
            breadcrumb: ['Elsewhere', destinationLabel(dest)],
            activeTab: 'overview',
            expandedCard: null,
          }),

        closePanel: () =>
          set({
            activeDestination: null,
            panelOpen: false,
            breadcrumb: ['Elsewhere'],
            activeTab: 'overview',
            expandedCard: null,
          }),

        setActiveTab: (tab) => set({ activeTab: tab }),

        setExpandedCard: (card) => set({ expandedCard: card }),

        toggleMute: () => set((state) => ({ audioMuted: !state.audioMuted })),

        setIsFlying: (bool) => set({ isFlying: bool }),

        setCameraZ: (z) => set({ cameraZ: z }),

        addToBucketList: (dest, category) =>
          set((state) => {
            const list = state.bucketList[category] ?? []
            const id = itemId(dest)
            if (list.some((entry) => itemId(entry) === id)) return state
            return {
              bucketList: {
                ...state.bucketList,
                [category]: [...list, dest],
              },
            }
          }),

        removeFromBucketList: (id, category) =>
          set((state) => ({
            bucketList: {
              ...state.bucketList,
              [category]: (state.bucketList[category] ?? []).filter(
                (entry) => itemId(entry) !== id
              ),
            },
          })),

        moveBucketItem: (id, fromCat, toCat) =>
          set((state) => {
            const fromList = state.bucketList[fromCat] ?? []
            const item = fromList.find((entry) => itemId(entry) === id)
            if (!item) return state

            const toList = state.bucketList[toCat] ?? []
            if (toList.some((entry) => itemId(entry) === id)) return state

            return {
              bucketList: {
                ...state.bucketList,
                [fromCat]: fromList.filter((entry) => itemId(entry) !== id),
                [toCat]: [...toList, item],
              },
            }
          }),

        setLastAISuggestion: (text) => set({ lastAISuggestion: text }),

        pushBreadcrumb: (label) =>
          set((state) => ({ breadcrumb: [...state.breadcrumb, label] })),

        popBreadcrumb: () =>
          set((state) => ({
            breadcrumb:
              state.breadcrumb.length > 1
                ? state.breadcrumb.slice(0, -1)
                : state.breadcrumb,
          })),
      }),
      {
        name: 'elsewhere-bucket-list',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ bucketList: state.bucketList }),
      }
    )
  )
)

export default useStore
export { useStore }

export const useActiveDestination = () => useStore((s) => s.activeDestination)
export const usePanelOpen = () => useStore((s) => s.panelOpen)
export const useBucketList = () => useStore((s) => s.bucketList)
export const useIsFlying = () => useStore((s) => s.isFlying)
export const useCameraZ = () => useStore((s) => s.cameraZ)
export const useLastAISuggestion = () => useStore((s) => s.lastAISuggestion)
