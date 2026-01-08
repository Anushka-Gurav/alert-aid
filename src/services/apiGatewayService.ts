/**
 * API Gateway Service
 * Comprehensive API gateway management, routing, and traffic control
 */

// API Protocol
type APIProtocol = 'http' | 'https' | 'grpc' | 'websocket' | 'graphql';

// HTTP Method
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

// API Status
type APIStatus = 'active' | 'inactive' | 'deprecated' | 'draft' | 'maintenance';

// Authentication Type
type AuthenticationType = 'none' | 'api_key' | 'jwt' | 'oauth2' | 'basic' | 'mtls' | 'custom';

// Rate Limit Unit
type RateLimitUnit = 'second' | 'minute' | 'hour' | 'day';

// API Gateway
interface APIGateway {
  id: string;
  name: string;
  description: string;
  domain: string;
  basePath: string;
  version: string;
  protocol: APIProtocol;
  environment: GatewayEnvironment;
  configuration: GatewayConfiguration;
  security: GatewaySecurity;
  routing: GatewayRouting;
  middleware: GatewayMiddleware[];
  monitoring: GatewayMonitoring;
  deployment: GatewayDeployment;
  documentation: GatewayDocumentation;
  status: APIStatus;
  metadata: GatewayMetadata;
}

// Gateway Environment
interface GatewayEnvironment {
  type: 'development' | 'staging' | 'production';
  region: string;
  cluster: string;
  replicas: number;
  resources: ResourceAllocation;
  variables: Record<string, string>;
}

// Resource Allocation
interface ResourceAllocation {
  cpu: string;
  memory: string;
  maxConnections: number;
  maxRequestsPerSecond: number;
}

// Gateway Configuration
interface GatewayConfiguration {
  timeout: TimeoutConfig;
  retry: RetryConfig;
  circuitBreaker: CircuitBreakerConfig;
  cors: CORSConfig;
  compression: CompressionConfig;
  requestSize: RequestSizeConfig;
  logging: LoggingConfig;
  caching: CachingConfig;
}

// Timeout Config
interface TimeoutConfig {
  connection: number;
  read: number;
  write: number;
  idle: number;
  requestTimeout: number;
}

// Retry Config
interface RetryConfig {
  enabled: boolean;
  maxRetries: number;
  retryableStatusCodes: number[];
  retryableMethods: HTTPMethod[];
  backoff: BackoffConfig;
}

// Backoff Config
interface BackoffConfig {
  type: 'fixed' | 'exponential' | 'linear';
  initial: number;
  maximum: number;
  multiplier: number;
}

// Circuit Breaker Config
interface CircuitBreakerConfig {
  enabled: boolean;
  threshold: number;
  timeout: number;
  halfOpenRequests: number;
  failureRateThreshold: number;
  slowCallRateThreshold: number;
  slowCallDuration: number;
}

