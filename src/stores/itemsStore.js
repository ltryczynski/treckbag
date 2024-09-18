import { create } from "zustand";
import { initialItems } from "../lib/lib";
import { persist } from "zustand/middleware";

export const useItemStore = create(persist((set) => ({
    items: initialItems,

    addItem: (newItemText) => {
        set(state => {
            const newItem = {
                id: new Date().getTime(),
                name: newItemText,
                packed: false,
            };

            const newItems = [...state.items, newItem];

            return { items: newItems }
        })
    },
    removeAllItems: () => {
        set(() => ({ items: [] }))
    },
    deleteItem: (id) => {
        set((state) => {
            const newItems = state.items.filter((item) => item.id !== id);
            return { items: newItems };
        })
    },

    toggleItem: (id) => {
        set(state => {
            const newItems = state.items.map((item) => {
                if (item.id === id) return { ...item, packed: !item.packed };
                return item;
            });
            return { items: newItems }
        })
    },

    resetToInitial: () => {
        set(() => ({ items: initialItems }));
    },

    markAllAsComplete: () => {
        set((state) => {
            const markedItems = state.items.map((item) => ({
                ...item,
                packed: true,
            }));
            return { items: markedItems };
        })
    },

    markAllAsIncomplete: () => {
        set(state => {
            const markedItems = state.items.map((item) => ({
                ...item,
                packed: false,
            }));
            return { items: markedItems };
        });
    },
}),
    {
        name: "items"
    }

));