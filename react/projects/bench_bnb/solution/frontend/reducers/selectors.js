export const selectBench = (benches, id) => benches[id] || {};

export const asArray = (obj) => Object.keys(obj).map(key => obj[key]);