// localStorageUtil.ts
export const saveArrayToLocalStorage = <T>(key: string, array: T[]): void => {
    localStorage.setItem(key, JSON.stringify(array));
};
  
export const getArrayFromLocalStorage = <T>(key: string): T[] => {
    const storedArray = localStorage.getItem(key);
    return storedArray ? JSON.parse(storedArray) : [];
};