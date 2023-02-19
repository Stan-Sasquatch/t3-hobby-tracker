type NavProps = { path: string; title: string; disabled?: boolean };

export type Navigation<T extends string> = Record<T, NavProps>;
export type WrapperProps = { children: React.ReactNode };