// CORS Config
interface CORSConfig {
  enabled: boolean;
  allowedOrigins: string[];
  allowedMethods: HTTPMethod[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  allowCredentials: boolean;
  maxAge: number;
}

// Compression Config
interface CompressionConfig {
  enabled: boolean;
  minSize: number;
  algorithms: ('gzip' | 'deflate' | 'br')[];
  mimeTypes: string[];
}

// Request Size Config
interface RequestSizeConfig {
  maxBodySize: number;
  maxHeaderSize: number;
  maxURILength: number;
}

// Logging Config
interface LoggingConfig {
  enabled: boolean;
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'json' | 'text' | 'clf';
  includeHeaders: boolean;
  includeBody: boolean;
  sensitiveFields: string[];
  destination: string;
}

// Caching Config
interface CachingConfig {
  enabled: boolean;
  defaultTTL: number;
  maxSize: number;
  varyHeaders: string[];
  cacheControl: boolean;
  store: 'memory' | 'redis' | 'memcached';
}

// Gateway Security
interface GatewaySecurity {
  authentication: AuthenticationConfig;
  authorization: AuthorizationConfig;
  rateLimiting: RateLimitConfig;
  ipFiltering: IPFilterConfig;
  waf: WAFConfig;
  encryption: EncryptionConfig;
}

// Authentication Config
interface AuthenticationConfig {
  type: AuthenticationType;
  required: boolean;
  providers: AuthProvider[];
  tokenLocation: 'header' | 'query' | 'cookie';
  tokenName: string;
  passthrough: boolean;
}

// Auth Provider
interface AuthProvider {
  id: string;
  name: string;
  type: AuthenticationType;
  config: AuthProviderConfig;
  enabled: boolean;
}

// Auth Provider Config
interface AuthProviderConfig {
  issuer?: string;
  audience?: string;
  jwksUri?: string;
  clientId?: string;
  clientSecret?: string;
  scopes?: string[];
  validationRules?: ValidationRule[];
}

// Validation Rule
interface ValidationRule {
  claim: string;
  operator: 'equals' | 'contains' | 'matches' | 'exists';
  value?: string;
}

// Authorization Config
interface AuthorizationConfig {
  enabled: boolean;
  type: 'rbac' | 'abac' | 'custom';
  policyEngine: string;
  policies: AuthPolicy[];
  defaultAction: 'allow' | 'deny';
}

// Auth Policy
interface AuthPolicy {
  id: string;
  name: string;
  description: string;
  rules: PolicyRule[];
  priority: number;
  enabled: boolean;
}

// Policy Rule
interface PolicyRule {
  id: string;
  resource: string;
  action: string;
  effect: 'allow' | 'deny';
  conditions?: PolicyCondition[];
}

// Policy Condition
interface PolicyCondition {
  attribute: string;
  operator: string;
  value: string | number | boolean;
}

// Rate Limit Config
interface RateLimitConfig {
  enabled: boolean;
  defaultLimit: RateLimit;
  plans: RateLimitPlan[];
  keyExtractor: 'ip' | 'api_key' | 'user' | 'custom';
  responseHeaders: boolean;
  burstAllowed: boolean;
}

// Rate Limit
interface RateLimit {
  requests: number;
  period: RateLimitUnit;
  burstSize?: number;
}

// Rate Limit Plan
interface RateLimitPlan {
  id: string;
  name: string;
  description: string;
  limits: RateLimit[];
  quotas: Quota[];
  features: string[];
  price?: number;
}

// Quota
interface Quota {
  name: string;
  limit: number;
  period: 'day' | 'month' | 'year';
  resetBehavior: 'rolling' | 'calendar';
}

// IP Filter Config
interface IPFilterConfig {
  enabled: boolean;
  mode: 'whitelist' | 'blacklist';
  rules: IPFilterRule[];
  geoBlocking: GeoBlockingConfig;
}

// IP Filter Rule
interface IPFilterRule {
  id: string;
  type: 'ip' | 'cidr' | 'range';
  value: string;
  action: 'allow' | 'deny';
  description?: string;
}

// Geo Blocking Config
interface GeoBlockingConfig {
  enabled: boolean;
  mode: 'whitelist' | 'blacklist';
  countries: string[];
}

// WAF Config
interface WAFConfig {
  enabled: boolean;
  rulesets: WAFRuleset[];
  customRules: WAFRule[];
  mode: 'detection' | 'prevention';
  logLevel: 'minimal' | 'standard' | 'detailed';
}

// WAF Ruleset
interface WAFRuleset {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  paranoia: 1 | 2 | 3 | 4;
}

// WAF Rule
interface WAFRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: 'block' | 'allow' | 'log' | 'challenge';
  priority: number;
  enabled: boolean;
}

// Encryption Config
interface EncryptionConfig {
  tlsEnabled: boolean;
  tlsVersion: 'TLS1.2' | 'TLS1.3';
  cipherSuites: string[];
  certificateId?: string;
  mtlsEnabled: boolean;
  mtlsConfig?: MTLSConfig;
}

// MTLS Config
interface MTLSConfig {
  clientCertRequired: boolean;
  trustedCAs: string[];
  verifyDepth: number;
  allowExpired: boolean;
}

// Gateway Routing
interface GatewayRouting {
  routes: Route[];
  defaultBackend?: string;
  loadBalancing: LoadBalancingConfig;
  trafficSplitting: TrafficSplitConfig;
  canary: CanaryConfig;
}

// Route
interface Route {
  id: string;
  name: string;
  description: string;
  path: string;
  pathType: 'exact' | 'prefix' | 'regex';
  methods: HTTPMethod[];
  backends: RouteBackend[];
  middleware: string[];
  transformations: RouteTransformation;
  validation: RouteValidation;
  documentation: RouteDocumentation;
  enabled: boolean;
  metadata: RouteMetadata;
}

// Route Backend
interface RouteBackend {
  id: string;
  name: string;
  type: 'service' | 'url' | 'lambda' | 'mock';
  target: string;
  weight: number;
  healthCheck?: HealthCheckConfig;
  timeout?: number;
}

// Health Check Config
interface HealthCheckConfig {
  enabled: boolean;
  path: string;
  interval: number;
  timeout: number;
  healthyThreshold: number;
  unhealthyThreshold: number;
  expectedStatus: number[];
}

// Route Transformation
interface RouteTransformation {
  request: RequestTransformation;
  response: ResponseTransformation;
}

// Request Transformation
interface RequestTransformation {
  pathRewrite?: PathRewrite;
  headerModifications: HeaderModification[];
  queryModifications: QueryModification[];
  bodyTransformation?: BodyTransformation;
}

// Path Rewrite
interface PathRewrite {
  type: 'replace' | 'regex';
  pattern: string;
  replacement: string;
}

// Header Modification
interface HeaderModification {
  action: 'add' | 'set' | 'remove';
  name: string;
  value?: string;
}

// Query Modification
interface QueryModification {
  action: 'add' | 'set' | 'remove';
  name: string;
  value?: string;
}

