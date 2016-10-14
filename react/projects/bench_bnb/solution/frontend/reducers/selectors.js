export const selectBench = ({ benches }, id) => benches[id] || {};

export const asArray = ({ benches }) => Object.keys(benches).map(key => benches[key]);
