/**
 * Does a insertion sort bit by bit. It non-blockingly delegates
 * comparisons to some outside comparator. It uses updatePair
 * to denote the two items it wants compared. The outside
 * comparator should then call next on the iterator and pass
 * true if the first item in the pair should be before the second,
 * false otherwise.
 *
 * @param {Array} arr The initial data array
 * @param {function(Array)} updateArr The state updater for arr
 * @param {function(Array)} updatePair The state updater for the pair to check
 */
function* insertionSort(arr, updateArr, updatePair) {
  function swap(i, j) {
    arr = [...arr];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    updateArr(arr);
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      // Selects pair for comparison and waits for result
      updatePair([j, j - 1]);
      const shouldSwap = yield;

      if (shouldSwap) {
        swap(j, j - 1);
      } else {
        break;
      }
    }
  }
}

export default insertionSort;
