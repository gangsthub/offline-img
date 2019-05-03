import localForage from 'localforage'

const keyValueStore = {
  get: key => localForage.getItem(key),
  set: (key, val) => localForage.setItem(key, val),
  delete: key => localForage.removeItem(key)
}

export default keyValueStore