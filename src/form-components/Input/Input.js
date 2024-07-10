import { forwardRef } from "react";

const Input = (props, ref)  => <input {...props} ref={ref} />;

export default forwardRef(Input);