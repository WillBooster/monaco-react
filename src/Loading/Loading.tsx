import type { PropsWithChildren, ReactElement } from 'react';

import styles from './styles';

function Loading({ children }: PropsWithChildren): ReactElement {
  return <div style={styles.container}>{children}</div>;
}

export default Loading;
