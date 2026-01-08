/**
 * API Gateway Service
 * Centralized API management, rate limiting, and request routing
 */

// HTTP method
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

// API status
type ApiStatus = 'healthy' | 'degraded' | 'down' | 'maintenance';

// Rate limit strategy
type RateLimitStrategy = 'fixed_window' | 'sliding_window' | 'token_bucket' | 'leaky_bucket';

// Auth type
type AuthType = 'none' | 'api_key' | 'bearer' | 'basic' | 'oauth2' | 'hmac';

// API key status
type ApiKeyStatus = 'active' | 'suspended' | 'expired' | 'revoked';

// Request priority
type RequestPriority = 'critical' | 'high' | 'normal' | 'low';

// API endpoint
interface ApiEndpoint {
  id: string;
  path: string;
  method: HttpMethod;
  name: string;
  description: string;
  version: string;
  service: string;
  isEnabled: boolean;
  isPublic: boolean;
  authType: AuthType;
  requiredPermissions: string[];
  rateLimit?: RateLimitConfig;
  timeout: number; // in ms
  retries: number;
  caching?: CacheConfig;
  validation?: ValidationConfig;
  transformation?: TransformConfig;
  cors?: CorsConfig;
  documentation?: EndpointDocumentation;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// Rate limit config
interface RateLimitConfig {
  strategy: RateLimitStrategy;
  limit: number;
  window: number; // in seconds
  burstLimit?: number;
  keyGenerator?: 'ip' | 'api_key' | 'user' | 'custom';
  customKeyHeader?: string;
  excludeRoles?: string[];
  responseHeaders: boolean;
}

// Cache config
interface CacheConfig {
  enabled: boolean;
  ttl: number; // in seconds
  staleWhileRevalidate?: number;
  varyBy: ('query' | 'headers' | 'auth')[];
  excludeParams?: string[];
  private: boolean;
}

// Validation config
interface ValidationConfig {
  enabled: boolean;
  schema?: Record<string, unknown>;
  strictMode: boolean;
  coerceTypes: boolean;
  removeAdditional: boolean;
}

// Transform config
interface TransformConfig {
  request?: {
    headers?: Record<string, string>;
    body?: Record<string, unknown>;
  };
  response?: {
    headers?: Record<string, string>;
    body?: Record<string, unknown>;
  };
}

// CORS config
interface CorsConfig {
  allowOrigins: string[];
  allowMethods: HttpMethod[];
  allowHeaders: string[];
  exposeHeaders: string[];
  maxAge: number;
  credentials: boolean;
}

// Endpoint documentation
interface EndpointDocumentation {
  summary: string;
  description: string;
  tags: string[];
  parameters: ParameterDoc[];
  requestBody?: RequestBodyDoc;
  responses: ResponseDoc[];
  examples?: ExampleDoc[];
}

// Parameter documentation
interface ParameterDoc {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required: boolean;
  type: string;
  description: string;
  default?: unknown;
  enum?: unknown[];
}

// Request body documentation
interface RequestBodyDoc {
  required: boolean;
  contentType: string;
  schema: Record<string, unknown>;
  description: string;
}

// Response documentation
interface ResponseDoc {
  statusCode: number;
  description: string;
  contentType?: string;
  schema?: Record<string, unknown>;
}

// Example documentation
interface ExampleDoc {
  name: string;
  request?: Record<string, unknown>;
  response?: Record<string, unknown>;
}

// API key
interface ApiKey {
  id: string;
  key: string;
  keyHash: string;
  name: string;
  description?: string;
  ownerId: string;
  ownerType: 'user' | 'organization' | 'service';
  status: ApiKeyStatus;
  permissions: string[];
  rateLimit?: RateLimitConfig;
  allowedOrigins?: string[];
  allowedIPs?: string[];
  expiresAt?: Date;
  lastUsedAt?: Date;
  usageCount: number;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// API request
interface ApiRequest {
  id: string;
  timestamp: Date;
  method: HttpMethod;
  path: string;
  endpoint?: string;
  version: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body?: unknown;
  clientIP: string;
  userAgent: string;
  auth?: RequestAuth;
  priority: RequestPriority;
  correlationId: string;
  traceId?: string;
}

// Request auth
interface RequestAuth {
  type: AuthType;
  apiKeyId?: string;
  userId?: string;
  token?: string;
  scopes?: string[];
}

// API response
interface ApiResponse {
  requestId: string;
  statusCode: number;
  headers: Record<string, string>;
  body?: unknown;
  latency: number; // in ms
  cached: boolean;
  retried: number;
  error?: ApiError;
  timestamp: Date;
}

// API error
interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  stack?: string;
  retryable: boolean;
}

// Rate limit info
interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
  exceeded: boolean;
}

