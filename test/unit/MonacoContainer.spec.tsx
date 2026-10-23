import { render } from '@testing-library/react';
import { createRef } from 'react';

import MonacoContainer from '../../src/MonacoContainer';

describe('<MonacoContainer />', () => {
  it('should check render with snapshot', () => {
    const component = render(
      <MonacoContainer width="100%" height="100vh" _ref={createRef()} loading="loading..." isEditorReady={false} />
    );

    expect(component).toMatchSnapshot();
  });
});
