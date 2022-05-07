import funkySort from "./funkySort";
import { commonSortTest } from "./sorting.test";

// FunkySort does not currently support sorting lists with duplicates.
commonSortTest("funkySort", funkySort, false);