// Body Transformation
interface BodyTransformation {
  type: 'jq' | 'template' | 'xslt';
  template: string;
}

// Response Transformation
interface ResponseTransformation {
  headerModifications: HeaderModification[];
  statusCodeMapping?: Record<number, number>;
  bodyTransformation?: BodyTransformation;
}

// Route Validation
interface RouteValidation {
  enabled: boolean;
  requestValidation: RequestValidation;
  responseValidation: ResponseValidation;
}

// Request Validation
interface RequestValidation {
  validateBody: boolean;
  validateHeaders: boolean;
  validateQueryParams: boolean;
  schema?: string;
  contentTypes: string[];
}

// Response Validation
interface ResponseValidation {
  validateBody: boolean;
  validateHeaders: boolean;
  schema?: string;
}

// Route Documentation
interface RouteDocumentation {
  summary: string;
  description: string;
  tags: string[];
  operationId: string;
  deprecated: boolean;
  externalDocs?: string;
}

// Route Metadata
interface RouteMetadata {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  version: number;
  owner: string;
  team: string;
}

// Load Balancing Config
interface LoadBalancingConfig {
  algorithm: 'round_robin' | 'least_connections' | 'ip_hash' | 'weighted' | 'random';
  healthyOnly: boolean;
  stickySessions: StickySessionConfig;
}

// Sticky Session Config
interface StickySessionConfig {
  enabled: boolean;
  type: 'cookie' | 'header' | 'ip';
  cookieName?: string;
  ttl: number;
}

// Traffic Split Config
interface TrafficSplitConfig {
  enabled: boolean;
  rules: TrafficSplitRule[];
}

// Traffic Split Rule
interface TrafficSplitRule {
  id: string;
  name: string;
  condition: string;
  backends: { backend: string; weight: number }[];
}

// Canary Config
interface CanaryConfig {
  enabled: boolean;
  weight: number;
  backend: string;
  headerMatch?: string;
  cookieMatch?: string;
  metrics: CanaryMetrics;
}

// Canary Metrics
interface CanaryMetrics {
  errorRateThreshold: number;
  latencyThreshold: number;
  autoRollback: boolean;
}

// Gateway Middleware
interface GatewayMiddleware {
  id: string;
  name: string;
  type: MiddlewareType;
  order: number;
  config: Record<string, unknown>;
  enabled: boolean;
}

// Middleware Type
type MiddlewareType = 'authentication' | 'authorization' | 'rate_limiting' | 'caching' | 'transformation' | 'logging' | 'metrics' | 'validation' | 'custom';

// Gateway Monitoring
interface GatewayMonitoring {
  metrics: MetricsConfig;
  tracing: TracingConfig;
  alerts: AlertConfig[];
  dashboards: DashboardConfig[];
}

// Metrics Config
interface MetricsConfig {
  enabled: boolean;
  provider: 'prometheus' | 'cloudwatch' | 'datadog' | 'custom';
  endpoint: string;
  labels: Record<string, string>;
  histogramBuckets: number[];
  collectInterval: number;
}

// Tracing Config
interface TracingConfig {
  enabled: boolean;
  provider: 'jaeger' | 'zipkin' | 'xray' | 'otel';
  samplingRate: number;
  propagation: 'b3' | 'w3c' | 'jaeger';
  endpoint: string;
}

// Alert Config
interface AlertConfig {
  id: string;
  name: string;
  description: string;
  metric: string;
  condition: AlertCondition;
  severity: 'critical' | 'high' | 'medium' | 'low';
  channels: string[];
  enabled: boolean;
}

// Alert Condition
interface AlertCondition {
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  threshold: number;
  duration: number;
  aggregation: 'avg' | 'sum' | 'max' | 'min' | 'count';
}

// Dashboard Config
interface DashboardConfig {
  id: string;
  name: string;
  description: string;
  panels: DashboardPanel[];
  refreshInterval: number;
}

// Dashboard Panel
interface DashboardPanel {
  id: string;
  title: string;
  type: 'graph' | 'gauge' | 'table' | 'stat' | 'heatmap';
  metrics: string[];
  position: { x: number; y: number; w: number; h: number };
}

// Gateway Deployment
interface GatewayDeployment {
  type: 'kubernetes' | 'ecs' | 'lambda' | 'vm' | 'serverless';
  strategy: DeploymentStrategy;
  history: DeploymentHistory[];
  rollback: RollbackConfig;
  scaling: ScalingConfig;
}

// Deployment Strategy
interface DeploymentStrategy {
  type: 'rolling' | 'blue_green' | 'canary' | 'recreate';
  maxSurge: number;
  maxUnavailable: number;
  minReadySeconds: number;
}

// Deployment History
interface DeploymentHistory {
  id: string;
  version: string;
  timestamp: Date;
  status: 'success' | 'failed' | 'rolled_back';
  changes: string[];
  deployedBy: string;
  duration: number;
}

