export default (items, key = 'id') =>
  items.reduce((prev, next) => (next[key] in prev)
    ? prev
    : (prev[next[key]] = Object.assign({}, next)) && prev
  , {});
