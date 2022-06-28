/**
 *
 * @param {T} obj
 * @param {string[]} fields
 * @returns {T}
 */
export const parseFieldsAsDate = (obj, fields = []) => {
  if (Array.isArray(obj)) {
    return obj.map(i => parseFieldsAsDate(i, fields));
  }
  if (fields.length === 0) return obj;
  for (const field of fields) {
    const value = obj[field];
    if (typeof value === "string") {
      obj[field] = new Date(value);
    }
  }
  return obj;
};
