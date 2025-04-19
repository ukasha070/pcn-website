import { baseUrl } from "./constants";

const baseApiUrl = baseUrl;

type HttpMethod = "GET" | "POST";

interface ApiOptions<T> {
  endpoint: string;
  method?: HttpMethod;
  body?: T;
  headers?: HeadersInit;
}

export async function callApi<TResponse = any, TRequest = any>({
  endpoint,
  method = "GET",
  body,
  headers = {},
}: ApiOptions<TRequest>): Promise<TResponse> {
  console.log(baseApiUrl);
  try {
    const response = await fetch(`${baseApiUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: method === "POST" ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let errorBody: any = null;

      try {
        // Try parsing error response as JSON
        errorBody = await response.json();
      } catch {
        // Fallback to plain text
        errorBody = await response.text();
      }

      const error = new Error("API Error");
      (error as any).status = response.status;
      (error as any).data = errorBody;
      throw error;
    }

    const data = await response.json();
    return data as TResponse;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}
