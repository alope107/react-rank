import insertionSort from "./insertionSort";

describe("insertionSort", () => {
  const state = { arr: null, pair: null };
  const updateArr = (newArr) => (state.arr = newArr);
  const updatePair = (newPair) => (state.pair = newPair);

  /**
   * Test harness for running the sort. Calls iterator as needed and
   * provides comparisons to sort list in ascending order.
   */
  const runSort = () => {
    state.pair = null;
    const stepper = insertionSort(state.arr, updateArr, updatePair);
    // The sorter requires an inital step to get to the first comparison.
    const firstRes = stepper.next();
    if (firstRes.done) return;
    // Repeatedly passes the comparsion to the sorter until it reports iteration
    // is done.
    while (!stepper.next(state.pair[0] < state.pair[1]).done) {}
  };

  it("sorts an unsorted list", () => {
    state.arr = [4, 7, 2, -1, 5, 8, 9];
    runSort();
    expect(state.arr).toEqual([-1, 2, 4, 5, 7, 8, 9]);
  });

  it("sorts an empty list", () => {
    state.arr = [];
    runSort();
    expect(state.arr).toEqual([]);
  });

  it("sorts a fully reversed list", () => {
    state.arr = [5, 4, 3, 2, 1];
    runSort();
    expect(state.arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("sorts a list with a single element", () => {
    state.arr = [1];
    runSort();
    expect(state.arr).toEqual([1]);
  });

  it("sorts a list with duplicate elements", () => {
    state.arr = [4, 7, 2, -1, 5, 8, 4, 4, 2, 9];
    runSort();
    expect(state.arr).toEqual([-1, 2, 2, 4, 4, 4, 5, 7, 8, 9]);
  });
});
