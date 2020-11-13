const { expect } = require('chai');
const { replaceEmoticons } = require('./index');

/* eslint-disable no-console */

const test = [
  ['=\',-[=\',-[ :+[:) :):);) `:)`.', '😭😭 :+[:) 😃😃😉 `:)`.'],
  ['What :/?? I </3 wor:Ds :D!', 'What 😕?? I 💔 wor:Ds 😄!'],
  [']=-D]=-D]=-D]=-D]=-Dx-Px-Dx-Px-D:):):)', '😈😈😈😈😈😝😆😝😆😃😃😃'],
  ['Hey, <<3>> xxx-DDD it\'s 12:30:00 wh00p!', 'Hey, <<3>> xxx-DDD it\'s 12:30:00 wh00p!'],
  [':) when 🐶 <3 🐱 make me go :0:d', '😃 when 🐶 ❤️ 🐱 make me go 😮😛'],
];

for(let [t, e] of test) {
  let a = replaceEmoticons(t);
  console.log(t, '===', a);
  expect(a).equals(e);
}

const testPad = [
  ['=\',-[=\',-[`:)`.', '😭 😭 `:)`.'],
  [']=-D]=-D]=-D]=-D]=-D words x-Px-Dx-Px-D:):):)', '😈 😈 😈 😈 😈  words 😝 😆 😝 😆 😃 😃 😃 '],
];

for(let [t, e] of testPad) {
  let a = replaceEmoticons(t, undefined, true);
  console.log(t, '===', a);
  expect(a).equals(e);
}
