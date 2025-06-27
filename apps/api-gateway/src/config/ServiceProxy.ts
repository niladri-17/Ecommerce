import { Application } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { config } from ".";
import { AppLogger } from "@packages/loggers";
import { ProxyErrorResponse, ServiceConfig } from "../types";
import { Http } from "@packages/config";

class ServiceProxy {
  private static readonly serviceConfigs: ServiceConfig[] = [
    {
      path: "/api/v1/auth/",
      url: config.AUTH_SERVICE_URL,
      pathRewrite: { "^/": "/" },
      name: "auth-service",
      timeout: 5000,
    },
  ];

  private static createProxyOptions(service: ServiceConfig): Options {
    return {
      target: service.url,
      changeOrigin: true,
      pathRewrite: service.pathRewrite,
      timeout: service.timeout || config.DEFAULT_TIMEOUT,
      logger: AppLogger,
      on: {
        error: ServiceProxy.handleProxyError,
        proxyReq: ServiceProxy.handleProxyRequest,
        proxyRes: ServiceProxy.handleProxyResponse,
      },
    };
  }

  private static handleProxyError(err: Error, req: any, res: any): void {
    AppLogger.error(`Proxy error for ${req.path}:`, err);

    const errorResponse: ProxyErrorResponse = {
      message: "Service unavailable",
      status: 503,
      timestamp: new Date().toISOString(),
    };

    res
      .status(Http.errors["SERVICE_UNAVAILABLE"])
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(errorResponse));
  }

  private static handleProxyRequest(proxyReq: any, req: any): void {
    // logger.debug(`Proxying request to ${req.path}`);
  }

  private static handleProxyResponse(proxyRes: any, req: any): void {
    // logger.debug(`Received response for ${req.path}`);
  }

  public static setupProxy(app: Application): void {
    ServiceProxy.serviceConfigs.forEach((service) => {
      const proxyOptions = ServiceProxy.createProxyOptions(service);
      app.use(service.path, createProxyMiddleware(proxyOptions));
      AppLogger.info(`Configured proxy for ${service.name} at ${service.path}`);
    });
  }
}

export const proxyServices = (app: Application): void => {
  ServiceProxy.setupProxy(app);
};
