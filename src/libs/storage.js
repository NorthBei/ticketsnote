export const key = {
  userEmail: 'userEmail'
};

export default {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value)
};
