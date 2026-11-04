import '@testing-library/jest-dom/vitest'

const createStorage = () => {
  const store = new Map()

  return {
    getItem(key) {
      return store.has(key) ? String(store.get(key)) : null
    },
    setItem(key, value) {
      store.set(String(key), String(value))
    },
    removeItem(key) {
      store.delete(String(key))
    },
    clear() {
      store.clear()
    },
    key(index) {
      return Array.from(store.keys())[index] ?? null
    },
    get length() {
      return store.size
    },
  }
}

if (!globalThis.window) {
  throw new Error('window is required for the test environment')
}

if (!window.localStorage) {
  const storage = createStorage()

  Object.defineProperty(window, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  })

  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  })
}
