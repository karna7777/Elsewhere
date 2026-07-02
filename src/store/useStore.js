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

const VISITED_MAX = 10

// Breadcrumb is DERIVED from levelHistory — the single navigation backbone.
// Shape: ['Elsewhere', <continent>, <country>, <root.name>, ...drilled children].
// The continent/country come from the root level only; every deeper level adds
// its own label. This keeps the rich hero context line while making each level
// node addressable for trim-navigation.
function buildBreadcrumb(levelHistory) {
  if (!levelHistory.length) return ['Elsewhere']
  const root = levelHistory[0]
  const context = ['Elsewhere', root.continent, root.country].filter(Boolean)
  return [...context, ...levelHistory.map(destinationLabel)]
}

// Newest-first, unique ids, capped at VISITED_MAX.
function pushVisited(list, id) {
  if (id == null) return list
  return [id, ...list.filter((x) => x !== id)].slice(0, VISITED_MAX)
}

const useStore = create(
  subscribeWithSelector(
    persist(
      (set) => ({
        // BACKWARDS-COMPAT ONLY. levelHistory + its tail (activeLocation) are the
        // real source of truth; activeDestination is kept as a synchronized mirror
        // of levelHistory[last] for existing consumers and is slated for removal.
        // Do not build new features against it.
        activeDestination: null,
        activePins: [],
        bucketList: { ...EMPTY_BUCKET_LIST },
        // Bucket List panel visibility. In-memory only — never persisted, so the
        // panel always starts closed on load (only bucketList contents survive).
        bucketPanelOpen: false,
        panelOpen: false,
        activeTab: 'overview',
        expandedCard: null,
        audioMuted: false,
        isFlying: false,
        layoutState: 'globe', // 'globe' | 'flying' | 'location'
        breadcrumb: ['Elsewhere'],
        // Navigation backbone. Invariant maintained everywhere:
        //   activeDestination === levelHistory[levelHistory.length - 1]  (or null)
        levelHistory: [],
        // Recently visited node ids — newest first, unique, max 10.
        visitedHistory: [],
        // Active discovery lens (presentation only — never owns navigation).
        // Resets to 'nearby' whenever a new level is entered.
        discoveryFilter: 'nearby',
        // Ellie conversation state (12B-A). ellieStreamText holds the in-flight
        // streamed reply; ellieHistory is the rolling user/assistant transcript.
        ellieMode: 'guide', // 'guide' | 'discovery'
        ellieHistory: [],
        ellieStreamText: '',
        // Sticky conversation subject (12D-A) so follow-ups keep refining the same
        // thread: guide | planner | food | photography | history | culture |
        // weather | general. Updated after each successful reply. In-memory only.
        ellieConversationTopic: 'general',
        // True between send and the first streamed token — drives the "thinking"
        // indicator. Never persisted.
        ellieThinking: false,
        cameraZ: 2.8,
        lastAISuggestion: '',
        // Latest visible Ellie sentence for the persistent AIStrip (12C-B). Holds
        // ONLY the most recent successfully-completed reply (JSON-free, ≤120 chars).
        // Never persisted, no history, no streaming state — just the one line the
        // strip shows. Updated solely on successful completion, never mid-stream.
        lastEllieSuggestion: '',

        // Entry point (search, Surprise Me, pins, AI, bucket list). RESETS the
        // navigation stack to a single root level. Callers pass a node already
        // resolved by NodeResolver; a raw dataset object still works (it just
        // won't carry the normalized `type`/`id`/`_resolved`). Synchronous: no
        // resolution happens in here.
        setActiveDestination: (dest) =>
          set((state) => {
            const levelHistory = dest ? [dest] : []
            return {
              levelHistory,
              activeDestination: dest ?? null,
              panelOpen: !!dest,
              breadcrumb: buildBreadcrumb(levelHistory),
              visitedHistory: dest
                ? pushVisited(state.visitedHistory, itemId(dest))
                : state.visitedHistory,
              // Any activeLocation change starts on the Nearby lens.
              discoveryFilter: 'nearby',
              activeTab: 'overview',
              expandedCard: null,
            }
          }),

        // Recursive exploration: drill into an already-resolved child node.
        // APPENDS a level (keeping the invariant activeDestination === tail).
        // Reuses the EXISTING camera system — CameraRig subscribes to
        // activeDestination and flies automatically when the node carries
        // coordinates; nodes without lat/lng simply hold the globe in place (we
        // never invent coordinates). Synchronous — resolution happens at the
        // call site via resolveNode().
        pushLevel: (node) =>
          set((state) => {
            if (!node) return state
            const levelHistory = [...state.levelHistory, node]
            return {
              levelHistory,
              activeDestination: node,
              panelOpen: true,
              breadcrumb: buildBreadcrumb(levelHistory),
              visitedHistory: pushVisited(state.visitedHistory, itemId(node)),
              // Every newly entered location starts on the Nearby lens.
              discoveryFilter: 'nearby',
              activeTab: 'overview',
              expandedCard: null,
            }
          }),

        // Jump straight to a level (breadcrumb click). Trims levelHistory to the
        // clicked index and updates activeDestination in ONE transition — never a
        // sequence of popLevel() calls. CameraRig then animates directly there.
        goToLevel: (index) =>
          set((state) => {
            if (index < 0 || index >= state.levelHistory.length) return state
            const levelHistory = state.levelHistory.slice(0, index + 1)
            const tail = levelHistory[levelHistory.length - 1] ?? null
            return {
              levelHistory,
              activeDestination: tail,
              breadcrumb: buildBreadcrumb(levelHistory),
              // Jumping to another level changes activeLocation → reset the lens.
              discoveryFilter: 'nearby',
              activeTab: 'overview',
              expandedCard: null,
            }
          }),

        // Convenience: step up one level (keeps at least the root).
        popLevel: () =>
          set((state) => {
            if (state.levelHistory.length <= 1) return state
            const levelHistory = state.levelHistory.slice(0, -1)
            const tail = levelHistory[levelHistory.length - 1]
            return {
              levelHistory,
              activeDestination: tail,
              breadcrumb: buildBreadcrumb(levelHistory),
              // Re-entering the parent level resets to the Nearby lens.
              discoveryFilter: 'nearby',
              activeTab: 'overview',
              expandedCard: null,
            }
          }),

        closePanel: () =>
          set({
            levelHistory: [],
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

        setLayoutState: (state) => set({ layoutState: state }),

        // Discovery is presentation only — switching the lens never navigates.
        setDiscoveryFilter: (id) => set({ discoveryFilter: id }),

        // Ellie (12B-A). Plain setters — the streaming/cap logic lives in EllieModule.
        setEllieMode: (mode) => set({ ellieMode: mode }),
        setEllieHistory: (history) => set({ ellieHistory: history }),
        setEllieStreamText: (text) => set({ ellieStreamText: text }),
        setEllieConversationTopic: (topic) => set({ ellieConversationTopic: topic }),
        setEllieThinking: (thinking) => set({ ellieThinking: thinking }),

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

        // Bucket mutations (14B). Canonical names used by the Bucket Panel.
        // addToBucket enforces a single home per id: adding an item that already
        // lives in another category MOVES it (remove old → insert new), never
        // duplicates. Only categories that actually change get a new array
        // reference, so unaffected columns don't re-render.
        addToBucket: (item, category) =>
          set((state) => {
            const id = itemId(item)
            if (id == null) return state
            const bl = state.bucketList
            const next = { ...bl }
            let changed = false
            for (const cat of Object.keys(bl)) {
              if (cat === category) continue
              if (bl[cat].some((e) => itemId(e) === id)) {
                next[cat] = bl[cat].filter((e) => itemId(e) !== id)
                changed = true
              }
            }
            const target = next[category] ?? []
            if (target.some((e) => itemId(e) === id)) {
              return changed ? { bucketList: next } : state
            }
            next[category] = [...target, item] // append — preserve insertion order
            return { bucketList: next }
          }),

        // Remove by id from wherever it lives (category-agnostic). Only rebuilds
        // the category that actually held the item.
        removeFromBucket: (id) =>
          set((state) => {
            const bl = state.bucketList
            for (const cat of Object.keys(bl)) {
              if (bl[cat].some((e) => itemId(e) === id)) {
                return {
                  bucketList: {
                    ...bl,
                    [cat]: bl[cat].filter((e) => itemId(e) !== id),
                  },
                }
              }
            }
            return state
          }),

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

        // Bucket List panel controls (14A). Data mutation (add/remove/move) is
        // handled by the existing bucket actions above; these only drive the shell.
        openBucketPanel: () => set({ bucketPanelOpen: true }),
        closeBucketPanel: () => set({ bucketPanelOpen: false }),
        toggleBucketPanel: () =>
          set((state) => ({ bucketPanelOpen: !state.bucketPanelOpen })),
        setBucketList: (nextBucketList) => set({ bucketList: nextBucketList }),

        setLastAISuggestion: (text) => set({ lastAISuggestion: text }),

        setLastEllieSuggestion: (text) => set({ lastEllieSuggestion: text }),

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
        // Only the bucket list persists. visitedHistory is intentionally
        // in-memory (Zustand only): it exists solely to stop Surprise Me from
        // immediately repeating, so it neither needs nor wants to survive a
        // browser/tab restart.
        partialize: (state) => ({ bucketList: state.bucketList }),
      }
    )
  )
)

export default useStore
export { useStore }

export const useActiveDestination = () => useStore((s) => s.activeDestination)
export const useLevelHistory = () => useStore((s) => s.levelHistory)
export const useVisitedHistory = () => useStore((s) => s.visitedHistory)
export const useDiscoveryFilter = () => useStore((s) => s.discoveryFilter)
// Forward-looking source-of-truth accessor (the levelHistory tail). New code
// should prefer this over activeDestination, which is being phased out.
export const useActiveLocation = () =>
  useStore((s) => s.levelHistory[s.levelHistory.length - 1] ?? null)
export const usePanelOpen = () => useStore((s) => s.panelOpen)
export const useBucketList = () => useStore((s) => s.bucketList)
export const useIsFlying = () => useStore((s) => s.isFlying)
export const useCameraZ = () => useStore((s) => s.cameraZ)
export const useLastAISuggestion = () => useStore((s) => s.lastAISuggestion)
