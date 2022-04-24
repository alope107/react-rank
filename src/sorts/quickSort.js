/**
 * Does a  quicksort bit by bit. It non-blockingly delegates
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
function* quickSort(arr, updateArr, updatePair) {
  function swap(i, j) {
    arr = [...arr];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    updateArr(arr);
  }

  function* partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      updatePair([arr[j], pivot]);
      const shouldSwap = yield;
      if (shouldSwap) {
        i++;
        swap(i, j);
      }
    }

    swap(i + 1, high);

    return i + 1;
  }

  function* quickSortHelper(low, high) {
    if (low < high) {
      const pivotIndex = yield* partition(low, high);
      yield* quickSortHelper(low, pivotIndex - 1);
      yield* quickSortHelper(pivotIndex + 1, high);
    }
  }

  yield* quickSortHelper(0, arr.length - 1);
}

export default quickSort;