// Rollback Config
interface RollbackConfig {
  enabled: boolean;
  automatic: boolean;
  threshold: number;
  window: number;
  keepVersions: number;
}

// Scaling Config
interface ScalingConfig {
  enabled: boolean;
  minReplicas: number;
  maxReplicas: number;
  targetCPU: number;
  targetMemory: number;
  targetRPS: number;
  scaleUpStabilization: number;
  scaleDownStabilization: number;
}

// Gateway Documentation
interface GatewayDocumentation {
  openapi: OpenAPIConfig;
  asyncapi?: AsyncAPIConfig;
  portal: PortalConfig;
}

// OpenAPI Config
interface OpenAPIConfig {
  enabled: boolean;
  version: '2.0' | '3.0' | '3.1';
  path: string;
  info: APIInfo;
  servers: APIServer[];
  security: SecurityScheme[];
}

// API Info
interface APIInfo {
  title: string;
  description: string;
  version: string;
  termsOfService?: string;
  contact: { name: string; email: string; url?: string };
  license: { name: string; url?: string };
}

// API Server
interface APIServer {
  url: string;
  description: string;
  variables?: Record<string, { default: string; enum?: string[] }>;
}

// Security Scheme
interface SecurityScheme {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  name: string;
  in?: 'query' | 'header' | 'cookie';
  scheme?: string;
  flows?: Record<string, unknown>;
}

// AsyncAPI Config
interface AsyncAPIConfig {
  enabled: boolean;
  version: string;
  path: string;
}

// Portal Config
interface PortalConfig {
  enabled: boolean;
  url: string;
  theme: string;
  customization: Record<string, unknown>;
}

// Gateway Metadata
interface GatewayMetadata {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  version: number;
  owner: string;
  team: string;
  tags: string[];
  labels: Record<string, string>;
}

// API Consumer
interface APIConsumer {
  id: string;
  name: string;
  description: string;
  type: 'application' | 'user' | 'service';
  credentials: ConsumerCredentials;
  subscriptions: Subscription[];
  usage: ConsumerUsage;
  quotas: ConsumerQuota[];
  status: 'active' | 'suspended' | 'revoked';
  metadata: ConsumerMetadata;
}

// Consumer Credentials
interface ConsumerCredentials {
  apiKeys: APIKey[];
  oauth2Clients: OAuth2Client[];
  certificates: string[];
}

// API Key
interface APIKey {
  id: string;
  key: string;
  name: string;
  createdAt: Date;
  expiresAt?: Date;
  lastUsed?: Date;
  scopes: string[];
  rateLimit?: RateLimit;
  ipWhitelist?: string[];
  status: 'active' | 'revoked';
}

// OAuth2 Client
interface OAuth2Client {
  id: string;
  clientId: string;
  clientSecret: string;
  name: string;
  grantTypes: string[];
  redirectUris: string[];
  scopes: string[];
  status: 'active' | 'revoked';
}

// Subscription
interface Subscription {
  id: string;
  apiId: string;
  planId: string;
  status: 'active' | 'pending' | 'suspended' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
}

// Consumer Usage
interface ConsumerUsage {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageLatency: number;
  bandwidthUsed: number;
  lastRequest?: Date;
  topEndpoints: { endpoint: string; count: number }[];
}

// Consumer Quota
interface ConsumerQuota {
  name: string;
  limit: number;
  used: number;
  period: string;
  resetAt: Date;
}

// Consumer Metadata
interface ConsumerMetadata {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  owner: string;
  contact: string;
  notes?: string;
}

// Gateway Statistics
interface GatewayStatistics {
  overview: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageLatency: number;
    p50Latency: number;
    p95Latency: number;
    p99Latency: number;
    errorRate: number;
    throughput: number;
  };
  byStatus: Record<number, number>;
  byMethod: Record<HTTPMethod, number>;
  byRoute: { route: string; requests: number; latency: number; errors: number }[];
  byConsumer: { consumer: string; requests: number; quota: number }[];
  security: {
    blockedRequests: number;
    authFailures: number;
    rateLimitExceeded: number;
    wafBlocked: number;
  };
  health: {
    uptime: number;
    healthyBackends: number;
    unhealthyBackends: number;
    circuitBreakerTrips: number;
  };
}

class APIGatewayService {
  private static instance: APIGatewayService;
  private gateways: Map<string, APIGateway> = new Map();
  private consumers: Map<string, APIConsumer> = new Map();
  private eventListeners: ((event: string, data: unknown) => void)[] = [];

  private constructor() {
    this.initializeSampleData();
  }

