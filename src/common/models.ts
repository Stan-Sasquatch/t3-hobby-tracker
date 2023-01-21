type NavProps = { path: string; title: string };

export type Navigation<T extends string> = Record<T, NavProps>;
export type WrapperProps = { children: React.ReactNode };
