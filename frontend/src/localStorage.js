export const getFromLocalStorage = (id) => {
  return JSON.parse(localStorage.getItem(id));
};

export const setLocalStorage = (id, data) => {
  return localStorage.setItem(id, JSON.stringify(data));
};