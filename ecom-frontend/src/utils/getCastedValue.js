export const getCastedValue = (val, options) => {
  const found = options.find((opt) => `${opt.value}` === val);
  return found?.value ?? val;
};
