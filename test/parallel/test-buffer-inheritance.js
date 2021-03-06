'use strict';

require('../common');
const assert = require('assert');


function T(n) {
  const ui8 = new Uint8Array(n);
  Object.setPrototypeOf(ui8, T.prototype);
  return ui8;
}
Object.setPrototypeOf(T.prototype, Buffer.prototype);
Object.setPrototypeOf(T, Buffer);

T.prototype.sum = function sum() {
  let cntr = 0;
  for (let i = 0; i < this.length; i++)
    cntr += this[i];
  return cntr;
};


const vals = [new T(4), T(4)];

vals.forEach(function(t) {
  assert.equal(t.constructor, T);
  assert.equal(t.__proto__, T.prototype);
  assert.equal(t.__proto__.__proto__, Buffer.prototype);

  t.fill(5);
  let cntr = 0;
  for (let i = 0; i < t.length; i++)
    cntr += t[i];
  assert.equal(t.length * 5, cntr);

  // Check this does not throw
  t.toString();
});
