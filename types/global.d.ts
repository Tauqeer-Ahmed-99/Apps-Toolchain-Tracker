export {};

declare global {
  interface CustomJwtSessionClaims {
    public_metadata?: {
      appsAccess?: string[];
    };
  }
}
