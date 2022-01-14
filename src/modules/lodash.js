import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _;

  return element;
}