export const selectBench = ({ benches, reviews }, id) => {
   const bench = benches[id] || {};
   bench.reviews = [];
   for (let id in reviews) {
     bench.reviews.push(reviews[id])
   }
   return bench
}

export const asArray = ({ benches }) => Object.keys(benches).map(key => benches[key]);
