const fs = require('fs');
const emoticon = require('emoticon');

const emoticons = Object.fromEntries(emoticon // Flat hash of emoticon -> emoji.
    .map(spec => spec.emoticons.map(code => [code, spec.emoji])).flat()
    .sort((a, b) => a[0].length > b[0].length ? 1 : a[0].length === b[0].length ? 0 : -1));

function buildTree() {
  const tree = {};
  for (let [emoticon, emoji] of Object.entries(emoticons).reverse()) {
    mergeTree(tree, emoticon, emoji);
  }
  return tree;
}

function mergeTree(s, t, u) {
  t = Array.from(t);
  var [c, r] = [t[0], t.slice(1)]
  s[c] = s[c] || {};
  if(!r.length) {
    s[c] = { ...s[c], ...{ 'M': u } };
  } else {
    s[c] = mergeTree(s[c], r, u)
  }
  return s;
}


fs.writeFileSync('./tree.json', JSON.stringify(buildTree()));
