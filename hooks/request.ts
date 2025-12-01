import { useCallback, useEffect, useState } from "react";

export interface IRequestHook<T> {
    data: T,
    loading: boolean,
    error: string | null,

    retryFn: () => void
}

export function useRequest<T>(fetchFn: () => Promise<T>, defaultValue: any, callOnAwake: boolean = false): IRequestHook<T> {
    const [data, setData] = useState<T>(defaultValue);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const callback = useCallback(() => {
        setIsLoading(true);
        setError(null);

        fetchFn()
            .then(res => {
                setData((res as any).data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err);
            })
    }, []);

    useEffect(() => {
        if(callOnAwake)
            callback();
        else
            setIsLoading(false);
    }, []);

    return { data, loading, error, retryFn: callback };
}