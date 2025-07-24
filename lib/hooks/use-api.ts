import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '@/lib/api/client';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(
  apiCall: () => Promise<{ data: T }>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall();
      setState({ data: response.data, loading: false, error: null });
      onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError(0, 'Unknown error');
      setState({ data: null, loading: false, error: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [apiCall, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const refetch = useCallback(() => execute(), [execute]);

  return {
    ...state,
    execute,
    refetch,
  };
}

export function useMutation<T, P = any>(
  apiCall: (params: P) => Promise<{ data: T }>,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(async (params: P) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall(params);
      setState({ data: response.data, loading: false, error: null });
      onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError(0, 'Unknown error');
      setState(prev => ({ ...prev, loading: false, error: apiError }));
      onError?.(apiError);
      throw apiError;
    }
  }, [apiCall, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}

// Pagination hook
export function usePagination<T>(
  apiCall: (params: any) => Promise<{ data: T[]; meta: any }>,
  initialParams: any = {}
) {
  const [params, setParams] = useState({ page: 1, per_page: 10, ...initialParams });
  const [allData, setAllData] = useState<T[]>([]);
  const [meta, setMeta] = useState<any>(null);

  const { data, loading, error, execute } = useApi(
    () => apiCall(params),
    {
      onSuccess: (response) => {
        if (params.page === 1) {
          setAllData(response.data);
        } else {
          setAllData(prev => [...prev, ...response.data]);
        }
        setMeta(response.meta);
      }
    }
  );

  const loadMore = useCallback(() => {
    if (meta && params.page < meta.last_page) {
      setParams(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [meta, params.page]);

  const refresh = useCallback(() => {
    setParams(prev => ({ ...prev, page: 1 }));
    setAllData([]);
  }, []);

  const updateParams = useCallback((newParams: any) => {
    setParams(prev => ({ ...prev, ...newParams, page: 1 }));
    setAllData([]);
  }, []);

  return {
    data: allData,
    meta,
    loading,
    error,
    loadMore,
    refresh,
    updateParams,
    hasMore: meta ? params.page < meta.last_page : false,
  };
}