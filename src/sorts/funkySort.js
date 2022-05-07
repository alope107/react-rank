// TODO(auberon): Move this to better location and get seedable random
function randInt(a, b) {
  return Math.floor(Math.random() * (b - a) + a);
}

// TODO(auberon): Move this to better location and get seedable random
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Does a funkySort sort bit by bit. It non-blockingly delegates
 * comparisons to some outside comparator. It uses updatePair
 * to denote the two items it wants compared. The outside
 * comparator should then call next on the iterator and pass
 * true if the first item in the pair should be before the second,
 * false otherwise.
 *
 * DOES NOT WORK FOR ARRAYS WITH DUPLICATE ELEMENTS
 *
 * @param {Array} arr The initial data array
 * @param {function(Array)} updateArr The state updater for arr
 * @param {function(Array)} updatePair The state updater for the pair to check
 */
function* funkySort(arr, updateArr, updatePair) {
  function swap(i, j) {
    arr = [...arr];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    updateArr(arr);
  }

  if (arr.length === 0) {
    return;
  }

  const unchecked_positions = [...Array(arr.length - 1).keys()];
  shuffleArray(unchecked_positions);
  const checked_pairs = new Set();

  while (unchecked_positions.length > 0) {
    const position_idx = randInt(0, unchecked_positions.length - 1);
    const position = unchecked_positions[position_idx];
    unchecked_positions.splice(position_idx, 1);

    const pair = [arr[position], arr[position + 1]];
    pair.sort();
    // TODO(auberon): Fix this!!! Does not properly account for items with commas
    const pairStr = pair.toString();
    if (!checked_pairs.has(pairStr)) {
      updatePair([position + 1, position]);
      const shouldSwap = yield;
      if (shouldSwap) {
        swap(position, position + 1);
        //if pos > 0 and (pos-1) not in unchecked_positions:
        if (position > 0 && !unchecked_positions.includes(position - 1)) {
          unchecked_positions.push(position - 1);
        }
        //if pos < len(data)-2 and (pos+1) not in unchecked_positions:
        if (
          position < arr.length - 2 &&
          !unchecked_positions.includes(position + 1)
        ) {
          unchecked_positions.push(position + 1);
        }
      }
      checked_pairs.add(pairStr);
    }
  }
}

export default funkySort;
