import { useEffect } from 'react';
import includes from 'lodash/includes';
import castArray from 'lodash/castArray';

/**
 * Usage: `useKeyListener(['Esc', 'Escape'], closeModal);`
 */
export default (keys, eventHandler, dependencies = []) => (
  useEffect(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const keyArray = castArray(keys);

    const handleOnEscape = (e) => {
      if (includes(keyArray, e.key)) {
        eventHandler(e);
      }
    };

    document.addEventListener('keyup', handleOnEscape);

    return () => document.removeEventListener('keyup', handleOnEscape);
  }, dependencies)
);
