import { useEffect } from 'react';

const poorMansCowsay = (text) => `The cow says "${text}"`;

export default (dependencies) => useEffect(() => {
  throw Error('Ooops');
  console.log(poorMansCowsay('PHP sucks!'));

  return () => {
    console.log(poorMansCowsay('And Ruby does too!'));
  };
}, dependencies);
