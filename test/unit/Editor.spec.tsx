import Editor from '../../src/Editor';
import { render } from '@testing-library/react';

describe('<Editor />', () => {
  it('should check render with snapshot', () => {
    const component = render(<Editor />);

    expect(component).toMatchSnapshot();
  });
});
