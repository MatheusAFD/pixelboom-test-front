'use server'

export type RequestConfig<TData = unknown> = {
  baseURL?: string
  url?: string
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
  params?: Record<string, unknown>
  data?: TData | FormData
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
  signal?: AbortSignal
  headers?: HeadersInit
  cache?: RequestCache
}

export type ResponseConfig<TData = unknown, TError = unknown> =
  | [TError, null]
  | [null, TData]

export const httpClientFetch = async <
  TData,
  TError = unknown,
  TVariables = unknown
>({
  baseURL = import.meta.env.VITE_API_URL,
  ...config
}: RequestConfig<TVariables>): Promise<ResponseConfig<TData, TError>> => {
  const response = await fetch(`${baseURL}${config.url}`, {
    method: config.method.toUpperCase(),
    body: config.data ? JSON.stringify(config.data) : undefined,
    signal: config.signal,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json',
    },
    cache: config.cache,
  })

  const data = await response.json()

  if (!response.ok) {
    return [data as TError, null]
  }

  return [null, data as TData]
}
