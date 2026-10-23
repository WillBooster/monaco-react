import { render } from '@testing-library/react';

import Editor from '../../src/Editor';

describe('<Editor />', () => {
  it('should check render with snapshot', () => {
    const component = render(<Editor />);

    expect(component).toMatchSnapshot();
  });
});
