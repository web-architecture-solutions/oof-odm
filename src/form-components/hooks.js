import { useState } from "react";

export function useKey() {
    const [key, setKey] = useState(1);
    const incrementKey = () => setKey(({ key }) => ({ key: key + 1 }));
    return { key, incrementKey };
}