  public static getInstance(): APIGatewayService {
    if (!APIGatewayService.instance) {
      APIGatewayService.instance = new APIGatewayService();
    }
    return APIGatewayService.instance;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeSampleData(): void {
    // Initialize Gateways
    const gatewayData = [
      { name: 'Production API Gateway', domain: 'api.example.com', env: 'production' as const },
      { name: 'Staging API Gateway', domain: 'api-staging.example.com', env: 'staging' as const },
      { name: 'Development API Gateway', domain: 'api-dev.example.com', env: 'development' as const },
    ];

    gatewayData.forEach((gw, idx) => {
      const gateway: APIGateway = {
        id: `gw-${(idx + 1).toString().padStart(4, '0')}`,
        name: gw.name,
        description: `${gw.env} API gateway for microservices`,
        domain: gw.domain,
        basePath: '/api',
        version: 'v1',
        protocol: 'https',
        environment: {
          type: gw.env,
          region: 'us-west-2',
          cluster: `${gw.env}-cluster`,
          replicas: gw.env === 'production' ? 5 : gw.env === 'staging' ? 2 : 1,
          resources: { cpu: gw.env === 'production' ? '2000m' : '500m', memory: gw.env === 'production' ? '4Gi' : '1Gi', maxConnections: 10000, maxRequestsPerSecond: 5000 },
          variables: { ENV: gw.env, LOG_LEVEL: gw.env === 'production' ? 'info' : 'debug' },
        },
        configuration: {
          timeout: { connection: 5000, read: 30000, write: 30000, idle: 60000, requestTimeout: 60000 },
          retry: { enabled: true, maxRetries: 3, retryableStatusCodes: [502, 503, 504], retryableMethods: ['GET', 'HEAD', 'OPTIONS'], backoff: { type: 'exponential', initial: 100, maximum: 5000, multiplier: 2 } },
          circuitBreaker: { enabled: true, threshold: 5, timeout: 30000, halfOpenRequests: 3, failureRateThreshold: 50, slowCallRateThreshold: 80, slowCallDuration: 5000 },
          cors: { enabled: true, allowedOrigins: ['https://example.com', 'https://app.example.com'], allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'], exposedHeaders: ['X-Request-ID'], allowCredentials: true, maxAge: 86400 },
          compression: { enabled: true, minSize: 1024, algorithms: ['gzip', 'br'], mimeTypes: ['application/json', 'text/plain', 'text/html'] },
          requestSize: { maxBodySize: 10485760, maxHeaderSize: 8192, maxURILength: 2048 },
          logging: { enabled: true, level: gw.env === 'production' ? 'info' : 'debug', format: 'json', includeHeaders: true, includeBody: gw.env !== 'production', sensitiveFields: ['password', 'token', 'api_key'], destination: 'stdout' },
          caching: { enabled: true, defaultTTL: 300, maxSize: 1073741824, varyHeaders: ['Accept', 'Accept-Language'], cacheControl: true, store: 'redis' },
        },
        security: {
          authentication: {
            type: 'jwt',
            required: true,
            providers: [
              { id: 'auth0', name: 'Auth0', type: 'oauth2', config: { issuer: 'https://example.auth0.com/', audience: 'https://api.example.com', jwksUri: 'https://example.auth0.com/.well-known/jwks.json' }, enabled: true },
              { id: 'api-key', name: 'API Key', type: 'api_key', config: {}, enabled: true },
            ],
            tokenLocation: 'header',
            tokenName: 'Authorization',
            passthrough: false,
          },
          authorization: {
            enabled: true,
            type: 'rbac',
            policyEngine: 'opa',
            policies: [
              { id: 'admin-policy', name: 'Admin Access', description: 'Full admin access', rules: [{ id: 'rule-1', resource: '*', action: '*', effect: 'allow' }], priority: 1, enabled: true },
              { id: 'user-policy', name: 'User Access', description: 'Standard user access', rules: [{ id: 'rule-2', resource: '/api/v1/users/*', action: 'read', effect: 'allow' }], priority: 10, enabled: true },
            ],
            defaultAction: 'deny',
          },
          rateLimiting: {
            enabled: true,
            defaultLimit: { requests: 1000, period: 'minute' },
            plans: [
              { id: 'free', name: 'Free Tier', description: 'Free tier limits', limits: [{ requests: 100, period: 'minute' }, { requests: 1000, period: 'day' }], quotas: [{ name: 'Daily Quota', limit: 1000, period: 'day', resetBehavior: 'calendar' }], features: ['basic'] },
              { id: 'pro', name: 'Pro Tier', description: 'Professional tier', limits: [{ requests: 1000, period: 'minute' }, { requests: 100000, period: 'day' }], quotas: [{ name: 'Daily Quota', limit: 100000, period: 'day', resetBehavior: 'calendar' }], features: ['basic', 'advanced'], price: 99 },
              { id: 'enterprise', name: 'Enterprise', description: 'Enterprise tier', limits: [{ requests: 10000, period: 'minute' }], quotas: [], features: ['basic', 'advanced', 'premium'], price: 499 },
            ],
            keyExtractor: 'api_key',
            responseHeaders: true,
            burstAllowed: true,
          },
          ipFiltering: { enabled: true, mode: 'blacklist', rules: [{ id: 'rule-1', type: 'cidr', value: '10.0.0.0/8', action: 'allow', description: 'Internal network' }], geoBlocking: { enabled: false, mode: 'blacklist', countries: [] } },
          waf: { enabled: true, rulesets: [{ id: 'owasp-core', name: 'OWASP Core Ruleset', version: '3.3.2', enabled: true, paranoia: 2 }], customRules: [], mode: 'prevention', logLevel: 'standard' },
          encryption: { tlsEnabled: true, tlsVersion: 'TLS1.3', cipherSuites: ['TLS_AES_256_GCM_SHA384', 'TLS_CHACHA20_POLY1305_SHA256'], mtlsEnabled: false },
        },
        routing: {
          routes: [
            {
              id: 'route-users',
              name: 'Users API',
              description: 'User management endpoints',
              path: '/api/v1/users',
              pathType: 'prefix',
              methods: ['GET', 'POST', 'PUT', 'DELETE'],
              backends: [{ id: 'users-svc', name: 'Users Service', type: 'service', target: 'users-service.default.svc:8080', weight: 100, healthCheck: { enabled: true, path: '/health', interval: 10, timeout: 5, healthyThreshold: 2, unhealthyThreshold: 3, expectedStatus: [200] } }],
              middleware: ['auth', 'rate-limit', 'logging'],
              transformations: { request: { headerModifications: [{ action: 'add', name: 'X-Request-ID', value: '${requestId}' }], queryModifications: [] }, response: { headerModifications: [{ action: 'add', name: 'X-Response-Time', value: '${responseTime}ms' }] } },
              validation: { enabled: true, requestValidation: { validateBody: true, validateHeaders: true, validateQueryParams: true, contentTypes: ['application/json'] }, responseValidation: { validateBody: false, validateHeaders: false } },
              documentation: { summary: 'User management API', description: 'CRUD operations for users', tags: ['users'], operationId: 'users', deprecated: false },
              enabled: true,
              metadata: { createdAt: new Date(), createdBy: 'admin', updatedAt: new Date(), version: 1, owner: 'platform-team', team: 'platform' },
            },
            {
              id: 'route-orders',
              name: 'Orders API',
              description: 'Order management endpoints',
              path: '/api/v1/orders',
              pathType: 'prefix',
              methods: ['GET', 'POST', 'PUT'],
              backends: [{ id: 'orders-svc', name: 'Orders Service', type: 'service', target: 'orders-service.default.svc:8080', weight: 100, healthCheck: { enabled: true, path: '/health', interval: 10, timeout: 5, healthyThreshold: 2, unhealthyThreshold: 3, expectedStatus: [200] } }],
              middleware: ['auth', 'rate-limit', 'logging'],
              transformations: { request: { headerModifications: [], queryModifications: [] }, response: { headerModifications: [] } },
              validation: { enabled: true, requestValidation: { validateBody: true, validateHeaders: false, validateQueryParams: false, contentTypes: ['application/json'] }, responseValidation: { validateBody: false, validateHeaders: false } },
              documentation: { summary: 'Order management API', description: 'Order processing', tags: ['orders'], operationId: 'orders', deprecated: false },
              enabled: true,
              metadata: { createdAt: new Date(), createdBy: 'admin', updatedAt: new Date(), version: 1, owner: 'commerce-team', team: 'commerce' },
            },
          ],
          loadBalancing: { algorithm: 'round_robin', healthyOnly: true, stickySessions: { enabled: false, type: 'cookie', ttl: 3600 } },
          trafficSplitting: { enabled: false, rules: [] },
          canary: { enabled: false, weight: 0, backend: '', metrics: { errorRateThreshold: 5, latencyThreshold: 1000, autoRollback: true } },
        },
        middleware: [
          { id: 'auth', name: 'Authentication', type: 'authentication', order: 1, config: {}, enabled: true },
          { id: 'rate-limit', name: 'Rate Limiting', type: 'rate_limiting', order: 2, config: {}, enabled: true },
          { id: 'logging', name: 'Request Logging', type: 'logging', order: 3, config: {}, enabled: true },
          { id: 'metrics', name: 'Metrics Collection', type: 'metrics', order: 4, config: {}, enabled: true },
        ],
        monitoring: {
          metrics: { enabled: true, provider: 'prometheus', endpoint: '/metrics', labels: { service: 'api-gateway', environment: gw.env }, histogramBuckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10], collectInterval: 15 },
          tracing: { enabled: true, provider: 'jaeger', samplingRate: gw.env === 'production' ? 0.1 : 1.0, propagation: 'w3c', endpoint: 'http://jaeger:14268/api/traces' },
          alerts: [
            { id: 'high-error-rate', name: 'High Error Rate', description: 'Error rate exceeds threshold', metric: 'http_requests_total{status=~"5.."}', condition: { operator: 'gt', threshold: 5, duration: 300, aggregation: 'avg' }, severity: 'critical', channels: ['slack', 'pagerduty'], enabled: true },
            { id: 'high-latency', name: 'High Latency', description: 'P95 latency exceeds threshold', metric: 'http_request_duration_seconds', condition: { operator: 'gt', threshold: 2, duration: 300, aggregation: 'avg' }, severity: 'high', channels: ['slack'], enabled: true },
          ],
          dashboards: [{ id: 'overview', name: 'Gateway Overview', description: 'Main gateway metrics', panels: [], refreshInterval: 30 }],
        },
        deployment: {
          type: 'kubernetes',
          strategy: { type: 'rolling', maxSurge: 1, maxUnavailable: 0, minReadySeconds: 10 },
          history: [{ id: 'deploy-1', version: '1.5.0', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), status: 'success', changes: ['Updated rate limiting'], deployedBy: 'ci-system', duration: 120 }],
          rollback: { enabled: true, automatic: true, threshold: 10, window: 300, keepVersions: 5 },
          scaling: { enabled: true, minReplicas: gw.env === 'production' ? 3 : 1, maxReplicas: gw.env === 'production' ? 10 : 3, targetCPU: 70, targetMemory: 80, targetRPS: 1000, scaleUpStabilization: 60, scaleDownStabilization: 300 },
        },
        documentation: {
          openapi: { enabled: true, version: '3.0', path: '/openapi.json', info: { title: `${gw.name} API`, description: 'API documentation', version: 'v1', contact: { name: 'API Team', email: 'api@example.com' }, license: { name: 'MIT' } }, servers: [{ url: `https://${gw.domain}`, description: gw.env }], security: [{ type: 'http', name: 'bearerAuth', scheme: 'bearer' }] },
          portal: { enabled: true, url: `https://docs.${gw.domain}`, theme: 'default', customization: {} },
        },
        status: 'active',
        metadata: { createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), createdBy: 'admin', updatedAt: new Date(), version: 15, owner: 'platform-team', team: 'platform', tags: ['api', gw.env], labels: { environment: gw.env, tier: 'edge' } },
      };
      this.gateways.set(gateway.id, gateway);
    });

