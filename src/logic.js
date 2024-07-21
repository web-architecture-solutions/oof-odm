export const AND = (...args) => args.every((arg) => Boolean(arg) === true);
export const OR  = (...args) =>  args.some((arg) => Boolean(arg) === true);