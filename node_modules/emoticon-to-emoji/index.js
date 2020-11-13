const tree = require('./tree');

/**
 * Greedily replace emoticons with emoji symbols, using `tree` to aid lookup.
 */
function replaceEmoticons(text, boundary = /\s/, padSpaceAfter = false) {
  let active = true;
  let matches = [];
  text = Array.from(text);
  pad = padSpaceAfter ? ' ' : '';

  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    // console.debug(`prefix=${text.slice(0,i)}, c=${c}, active=${active}`);
    if(c.match(boundary)) {
      active = true;
      continue;
    }
    if(active) {
      let level = tree;
      let currentMatch;
      let s = i;

      while(level[c] && i < text.length) {
        level = level[c];
        if(level['M']) {
          currentMatch = level['M'];
        }
        i++;
        c = text[i];
      }
      if(currentMatch) {
        matches.push([s, i, currentMatch]);
        active = true;
        i--;
        continue;
      }
    }
    active = false;
  }

  for(let m of matches.reverse()) {
    text.splice(m[0], m[1] - m[0], m[2] + pad);
  }
  return text.join('');
}

module.exports = { replaceEmoticons, tree };
