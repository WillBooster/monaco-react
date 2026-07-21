import DiffEditor from '../../src/DiffEditor';
import { render } from '@testing-library/react';

describe('<DiffEditor />', () => {
  it('should check render with snapshot', () => {
    const component = render(<DiffEditor />);

    expect(component).toMatchSnapshot();
  });
});
