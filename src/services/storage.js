export const save = (key, value) => {
  const now = Date.now();
  const item = {
    value,
    timestamp: now,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const get = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = Date.now();
    const ONE_HOUR = 3600000;

    if (now - item.timestamp > ONE_HOUR) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
};

export const remove = (key) => {
  localStorage.removeItem(key);
};
