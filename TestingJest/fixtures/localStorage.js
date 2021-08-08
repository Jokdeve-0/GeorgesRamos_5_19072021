class LocalStorageMock {
  constructor() {
    this.storage = {}
  }

  clear() {
    this.storage = {}
  }

  
  setItem(key, value) {
    this.storage[key] = key = String(value)
  }
  
  getItem(key) {
    const arKeys = Object.keys(this.storage)
    for (let i = 0; i < arKeys.length; i++) {
      return key == arKeys[i] ? this.storage[key] : false
    }
  }

  removeItem(key) {
    delete this.storage[key]
  }
};

module.exports = LocalStorageMock