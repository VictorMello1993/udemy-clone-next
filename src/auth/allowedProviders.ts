export const allowedProviders = {
  credentials: "credentials",
  google: "google",
} as const;

export type AllowedProvider = typeof allowedProviders[keyof typeof allowedProviders];

export const allowedProvidersList: string[] = Object.values(allowedProviders);
