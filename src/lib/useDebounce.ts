import { useEffect, useCallback, DependencyList } from "react";

const useDebounce = (
    effect: () => void,
    dependencies: DependencyList,
    delay: number
): void => {
    // If you add effect to the dependencies array, it will run on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(effect, dependencies);

    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [callback, delay]);
};

export default useDebounce;