// Service health
interface ServiceHealth {
  serviceId: string;
  name: string;
  status: ApiStatus;
  latency: number;
  uptime: number;
  lastCheck: Date;
  endpoints: number;
  errors: number;
  version: string;
  instances: ServiceInstance[];
}

// Service instance
interface ServiceInstance {
  id: string;
  host: string;
  port: number;
  status: ApiStatus;
  weight: number;
  activeConnections: number;
  lastHealthCheck: Date;
}

// Route
interface Route {
  id: string;
  pattern: string;
  method: HttpMethod | HttpMethod[];
  target: RouteTarget;
  priority: number;
  conditions?: RouteCondition[];
  middleware: string[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Route target
interface RouteTarget {
  type: 'service' | 'url' | 'mock' | 'redirect';
  service?: string;
  url?: string;
  statusCode?: number;
  body?: unknown;
}

// Route condition
interface RouteCondition {
  type: 'header' | 'query' | 'path' | 'method' | 'ip';
  key?: string;
  operator: 'equals' | 'contains' | 'regex' | 'exists' | 'not_exists';
  value?: string;
}

// Circuit breaker config
interface CircuitBreakerConfig {
  enabled: boolean;
  threshold: number; // failure percentage
  minRequests: number;
  windowSize: number; // in seconds
  timeout: number; // open state duration in seconds
  halfOpenRequests: number;
}

// Circuit breaker state
interface CircuitBreakerState {
  serviceId: string;
  state: 'closed' | 'open' | 'half_open';
  failures: number;
  successes: number;
  lastFailure?: Date;
  lastSuccess?: Date;
  openedAt?: Date;
  closedAt?: Date;
}

// API metrics
interface ApiMetrics {
  period: { start: Date; end: Date };
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  avgLatency: number;
  p50Latency: number;
  p95Latency: number;
  p99Latency: number;
  requestsPerSecond: number;
  bytesIn: number;
  bytesOut: number;
  cacheHitRate: number;
  rateLimitExceeded: number;
  byStatusCode: { code: number; count: number }[];
  byEndpoint: { endpoint: string; count: number; avgLatency: number }[];
  byMethod: { method: HttpMethod; count: number }[];
  byClient: { clientId: string; count: number }[];
}

// Webhook config
interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  retries: number;
  timeout: number;
  headers?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

// Webhook delivery
interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  payload: unknown;
  url: string;
  status: 'pending' | 'success' | 'failed';
  statusCode?: number;
  response?: string;
  attempts: number;
  lastAttempt?: Date;
  nextRetry?: Date;
  createdAt: Date;
}

// Request log
interface RequestLog {
  id: string;
  request: Omit<ApiRequest, 'body'>;
  response: Omit<ApiResponse, 'body'>;
  requestBodySize: number;
  responseBodySize: number;
  duration: number;
  endpoint?: string;
  apiKeyId?: string;
  userId?: string;
  tags: string[];
}

// Gateway config
interface GatewayConfig {
  globalRateLimit: RateLimitConfig;
  defaultTimeout: number;
  maxRequestSize: number; // in bytes
  enableCors: boolean;
  defaultCors: CorsConfig;
  circuitBreaker: CircuitBreakerConfig;
  logging: {
    enabled: boolean;
    level: 'debug' | 'info' | 'warn' | 'error';
    logBody: boolean;
    excludePaths: string[];
  };
  security: {
    enableWaf: boolean;
    blockMalicious: boolean;
    sqlInjectionProtection: boolean;
    xssProtection: boolean;
    rateLimitByIP: boolean;
  };
  versioning: {
    defaultVersion: string;
    headerName: string;
    queryParam: string;
  };
}

// Default gateway config
const DEFAULT_GATEWAY_CONFIG: GatewayConfig = {
  globalRateLimit: {
    strategy: 'sliding_window',
    limit: 1000,
    window: 60,
    burstLimit: 50,
    keyGenerator: 'ip',
    responseHeaders: true,
  },
  defaultTimeout: 30000,
  maxRequestSize: 10 * 1024 * 1024, // 10MB
  enableCors: true,
  defaultCors: {
    allowOrigins: ['*'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    exposeHeaders: ['X-Request-Id', 'X-RateLimit-Remaining'],
    maxAge: 86400,
    credentials: false,
  },
  circuitBreaker: {
    enabled: true,
    threshold: 50,
    minRequests: 10,
    windowSize: 60,
    timeout: 30,
    halfOpenRequests: 5,
  },
  logging: {
    enabled: true,
    level: 'info',
    logBody: false,
    excludePaths: ['/health', '/metrics'],
  },
  security: {
    enableWaf: true,
    blockMalicious: true,
    sqlInjectionProtection: true,
    xssProtection: true,
    rateLimitByIP: true,
  },
  versioning: {
    defaultVersion: 'v1',
    headerName: 'X-API-Version',
    queryParam: 'version',
  },
};

class ApiGatewayService {
  private static instance: ApiGatewayService;
  private endpoints: Map<string, ApiEndpoint> = new Map();
  private apiKeys: Map<string, ApiKey> = new Map();
  private routes: Map<string, Route> = new Map();
  private services: Map<string, ServiceHealth> = new Map();
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map();
  private rateLimitBuckets: Map<string, { count: number; resetAt: Date }> = new Map();
  private requestLogs: RequestLog[] = [];
  private webhooks: Map<string, WebhookConfig> = new Map();
  private webhookDeliveries: WebhookDelivery[] = [];
  private config: GatewayConfig = DEFAULT_GATEWAY_CONFIG;
  private listeners: ((event: string, data: unknown) => void)[] = [];

  private constructor() {
    this.initializeSampleData();
  }

  public static getInstance(): ApiGatewayService {
    if (!ApiGatewayService.instance) {
      ApiGatewayService.instance = new ApiGatewayService();
    }
    return ApiGatewayService.instance;
  }

  /**
   * Initialize sample data
   */
  private initializeSampleData(): void {
    // Create sample endpoints
    const sampleEndpoints: Omit<ApiEndpoint, 'createdAt' | 'updatedAt'>[] = [
      {
        id: 'ep-alerts-list',
        path: '/api/v1/alerts',
        method: 'GET',
        name: 'List Alerts',
        description: 'Get a paginated list of alerts',
        version: 'v1',
        service: 'alert-service',
        isEnabled: true,
        isPublic: true,
        authType: 'bearer',
        requiredPermissions: ['alerts:read'],
        rateLimit: { strategy: 'sliding_window', limit: 100, window: 60, responseHeaders: true },
        timeout: 30000,
        retries: 3,
        caching: { enabled: true, ttl: 60, varyBy: ['query', 'auth'], private: false },
        metadata: {},
      },
      {
        id: 'ep-alerts-create',
        path: '/api/v1/alerts',
        method: 'POST',
        name: 'Create Alert',
        description: 'Create a new alert',
        version: 'v1',
        service: 'alert-service',
        isEnabled: true,
        isPublic: false,
        authType: 'bearer',
        requiredPermissions: ['alerts:create'],
        rateLimit: { strategy: 'fixed_window', limit: 10, window: 60, responseHeaders: true },
        timeout: 60000,
        retries: 1,
        metadata: {},
      },
      {
        id: 'ep-users-profile',
        path: '/api/v1/users/:id',
        method: 'GET',
        name: 'Get User Profile',
        description: 'Get user profile by ID',
        version: 'v1',
        service: 'user-service',
        isEnabled: true,
        isPublic: false,
        authType: 'bearer',
        requiredPermissions: ['users:read'],
        timeout: 10000,
        retries: 2,
        caching: { enabled: true, ttl: 300, varyBy: ['auth'], private: true },
        metadata: {},
      },
      {
        id: 'ep-donations-create',
        path: '/api/v1/donations',
        method: 'POST',
        name: 'Create Donation',
        description: 'Process a new donation',
        version: 'v1',
        service: 'donation-service',
        isEnabled: true,
        isPublic: true,
        authType: 'api_key',
        requiredPermissions: [],
        rateLimit: { strategy: 'token_bucket', limit: 50, window: 60, burstLimit: 10, responseHeaders: true },
        timeout: 60000,
        retries: 0,
        metadata: {},
      },
      {
        id: 'ep-health',
        path: '/health',
        method: 'GET',
        name: 'Health Check',
        description: 'API health check endpoint',
        version: 'v1',
        service: 'gateway',
        isEnabled: true,
        isPublic: true,
        authType: 'none',
        requiredPermissions: [],
        timeout: 5000,
        retries: 0,
        metadata: {},
      },
    ];

    sampleEndpoints.forEach((ep) => {
      this.endpoints.set(ep.id, { ...ep, createdAt: new Date(), updatedAt: new Date() });
    });

    // Create sample API keys
    for (let i = 1; i <= 10; i++) {
      const apiKey: ApiKey = {
        id: `key-${i.toString().padStart(6, '0')}`,
        key: `ak_${this.generateRandomString(32)}`,
        keyHash: `hash_${i}`,
        name: `API Key ${i}`,
        description: `API key for integration ${i}`,
        ownerId: `user-${i}`,
        ownerType: 'user',
        status: 'active',
        permissions: ['alerts:read', 'users:read'],
        usageCount: Math.floor(Math.random() * 10000),
        metadata: {},
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      };
      this.apiKeys.set(apiKey.id, apiKey);
    }

    // Create sample services
    const serviceNames = ['alert-service', 'user-service', 'donation-service', 'notification-service'];
    serviceNames.forEach((name, i) => {
      const health: ServiceHealth = {
        serviceId: `svc-${i + 1}`,
        name,
        status: i === 2 ? 'degraded' : 'healthy',
        latency: 50 + Math.random() * 100,
        uptime: 99.9 - Math.random() * 0.5,
        lastCheck: new Date(),
        endpoints: Math.floor(Math.random() * 10) + 5,
        errors: Math.floor(Math.random() * 10),
        version: '1.0.0',
        instances: [
          { id: `inst-${i}-1`, host: `${name}-1.internal`, port: 8080, status: 'healthy', weight: 1, activeConnections: Math.floor(Math.random() * 50), lastHealthCheck: new Date() },
          { id: `inst-${i}-2`, host: `${name}-2.internal`, port: 8080, status: 'healthy', weight: 1, activeConnections: Math.floor(Math.random() * 50), lastHealthCheck: new Date() },
        ],
      };
      this.services.set(name, health);
      this.circuitBreakers.set(name, { serviceId: name, state: 'closed', failures: 0, successes: 100 });
    });

    // Create sample request logs
    for (let i = 0; i < 1000; i++) {
      const endpoint = sampleEndpoints[i % sampleEndpoints.length];
      const log: RequestLog = {
        id: `req-${i.toString().padStart(8, '0')}`,
        request: {
          id: `req-${i}`,
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          method: endpoint.method,
          path: endpoint.path,
          endpoint: endpoint.id,
          version: 'v1',
          headers: { 'content-type': 'application/json' },
          query: {},
          clientIP: `192.168.${Math.floor(i / 256)}.${i % 256}`,
          userAgent: 'Mozilla/5.0',
          priority: 'normal',
          correlationId: `corr-${i}`,
        },
        response: {
          requestId: `req-${i}`,
          statusCode: i % 20 === 0 ? 500 : i % 10 === 0 ? 404 : 200,
          headers: {},
          latency: Math.floor(Math.random() * 500) + 20,
          cached: i % 3 === 0,
          retried: 0,
          timestamp: new Date(),
        },
        requestBodySize: Math.floor(Math.random() * 1000),
        responseBodySize: Math.floor(Math.random() * 5000),
        duration: Math.floor(Math.random() * 500) + 20,
        endpoint: endpoint.id,
        tags: [endpoint.service, endpoint.method],
      };
      this.requestLogs.push(log);
    }
  }

  /**
   * Generate random string
   */
  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  /**
   * Process request
   */
  public async processRequest(request: ApiRequest): Promise<ApiResponse> {
    const startTime = Date.now();

    try {
      // Find matching endpoint
      const endpoint = this.findEndpoint(request.path, request.method);
      if (!endpoint) {
        return this.createErrorResponse(request.id, 404, 'NOT_FOUND', 'Endpoint not found', startTime);
      }

      if (!endpoint.isEnabled) {
        return this.createErrorResponse(request.id, 503, 'SERVICE_UNAVAILABLE', 'Endpoint is disabled', startTime);
      }

      // Check circuit breaker
      const service = this.services.get(endpoint.service);
      if (service) {
        const circuitBreaker = this.circuitBreakers.get(endpoint.service);
        if (circuitBreaker?.state === 'open') {
          return this.createErrorResponse(request.id, 503, 'CIRCUIT_OPEN', 'Service temporarily unavailable', startTime);
        }
      }

      // Authenticate
      if (endpoint.authType !== 'none') {
        const authResult = await this.authenticate(request, endpoint);
        if (!authResult.success) {
          return this.createErrorResponse(request.id, 401, 'UNAUTHORIZED', authResult.error || 'Authentication failed', startTime);
        }
      }

      // Check rate limit
      if (endpoint.rateLimit) {
        const rateLimitResult = this.checkRateLimit(request, endpoint.rateLimit);
        if (rateLimitResult.exceeded) {
          return this.createErrorResponse(request.id, 429, 'RATE_LIMIT_EXCEEDED', 'Rate limit exceeded', startTime, {
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': rateLimitResult.reset.toISOString(),
            'Retry-After': String(rateLimitResult.retryAfter || 60),
          });
        }
      }

      // Check cache
      if (endpoint.caching?.enabled) {
        const cachedResponse = this.checkCache(request, endpoint);
        if (cachedResponse) {
          return { ...cachedResponse, cached: true, latency: Date.now() - startTime };
        }
      }

      // Execute request (mock)
      const response = await this.executeRequest(request, endpoint);

      // Log request
      this.logRequest(request, response, endpoint);

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      return this.createErrorResponse(request.id, 500, 'INTERNAL_ERROR', errorMessage, startTime);
    }
  }

  /**
   * Find endpoint
   */
  private findEndpoint(path: string, method: HttpMethod): ApiEndpoint | undefined {
    return Array.from(this.endpoints.values()).find((ep) => {
      if (ep.method !== method) return false;
      const pattern = ep.path.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(path);
    });
  }

  /**
   * Authenticate request
   */
  private async authenticate(request: ApiRequest, endpoint: ApiEndpoint): Promise<{ success: boolean; error?: string }> {
    switch (endpoint.authType) {
      case 'api_key':
        const apiKeyHeader = request.headers['x-api-key'];
        if (!apiKeyHeader) return { success: false, error: 'API key required' };
        const apiKey = Array.from(this.apiKeys.values()).find((k) => k.key === apiKeyHeader);
        if (!apiKey) return { success: false, error: 'Invalid API key' };
        if (apiKey.status !== 'active') return { success: false, error: 'API key is not active' };
        if (apiKey.expiresAt && apiKey.expiresAt < new Date()) return { success: false, error: 'API key expired' };
        apiKey.lastUsedAt = new Date();
        apiKey.usageCount++;
        return { success: true };

      case 'bearer':
        const authHeader = request.headers['authorization'];
        if (!authHeader?.startsWith('Bearer ')) return { success: false, error: 'Bearer token required' };
        // In production, validate JWT token
        return { success: true };

      case 'basic':
        const basicAuth = request.headers['authorization'];
        if (!basicAuth?.startsWith('Basic ')) return { success: false, error: 'Basic auth required' };
        return { success: true };

      default:
        return { success: true };
    }
  }

  /**
   * Check rate limit
   */
  private checkRateLimit(request: ApiRequest, config: RateLimitConfig): RateLimitInfo {
    const key = this.getRateLimitKey(request, config);
    const now = new Date();
    const windowMs = config.window * 1000;

    let bucket = this.rateLimitBuckets.get(key);
    if (!bucket || bucket.resetAt < now) {
      bucket = { count: 0, resetAt: new Date(now.getTime() + windowMs) };
    }

    bucket.count++;
    this.rateLimitBuckets.set(key, bucket);

    const remaining = Math.max(0, config.limit - bucket.count);
    const exceeded = bucket.count > config.limit;

    return {
      limit: config.limit,
      remaining,
      reset: bucket.resetAt,
      retryAfter: exceeded ? Math.ceil((bucket.resetAt.getTime() - now.getTime()) / 1000) : undefined,
      exceeded,
    };
  }

  /**
   * Get rate limit key
   */
  private getRateLimitKey(request: ApiRequest, config: RateLimitConfig): string {
    switch (config.keyGenerator) {
      case 'api_key':
        return `rl:${request.auth?.apiKeyId || 'anonymous'}`;
      case 'user':
        return `rl:${request.auth?.userId || 'anonymous'}`;
      case 'custom':
        return `rl:${request.headers[config.customKeyHeader || 'x-client-id'] || 'anonymous'}`;
      default:
        return `rl:${request.clientIP}`;
    }
  }

  /**
   * Check cache
   */
  private checkCache(request: ApiRequest, endpoint: ApiEndpoint): ApiResponse | null {
    // In production, check actual cache
    return null;
  }

  /**
   * Execute request
   */
  private async executeRequest(request: ApiRequest, endpoint: ApiEndpoint): Promise<ApiResponse> {
    const startTime = Date.now();

    // Simulate latency
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 20));

    return {
      requestId: request.id,
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'x-request-id': request.id,
      },
      body: { success: true, data: {} },
      latency: Date.now() - startTime,
      cached: false,
      retried: 0,
      timestamp: new Date(),
    };
  }

  /**
   * Create error response
   */
  private createErrorResponse(
    requestId: string,
    statusCode: number,
    code: string,
    message: string,
    startTime: number,
    headers: Record<string, string> = {}
  ): ApiResponse {
    return {
      requestId,
      statusCode,
      headers: {
        'content-type': 'application/json',
        'x-request-id': requestId,
        ...headers,
      },
      body: { error: { code, message } },
      latency: Date.now() - startTime,
      cached: false,
      retried: 0,
      error: { code, message, retryable: statusCode >= 500 },
      timestamp: new Date(),
    };
  }

  /**
   * Log request
   */
  private logRequest(request: ApiRequest, response: ApiResponse, endpoint: ApiEndpoint): void {
    const log: RequestLog = {
      id: `log-${Date.now()}`,
      request: { ...request, body: undefined },
      response: { ...response, body: undefined },
      requestBodySize: 0,
      responseBodySize: 0,
      duration: response.latency,
      endpoint: endpoint.id,
      apiKeyId: request.auth?.apiKeyId,
      userId: request.auth?.userId,
      tags: [endpoint.service, endpoint.method],
    };

    this.requestLogs.push(log);
    if (this.requestLogs.length > 100000) {
      this.requestLogs = this.requestLogs.slice(-50000);
    }

    this.emit('request_logged', log);
  }

  /**
   * Create API key
   */
  public async createApiKey(data: {
    name: string;
    description?: string;
    ownerId: string;
    ownerType: ApiKey['ownerType'];
    permissions: string[];
    expiresAt?: Date;
    rateLimit?: RateLimitConfig;
    allowedOrigins?: string[];
    allowedIPs?: string[];
  }): Promise<ApiKey> {
    const id = `key-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;
    const key = `ak_${this.generateRandomString(32)}`;

    const apiKey: ApiKey = {
      id,
      key,
      keyHash: Buffer.from(key).toString('base64'),
      name: data.name,
      description: data.description,
      ownerId: data.ownerId,
      ownerType: data.ownerType,
      status: 'active',
      permissions: data.permissions,
      rateLimit: data.rateLimit,
      allowedOrigins: data.allowedOrigins,
      allowedIPs: data.allowedIPs,
      expiresAt: data.expiresAt,
      usageCount: 0,
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.apiKeys.set(id, apiKey);
    this.emit('api_key_created', apiKey);

    return apiKey;
  }

  /**
   * Revoke API key
   */
  public revokeApiKey(keyId: string): boolean {
    const apiKey = this.apiKeys.get(keyId);
    if (!apiKey) return false;

    apiKey.status = 'revoked';
    apiKey.updatedAt = new Date();

    this.emit('api_key_revoked', apiKey);
    return true;
  }

  /**
   * Get API keys
   */
  public getApiKeys(ownerId?: string): ApiKey[] {
    let keys = Array.from(this.apiKeys.values());
    if (ownerId) {
      keys = keys.filter((k) => k.ownerId === ownerId);
    }
    return keys.map((k) => ({ ...k, key: `${k.key.substr(0, 8)}...` })); // Mask key
  }

  /**
   * Register endpoint
   */
  public registerEndpoint(data: Omit<ApiEndpoint, 'id' | 'createdAt' | 'updatedAt'>): ApiEndpoint {
    const id = `ep-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;
    const endpoint: ApiEndpoint = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.endpoints.set(id, endpoint);
    this.emit('endpoint_registered', endpoint);

    return endpoint;
  }

  /**
   * Get endpoints
   */
  public getEndpoints(service?: string): ApiEndpoint[] {
    let endpoints = Array.from(this.endpoints.values());
    if (service) {
      endpoints = endpoints.filter((e) => e.service === service);
    }
    return endpoints;
  }

  /**
   * Get service health
   */
  public getServiceHealth(serviceName?: string): ServiceHealth[] {
    if (serviceName) {
      const health = this.services.get(serviceName);
      return health ? [health] : [];
    }
    return Array.from(this.services.values());
  }

  /**
   * Get metrics
   */
  public getMetrics(period: { start: Date; end: Date }): ApiMetrics {
    const periodLogs = this.requestLogs.filter(
      (log) => log.request.timestamp >= period.start && log.request.timestamp <= period.end
    );

    const latencies = periodLogs.map((l) => l.duration).sort((a, b) => a - b);
    const successLogs = periodLogs.filter((l) => l.response.statusCode < 400);
    const cachedLogs = periodLogs.filter((l) => l.response.cached);

    const byStatusCode = new Map<number, number>();
    const byEndpoint = new Map<string, { count: number; totalLatency: number }>();
    const byMethod = new Map<HttpMethod, number>();
    const byClient = new Map<string, number>();

    periodLogs.forEach((log) => {
      byStatusCode.set(log.response.statusCode, (byStatusCode.get(log.response.statusCode) || 0) + 1);

      if (log.endpoint) {
        const ep = byEndpoint.get(log.endpoint) || { count: 0, totalLatency: 0 };
        ep.count++;
        ep.totalLatency += log.duration;
        byEndpoint.set(log.endpoint, ep);
      }

      byMethod.set(log.request.method, (byMethod.get(log.request.method) || 0) + 1);

      const clientId = log.apiKeyId || log.userId || log.request.clientIP;
      byClient.set(clientId, (byClient.get(clientId) || 0) + 1);
    });

    const durationMs = period.end.getTime() - period.start.getTime();
    const durationSeconds = durationMs / 1000;

    return {
      period,
      totalRequests: periodLogs.length,
      successfulRequests: successLogs.length,
      failedRequests: periodLogs.length - successLogs.length,
      avgLatency: latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0,
      p50Latency: latencies[Math.floor(latencies.length * 0.5)] || 0,
      p95Latency: latencies[Math.floor(latencies.length * 0.95)] || 0,
      p99Latency: latencies[Math.floor(latencies.length * 0.99)] || 0,
      requestsPerSecond: periodLogs.length / durationSeconds,
      bytesIn: periodLogs.reduce((sum, l) => sum + l.requestBodySize, 0),
      bytesOut: periodLogs.reduce((sum, l) => sum + l.responseBodySize, 0),
      cacheHitRate: periodLogs.length > 0 ? (cachedLogs.length / periodLogs.length) * 100 : 0,
      rateLimitExceeded: periodLogs.filter((l) => l.response.statusCode === 429).length,
      byStatusCode: Array.from(byStatusCode.entries()).map(([code, count]) => ({ code, count })),
      byEndpoint: Array.from(byEndpoint.entries()).map(([endpoint, data]) => ({
        endpoint,
        count: data.count,
        avgLatency: data.totalLatency / data.count,
      })),
      byMethod: Array.from(byMethod.entries()).map(([method, count]) => ({ method, count })),
      byClient: Array.from(byClient.entries())
        .map(([clientId, count]) => ({ clientId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    };
  }

  /**
   * Get request logs
   */
  public getRequestLogs(filters?: {
    endpoint?: string;
    method?: HttpMethod;
    statusCode?: number;
    clientIP?: string;
    dateRange?: { start: Date; end: Date };
  }, page: number = 1, pageSize: number = 50): { logs: RequestLog[]; total: number } {
    let logs = [...this.requestLogs];

    if (filters?.endpoint) {
      logs = logs.filter((l) => l.endpoint === filters.endpoint);
    }

    if (filters?.method) {
      logs = logs.filter((l) => l.request.method === filters.method);
    }

    if (filters?.statusCode) {
      logs = logs.filter((l) => l.response.statusCode === filters.statusCode);
    }

    if (filters?.clientIP) {
      logs = logs.filter((l) => l.request.clientIP === filters.clientIP);
    }

    if (filters?.dateRange) {
      logs = logs.filter((l) =>
        l.request.timestamp >= filters.dateRange!.start && l.request.timestamp <= filters.dateRange!.end
      );
    }

    logs.sort((a, b) => b.request.timestamp.getTime() - a.request.timestamp.getTime());

    const total = logs.length;
    const startIndex = (page - 1) * pageSize;

    return {
      logs: logs.slice(startIndex, startIndex + pageSize),
      total,
    };
  }

  /**
   * Get config
   */
  public getConfig(): GatewayConfig {
    return { ...this.config };
  }

  /**
   * Update config
   */
  public updateConfig(updates: Partial<GatewayConfig>): void {
    this.config = { ...this.config, ...updates };
    this.emit('config_updated', this.config);
  }

  /**
   * Subscribe to events
   */
  public subscribe(callback: (event: string, data: unknown) => void): () => void {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) this.listeners.splice(index, 1);
    };
  }

  /**
   * Emit event
   */
  private emit(event: string, data: unknown): void {
    this.listeners.forEach((callback) => callback(event, data));
  }
}

export const apiGatewayService = ApiGatewayService.getInstance();
export type {
  HttpMethod,
  ApiStatus,
  RateLimitStrategy,
  AuthType,
  ApiKeyStatus,
  RequestPriority,
  ApiEndpoint,
  RateLimitConfig,
  CacheConfig,
  ValidationConfig,
  TransformConfig,
  CorsConfig,
  EndpointDocumentation,
  ParameterDoc,
  RequestBodyDoc,
  ResponseDoc,
  ExampleDoc,
  ApiKey,
  ApiRequest,
  RequestAuth,
  ApiResponse,
  ApiError,
  RateLimitInfo,
  ServiceHealth,
  ServiceInstance,
  Route,
  RouteTarget,
  RouteCondition,
  CircuitBreakerConfig,
  CircuitBreakerState,
  ApiMetrics,
  WebhookConfig,
  WebhookDelivery,
  RequestLog,
  GatewayConfig,
};
