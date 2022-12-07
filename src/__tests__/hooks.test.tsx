import { render } from '@testing-library/react';
import React from 'react';
import { useInSection } from '../use_in_section';

const HookComponent = (): JSX.Element => {
  const { currentSection } = useInSection({});

  return (
    <div id="wrapper">
      {currentSection?.id}
      <section>1</section>
      <section>2</section>
    </div>
  );
};

test('should create a hook', () => {
  const { container } = render(<HookComponent />);

  expect(container.tagName).toBe('DIV');
});
