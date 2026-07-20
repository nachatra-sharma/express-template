import { AsyncLocalStorage } from "node:async_hooks";

type AsyncLocalStorageType = {
  correlationId: string;
};

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();

export const getCorrelationId = () => {
  const correlationId = asyncLocalStorage.getStore();
  return correlationId?.correlationId || "Unknown-Correlation-ID";
};
