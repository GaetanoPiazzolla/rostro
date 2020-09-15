'use strict';

let roughSizeOfObject = function (object) {

  let objectList = [];
  let stack = [object];
  let bytes = 0;

  while (stack.length) {
    let value = stack.pop();

    if (typeof value === 'boolean') {
      bytes += 4;
    } else if (typeof value === 'string') {
      bytes += value.length * 2;
    } else if (typeof value === 'number') {
      bytes += 8;
    } else if
    (
      typeof value === 'object'
      && objectList.indexOf(value) === -1
    ) {
      objectList.push(value);

      for (const i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;

};

// function to calculate average of array
let arrAvg = function (arr) {
  if (arr && arr.length >= 1) {
    const sumArr = arr.reduce((a, b) => a + b, 0);
    return sumArr / arr.length;
  }
};

module.exports = {
  roughSizeOfObject: roughSizeOfObject,
  arrAvg: arrAvg
};
