type ClassValue =
  | string
  | { [key: string]: boolean }
  | undefined
  | null
  | false;

function cx(...args: ClassValue[]): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === "string" && arg) {
      classes.push(arg);
    } else if (typeof arg === "object" && arg !== null) {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(" ");
}

export default cx;
