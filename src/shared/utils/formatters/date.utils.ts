export const formatDate = (value: string): string => {
  const dateObject = new Date(value);
  return dateObject.toLocaleDateString('en-CA').replace(/-/g, '/');
};