    // Initialize Consumers
    const consumersData = [
      { name: 'Mobile App', type: 'application' as const },
      { name: 'Web Frontend', type: 'application' as const },
      { name: 'Partner Integration', type: 'service' as const },
      { name: 'Internal Service', type: 'service' as const },
    ];

    consumersData.forEach((c, idx) => {
      const consumer: APIConsumer = {
        id: `consumer-${(idx + 1).toString().padStart(4, '0')}`,
        name: c.name,
        description: `${c.name} API consumer`,
        type: c.type,
        credentials: {
          apiKeys: [{ id: `key-${idx}`, key: `ak_${Math.random().toString(36).substr(2, 32)}`, name: 'Primary Key', createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), lastUsed: new Date(), scopes: ['read', 'write'], status: 'active' }],
          oauth2Clients: c.type === 'application' ? [{ id: `oauth-${idx}`, clientId: `client_${idx}`, clientSecret: `secret_${Math.random().toString(36).substr(2, 32)}`, name: 'OAuth Client', grantTypes: ['authorization_code', 'refresh_token'], redirectUris: ['https://example.com/callback'], scopes: ['openid', 'profile', 'email'], status: 'active' }] : [],
          certificates: [],
        },
        subscriptions: [{ id: `sub-${idx}`, apiId: 'gw-0001', planId: idx === 2 ? 'enterprise' : idx === 3 ? 'pro' : 'free', status: 'active', startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), autoRenew: true }],
        usage: { totalRequests: Math.floor(Math.random() * 1000000), successfulRequests: Math.floor(Math.random() * 950000), failedRequests: Math.floor(Math.random() * 50000), averageLatency: 45 + Math.random() * 100, bandwidthUsed: Math.floor(Math.random() * 10737418240), lastRequest: new Date(), topEndpoints: [{ endpoint: '/api/v1/users', count: 50000 }, { endpoint: '/api/v1/orders', count: 30000 }] },
        quotas: [{ name: 'Daily Quota', limit: idx === 2 ? 1000000 : idx === 3 ? 100000 : 1000, used: Math.floor(Math.random() * 800), period: 'day', resetAt: new Date(Date.now() + 12 * 60 * 60 * 1000) }],
        status: 'active',
        metadata: { createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), createdBy: 'admin', updatedAt: new Date(), owner: 'api-team', contact: 'dev@example.com' },
      };
      this.consumers.set(consumer.id, consumer);
    });
  }

  // Gateway Operations
  public getGateways(): APIGateway[] {
    return Array.from(this.gateways.values());
  }

  public getGatewayById(id: string): APIGateway | undefined {
    return this.gateways.get(id);
  }

  public getRoutes(gatewayId: string): Route[] {
    const gateway = this.gateways.get(gatewayId);
    return gateway?.routing.routes || [];
  }

  // Consumer Operations
  public getConsumers(): APIConsumer[] {
    return Array.from(this.consumers.values());
  }

  public getConsumerById(id: string): APIConsumer | undefined {
    return this.consumers.get(id);
  }

  // Statistics
  public getStatistics(gatewayId?: string): GatewayStatistics {
    const requests = Math.floor(Math.random() * 10000000);
    const errors = Math.floor(requests * 0.02);

    return {
      overview: {
        totalRequests: requests,
        successfulRequests: requests - errors,
        failedRequests: errors,
        averageLatency: 45,
        p50Latency: 35,
        p95Latency: 120,
        p99Latency: 250,
        errorRate: 2.0,
        throughput: 5000,
      },
      byStatus: { 200: Math.floor(requests * 0.85), 201: Math.floor(requests * 0.05), 400: Math.floor(requests * 0.05), 401: Math.floor(requests * 0.02), 404: Math.floor(requests * 0.02), 500: Math.floor(requests * 0.01) },
      byMethod: { GET: Math.floor(requests * 0.6), POST: Math.floor(requests * 0.25), PUT: Math.floor(requests * 0.1), DELETE: Math.floor(requests * 0.03), PATCH: Math.floor(requests * 0.02), HEAD: 0, OPTIONS: 0 },
      byRoute: [{ route: '/api/v1/users', requests: Math.floor(requests * 0.4), latency: 40, errors: Math.floor(errors * 0.3) }, { route: '/api/v1/orders', requests: Math.floor(requests * 0.35), latency: 55, errors: Math.floor(errors * 0.4) }],
      byConsumer: Array.from(this.consumers.values()).map((c) => ({ consumer: c.name, requests: c.usage.totalRequests, quota: c.quotas[0]?.limit || 0 })),
      security: { blockedRequests: Math.floor(requests * 0.001), authFailures: Math.floor(requests * 0.005), rateLimitExceeded: Math.floor(requests * 0.002), wafBlocked: Math.floor(requests * 0.001) },
      health: { uptime: 99.99, healthyBackends: 8, unhealthyBackends: 0, circuitBreakerTrips: 2 },
    };
  }

  // Event Handling
  public subscribe(callback: (event: string, data: unknown) => void): () => void {
    this.eventListeners.push(callback);
    return () => {
      const index = this.eventListeners.indexOf(callback);
      if (index > -1) this.eventListeners.splice(index, 1);
    };
  }

  private emit(event: string, data: unknown): void {
    this.eventListeners.forEach((callback) => callback(event, data));
  }
}

