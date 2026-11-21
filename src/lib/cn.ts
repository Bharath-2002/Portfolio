export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
export const ease = [0.23, 1, 0.32, 1] as const;
