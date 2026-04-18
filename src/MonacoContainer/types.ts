import type { ReactNode, RefObject } from 'react';

export interface ContainerProps {
  width: number | string;
  height: number | string;
  isEditorReady: boolean;
  loading: ReactNode | string;
  _ref: RefObject<HTMLDivElement | null>;
  className?: string;
  wrapperProps?: object;
}
