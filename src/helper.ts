//Local Storage
export const fetchData = (key: string): string => {
  return JSON.parse(localStorage.getItem(key) || "false");
};

export const deleteItem = ({ key }: { key: string }) => {
  localStorage.removeItem(key);
};
