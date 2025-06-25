interface IConfig {
  SERVICE_NAME: string;
  PORT: number;
}

export default {
  SERVICE_NAME: String(process.env.SERVICE_NAME) || "auth-service",
  PORT: Number(process.env.PORT) || 6001,
} as const satisfies IConfig;
