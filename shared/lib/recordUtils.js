export const createEmptyCompositeItem = () => ({
  name: "",
  price: "",
});

export const createCompositeSummary = (items, emptyText) => {
  const names = items
    .map((item) => item.name.trim())
    .filter(Boolean);

  return names.length > 0 ? names.join(" && ") : emptyText;
};

export const calculateItemsTotal = (items, extraCost = 0) => {
  const itemsTotal = items.reduce((sum, item) => {
    const price = Number(item.price);
    return Number.isFinite(price) ? sum + price : sum;
  }, 0);

  const extra = Number(extraCost);
  return Number((itemsTotal + (Number.isFinite(extra) ? extra : 0)).toFixed(2));
};

export const formatDateValue = (value) => {
  if (!value) {
    return "--";
  }

  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
};

export const sortRecords = (records, config) => {
  return [...records].sort((first, second) => {
    const secondNumber = Number(second?.[config.numberKey] ?? 0);
    const firstNumber = Number(first?.[config.numberKey] ?? 0);
    return secondNumber - firstNumber;
  });
};

export const getNextNumber = (records, config) => {
  const highestNumber = records.reduce((max, item) => {
    const currentNumber = Number(item?.[config.numberKey] ?? 0);
    return currentNumber > max ? currentNumber : max;
  }, 0);

  return highestNumber + 1;
};
