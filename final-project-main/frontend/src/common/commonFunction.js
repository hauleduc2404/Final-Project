class CommonFunction {
    handleLocalStorageKey(key) {
        return [window._appConfig.localStoragePrefix, key].join('.')
    }
    getLocalStorage(key) {
        return localStorage.getItem(this.handleLocalStorageKey(key));
    }
    setLocalStorage(key, value) {
        localStorage.setItem(this.handleLocalStorageKey(key), value);
    }
    removeLocalStorage(key) {
        localStorage.removeItem(this.handleLocalStorageKey(key));
    }
}
export default new CommonFunction();