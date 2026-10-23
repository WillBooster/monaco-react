import { render } from '@testing-library/react';

import DiffEditor from '../../src/DiffEditor';

describe('<DiffEditor />', () => {
  it('should check render with snapshot', () => {
    const component = render(<DiffEditor />);

    expect(component).toMatchSnapshot();
  });
});
