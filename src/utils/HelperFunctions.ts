export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const removeFalsyValues = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
};

export const formatDate = (timeStamp: string) => {
  const date = new Date(timeStamp);
  const formattedTimestamp = date.toLocaleString("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return formattedTimestamp.replace(", ", " / ");
};
