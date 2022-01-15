import _ from 'lodash';

export function component() {
  const element = document.createElement('div');

  element.innerHTML = _;

  return element;
}

export default component;