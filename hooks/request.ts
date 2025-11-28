import { useCallback, useEffect, useState } from "react";

export interface IRequestHook<T> {
    data: T,
    loading: boolean,
    error: string | null,

    retryFn: () => void
}

export function useGetRequest<T>(fetchFn: () => Promise<T>, defaultValue: T): IRequestHook<T> {
    const [data, setData] = useState<T>(defaultValue);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("called")
    const callback = useCallback(() => {
        setIsLoading(true);
        setError(null);

        fetchFn()
            .then(res => {
                setData(res);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err);

            })
    }, []);

    useEffect(() => {
        callback();
    }, []);

    return { data, loading, error, retryFn: callback };
}