export const apiGatewayService = APIGatewayService.getInstance();
export type {
  APIProtocol,
  HTTPMethod,
  APIStatus,
  AuthenticationType,
  RateLimitUnit,
  APIGateway,
  GatewayEnvironment,
  ResourceAllocation,
  GatewayConfiguration,
  TimeoutConfig,
  RetryConfig,
  BackoffConfig,
  CircuitBreakerConfig,
  CORSConfig,
  CompressionConfig,
  RequestSizeConfig,
  LoggingConfig,
  CachingConfig,
  GatewaySecurity,
  AuthenticationConfig,
  AuthProvider,
  AuthProviderConfig,
  ValidationRule,
  AuthorizationConfig,
  AuthPolicy,
  PolicyRule,
  PolicyCondition,
  RateLimitConfig,
  RateLimit,
  RateLimitPlan,
  Quota,
  IPFilterConfig,
  IPFilterRule,
  GeoBlockingConfig,
  WAFConfig,
  WAFRuleset,
  WAFRule,
  EncryptionConfig,
  MTLSConfig,
  GatewayRouting,
  Route,
  RouteBackend,
  HealthCheckConfig,
  RouteTransformation,
  RequestTransformation,
  PathRewrite,
  HeaderModification,
  QueryModification,
  BodyTransformation,
  ResponseTransformation,
  RouteValidation,
  RequestValidation,
  ResponseValidation,
  RouteDocumentation,
  RouteMetadata,
  LoadBalancingConfig,
  StickySessionConfig,
  TrafficSplitConfig,
  TrafficSplitRule,
  CanaryConfig,
  CanaryMetrics,
  GatewayMiddleware,
  MiddlewareType,
  GatewayMonitoring,
  MetricsConfig,
  TracingConfig,
  AlertConfig,
  AlertCondition,
  DashboardConfig,
  DashboardPanel,
  GatewayDeployment,
  DeploymentStrategy,
  DeploymentHistory,
  RollbackConfig,
  ScalingConfig,
  GatewayDocumentation,
  OpenAPIConfig,
  APIInfo,
  APIServer,
  SecurityScheme,
  AsyncAPIConfig,
  PortalConfig,
  GatewayMetadata,
  APIConsumer,
  ConsumerCredentials,
  APIKey,
  OAuth2Client,
  Subscription,
  ConsumerUsage,
  ConsumerQuota,
  ConsumerMetadata,
  GatewayStatistics,
};
