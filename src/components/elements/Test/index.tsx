import React from 'react';

interface Props {
  name: string;
  age: number;
}

const TestComponent = (props: Props) => {
  const { name } = props;
  return (
    <div>
    </div>
  );
}

// const name = test;

/**
 * Vim is awesome
 */

export default TestComponent;