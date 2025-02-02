export const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)) || [],
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  addItem: (key, item) => {
    const items = storage.get(key);
    if (!items.some((saved) => saved.id === item.id)) {
      storage.set(key, [...items, item]);
    }
  },
  removeItem: (key, item) => {
    storage.set(
      key,
      storage.get(key).filter((i) => i.id !== item.id)
    );
  },
};
