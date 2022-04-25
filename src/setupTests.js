// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock the console error to catch prop-types issues
const originalConsoleError = console.error;

console.error = (...args) => {
  // TODO(auberon): Have another go at only failing on errors generated
  // by prop-types
  originalConsoleError(...args);
  throw new Error("Error printed to console (likely propTypes issue)");
};
