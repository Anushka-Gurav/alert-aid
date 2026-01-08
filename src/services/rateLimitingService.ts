/**
 * Rate Limiting Service
 * Comprehensive rate limiting, throttling, and quota management
 */

// Rate Limit Algorithm
type RateLimitAlgorithm = 'token_bucket' | 'leaky_bucket' | 'fixed_window' | 'sliding_window' | 'sliding_log' | 'adaptive';

// Limit Scope
type LimitScope = 'global' | 'per_user' | 'per_ip' | 'per_api_key' | 'per_endpoint' | 'per_tenant' | 'custom';

// Limit Action
type LimitAction = 'reject' | 'queue' | 'throttle' | 'degrade' | 'redirect' | 'custom';

// Limit Status
type LimitStatus = 'active' | 'inactive' | 'exceeded' | 'warning' | 'suspended';

// Rate Limit Rule
interface RateLimitRule {
  id: string;
  name: string;
  description: string;
  algorithm: RateLimitAlgorithm;
  scope: LimitScope;
  limits: LimitConfiguration;
  targeting: RuleTargeting;
  action: LimitActionConfig;
  quotas: QuotaConfiguration;
  burst: BurstConfiguration;
  scheduling: RuleScheduling;
  exemptions: RuleExemptions;
  monitoring: RuleMonitoring;
  metadata: RuleMetadata;
}

// Limit Configuration
interface LimitConfiguration {
  requests: number;
  window: number;
  windowUnit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month';
  refillRate?: number;
  refillInterval?: number;
  maxTokens?: number;
  warmup?: WarmupConfig;
}

// Warmup Config
interface WarmupConfig {
  enabled: boolean;
  duration: number;
  durationUnit: 'seconds' | 'minutes';
  initialRate: number;
}

// Rule Targeting
interface RuleTargeting {
  endpoints: EndpointTarget[];
  methods: string[];
  users: UserTarget[];
  ips: IPTarget[];
  apiKeys: string[];
  headers: HeaderTarget[];
  customAttributes: CustomTarget[];
}

// Endpoint Target
interface EndpointTarget {
  path: string;
  pattern: 'exact' | 'prefix' | 'regex';
  methods?: string[];
  priority?: number;
}

// User Target
interface UserTarget {
  type: 'include' | 'exclude';
  users?: string[];
  groups?: string[];
  roles?: string[];
}

// IP Target
interface IPTarget {
  type: 'include' | 'exclude';
  addresses?: string[];
  ranges?: IPRange[];
  cidrs?: string[];
  geolocations?: GeoTarget[];
}

// IP Range
interface IPRange {
  start: string;
  end: string;
}

// Geo Target
interface GeoTarget {
  type: 'country' | 'region' | 'city';
  values: string[];
  exclude: boolean;
}

// Header Target
interface HeaderTarget {
  name: string;
  value?: string;
  pattern?: string;
  operator: 'equals' | 'contains' | 'matches' | 'exists';
}

// Custom Target
interface CustomTarget {
  attribute: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'matches' | 'in' | 'not_in' | 'gt' | 'lt' | 'gte' | 'lte';
  value: unknown;
}

// Limit Action Config
interface LimitActionConfig {
  type: LimitAction;
  statusCode: number;
  message: string;
  headers: ResponseHeader[];
  retryAfter: boolean;
  queueConfig?: QueueActionConfig;
  throttleConfig?: ThrottleActionConfig;
  degradeConfig?: DegradeActionConfig;
  redirectConfig?: RedirectActionConfig;
  customHandler?: string;
}

// Response Header
interface ResponseHeader {
  name: string;
  value: string;
  include: 'always' | 'on_limit' | 'on_success';
}

// Queue Action Config
interface QueueActionConfig {
  maxQueueSize: number;
  maxWaitTime: number;
  priority: 'fifo' | 'lifo' | 'priority';
  priorityAttribute?: string;
  timeout: number;
  timeoutAction: 'reject' | 'degrade';
}

// Throttle Action Config
interface ThrottleActionConfig {
  minDelay: number;
  maxDelay: number;
  delayFunction: 'linear' | 'exponential' | 'fixed';
  jitter: boolean;
  jitterRange: number;
}

// Degrade Action Config
interface DegradeActionConfig {
  level: 'partial' | 'minimal' | 'cached';
  features: string[];
  cacheTime?: number;
  fallbackEndpoint?: string;
}

// Redirect Action Config
interface RedirectActionConfig {
  url: string;
  type: 'temporary' | 'permanent';
  preserveQuery: boolean;
  statusCode: 302 | 307 | 301 | 308;
}

// Quota Configuration
interface QuotaConfiguration {
  enabled: boolean;
  quotas: Quota[];
  rollover: boolean;
  rolloverPercentage?: number;
  notifications: QuotaNotification[];
}

// Quota
interface Quota {
  id: string;
  name: string;
  type: 'requests' | 'bandwidth' | 'compute' | 'storage' | 'custom';
  limit: number;
  unit?: string;
  period: 'hour' | 'day' | 'week' | 'month' | 'year';
  resetDay?: number;
  softLimit?: number;
  hardLimit?: number;
  overageAllowed: boolean;
  overageRate?: number;
}

// Quota Notification
interface QuotaNotification {
  threshold: number;
  channels: string[];
  message: string;
  repeat: boolean;
  repeatInterval?: number;
}

// Burst Configuration
interface BurstConfiguration {
  enabled: boolean;
  maxBurst: number;
  burstWindow: number;
  burstWindowUnit: 'seconds' | 'minutes';
  cooldown: number;
  cooldownUnit: 'seconds' | 'minutes';
  carryover: boolean;
}

// Rule Scheduling
interface RuleScheduling {
  enabled: boolean;
  schedules: RuleSchedule[];
  timezone: string;
  holidays: HolidayConfig;
}

// Rule Schedule
interface RuleSchedule {
  id: string;
  name: string;
  limits: LimitConfiguration;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  priority: number;
}

// Holiday Config
interface HolidayConfig {
  enabled: boolean;
  holidays: Holiday[];
  behavior: 'increase' | 'decrease' | 'custom';
  multiplier?: number;
  customLimits?: LimitConfiguration;
}

// Holiday
interface Holiday {
  name: string;
  date: string;
  recurring: boolean;
}

// Rule Exemptions
interface RuleExemptions {
  enabled: boolean;
  users: string[];
  groups: string[];
  ips: string[];
  apiKeys: string[];
  tokens: ExemptionToken[];
  conditions: ExemptionCondition[];
}

// Exemption Token
interface ExemptionToken {
  token: string;
  name: string;
  expiresAt?: Date;
  usageLimit?: number;
  usageCount: number;
}

// Exemption Condition
interface ExemptionCondition {
  attribute: string;
  operator: string;
  value: unknown;
}

// Rule Monitoring
interface RuleMonitoring {
  enabled: boolean;
  alerts: MonitoringAlert[];
  metrics: MonitoringMetric[];
  logging: LoggingConfig;
  dashboard: DashboardConfig;
}

// Monitoring Alert
interface MonitoringAlert {
  id: string;
  name: string;
  condition: AlertCondition;
  channels: string[];
  severity: 'info' | 'warning' | 'error' | 'critical';
  cooldown: number;
  enabled: boolean;
}

// Alert Condition
interface AlertCondition {
  metric: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  threshold: number;
  duration?: number;
  durationUnit?: 'seconds' | 'minutes';
}

// Monitoring Metric
interface MonitoringMetric {
  name: string;
  type: 'counter' | 'gauge' | 'histogram';
  labels: string[];
  buckets?: number[];
}

// Logging Config
interface LoggingConfig {
  enabled: boolean;
  level: 'debug' | 'info' | 'warn' | 'error';
  logAccepted: boolean;
  logRejected: boolean;
  logQuota: boolean;
  fields: string[];
  sampling: number;
}

// Dashboard Config
interface DashboardConfig {
  enabled: boolean;
  refreshInterval: number;
  timeRange: string;
  widgets: DashboardWidget[];
}

// Dashboard Widget
interface DashboardWidget {
  id: string;
  type: 'chart' | 'counter' | 'table' | 'heatmap';
  title: string;
  metric: string;
  size: 'small' | 'medium' | 'large';
}

// Rule Metadata
interface RuleMetadata {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  version: number;
  tags: string[];
  labels: Record<string, string>;
  status: LimitStatus;
  priority: number;
}

// Rate Limit Client
interface RateLimitClient {
  id: string;
  identifier: string;
  type: 'user' | 'api_key' | 'ip' | 'tenant' | 'custom';
  name: string;
  tier: ClientTier;
  limits: ClientLimits;
  quotas: ClientQuotas;
  usage: ClientUsage;
  status: ClientStatus;
  history: ClientHistory[];
  metadata: ClientMetadata;
}

// Client Tier
interface ClientTier {
  id: string;
  name: string;
  level: number;
  multiplier: number;
  features: string[];
  limits: TierLimits;
}

// Tier Limits
interface TierLimits {
  requestsPerSecond: number;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
  quotaMultiplier: number;
}

// Client Limits
interface ClientLimits {
  custom: boolean;
  overrides: LimitOverride[];
  temporaryBoosts: TemporaryBoost[];
}

// Limit Override
interface LimitOverride {
  ruleId: string;
  limits: LimitConfiguration;
  expiresAt?: Date;
  reason: string;
}

// Temporary Boost
interface TemporaryBoost {
  id: string;
  multiplier: number;
  startTime: Date;
  endTime: Date;
  reason: string;
  approvedBy?: string;
}

// Client Quotas
interface ClientQuotas {
  allocations: QuotaAllocation[];
  purchases: QuotaPurchase[];
  rollover: QuotaRollover;
}

// Quota Allocation
interface QuotaAllocation {
  quotaId: string;
  allocated: number;
  used: number;
  remaining: number;
  resetAt: Date;
}

// Quota Purchase
interface QuotaPurchase {
  id: string;
  quotaId: string;
  amount: number;
  price: number;
  purchasedAt: Date;
  expiresAt?: Date;
}

// Quota Rollover
interface QuotaRollover {
  enabled: boolean;
  maxRollover: number;
  currentRollover: number;
  expiresAt?: Date;
}

// Client Usage
interface ClientUsage {
  current: UsageSnapshot;
  hourly: UsageSnapshot[];
  daily: UsageSnapshot[];
  monthly: UsageSnapshot[];
  patterns: UsagePattern;
}

// Usage Snapshot
interface UsageSnapshot {
  timestamp: Date;
  requests: number;
  accepted: number;
  rejected: number;
  queued: number;
  throttled: number;
  bandwidth?: number;
  latencyP50?: number;
  latencyP95?: number;
  latencyP99?: number;
}

// Usage Pattern
interface UsagePattern {
  peakHour: number;
  peakDay: number;
  averageRequests: number;
  burstFrequency: number;
  anomalyScore: number;
}

// Client Status
interface ClientStatus {
  state: 'active' | 'limited' | 'blocked' | 'suspended';
  reason?: string;
  limitedAt?: Date;
  blockedAt?: Date;
  unblockAt?: Date;
  violations: Violation[];
}

// Violation
interface Violation {
  id: string;
  timestamp: Date;
  type: 'rate_exceeded' | 'quota_exceeded' | 'burst_exceeded' | 'abuse_detected';
  severity: 'minor' | 'moderate' | 'severe';
  details: Record<string, unknown>;
  resolved: boolean;
}

// Client History
interface ClientHistory {
  timestamp: Date;
  action: 'created' | 'tier_changed' | 'limit_override' | 'boost_applied' | 'blocked' | 'unblocked' | 'quota_reset';
  details: Record<string, unknown>;
  actor?: string;
}

// Client Metadata
interface ClientMetadata {
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  notes?: string;
}

// Rate Limit Request
interface RateLimitRequest {
  id: string;
  clientId: string;
  endpoint: string;
  method: string;
  timestamp: Date;
  ip: string;
  headers: Record<string, string>;
  attributes: Record<string, unknown>;
}

// Rate Limit Response
interface RateLimitResponse {
  allowed: boolean;
  remaining: number;
  limit: number;
  reset: Date;
  retryAfter?: number;
  action: LimitAction;
  ruleId: string;
  headers: Record<string, string>;
  quota?: QuotaStatus;
}

// Quota Status
interface QuotaStatus {
  quotaId: string;
  used: number;
  limit: number;
  remaining: number;
  resetAt: Date;
  percentage: number;
}

// Rate Limit Window
interface RateLimitWindow {
  id: string;
  clientId: string;
  ruleId: string;
  windowStart: Date;
  windowEnd: Date;
  count: number;
  limit: number;
  tokens?: number;
  maxTokens?: number;
  lastRefill?: Date;
}

// Rate Limit Policy
interface RateLimitPolicy {
  id: string;
  name: string;
  description: string;
  rules: string[];
  priority: number;
  scope: 'global' | 'environment' | 'tenant';
  environments: string[];
  tenants: string[];
  inheritance: PolicyInheritance;
  defaults: PolicyDefaults;
  enforcement: PolicyEnforcement;
  metadata: PolicyMetadata;
}

// Policy Inheritance
interface PolicyInheritance {
  inherit: boolean;
  parentPolicy?: string;
  override: 'merge' | 'replace' | 'priority';
}

// Policy Defaults
interface PolicyDefaults {
  algorithm: RateLimitAlgorithm;
  limits: LimitConfiguration;
  action: LimitActionConfig;
  monitoring: RuleMonitoring;
}

// Policy Enforcement
interface PolicyEnforcement {
  mode: 'enforce' | 'monitor' | 'disabled';
  dryRun: boolean;
  logging: boolean;
  alerting: boolean;
  gradualRollout?: number;
}

// Policy Metadata
interface PolicyMetadata {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  version: number;
  status: 'active' | 'draft' | 'archived';
}

// Distributed Rate Limiter
interface DistributedRateLimiter {
  id: string;
  name: string;
  type: 'redis' | 'memcached' | 'dynamodb' | 'consul' | 'custom';
  config: DistributedConfig;
  nodes: LimiterNode[];
  replication: ReplicationConfig;
  failover: FailoverConfig;
  health: LimiterHealth;
}

// Distributed Config
interface DistributedConfig {
  connectionString: string;
  prefix: string;
  ttl: number;
  retries: number;
  timeout: number;
  poolSize: number;
  compression: boolean;
}

// Limiter Node
interface LimiterNode {
  id: string;
  host: string;
  port: number;
  role: 'primary' | 'replica' | 'sentinel';
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency: number;
  lastCheck: Date;
}

// Replication Config
interface ReplicationConfig {
  enabled: boolean;
  mode: 'sync' | 'async' | 'semi_sync';
  replicas: number;
  readFromReplica: boolean;
  writeConsistency: 'one' | 'quorum' | 'all';
}

// Failover Config
interface FailoverConfig {
  enabled: boolean;
  strategy: 'automatic' | 'manual';
  timeout: number;
  fallback: 'local' | 'allow_all' | 'deny_all' | 'custom';
  maxRetries: number;
  circuitBreaker: CircuitBreakerConfig;
}

// Circuit Breaker Config
interface CircuitBreakerConfig {
  enabled: boolean;
  threshold: number;
  timeout: number;
  halfOpenRequests: number;
}

// Limiter Health
interface LimiterHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  latencyMs: number;
  errorRate: number;
  lastError?: string;
  lastCheck: Date;
  uptime: number;
}

// Rate Limiting Statistics
interface RateLimitingStatistics {
  overview: {
    totalRules: number;
    activeRules: number;
    totalClients: number;
    activeClients: number;
    limitedClients: number;
    blockedClients: number;
  };
  requests: {
    total: number;
    accepted: number;
    rejected: number;
    queued: number;
    throttled: number;
    acceptRate: number;
    rejectRate: number;
  };
  quotas: {
    totalAllocated: number;
    totalUsed: number;
    utilizationRate: number;
    exceededCount: number;
  };
  performance: {
    avgLatencyMs: number;
    p50LatencyMs: number;
    p95LatencyMs: number;
    p99LatencyMs: number;
    throughput: number;
  };
  byAlgorithm: Record<RateLimitAlgorithm, number>;
  byScope: Record<LimitScope, number>;
  topLimited: {
    clientId: string;
    rejections: number;
    lastLimited: Date;
  }[];
}

class RateLimitingService {
  private static instance: RateLimitingService;
  private rules: Map<string, RateLimitRule> = new Map();
  private clients: Map<string, RateLimitClient> = new Map();
  private policies: Map<string, RateLimitPolicy> = new Map();
  private windows: Map<string, RateLimitWindow> = new Map();
  private eventListeners: ((event: string, data: unknown) => void)[] = [];

  private constructor() {
    this.initializeSampleData();
  }

  public static getInstance(): RateLimitingService {
    if (!RateLimitingService.instance) {
      RateLimitingService.instance = new RateLimitingService();
    }
    return RateLimitingService.instance;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeSampleData(): void {
    // Initialize Rate Limit Rules
    const rulesData = [
      { name: 'API Global Limit', algorithm: 'token_bucket' as RateLimitAlgorithm, scope: 'global' as LimitScope, requests: 10000 },
      { name: 'Per User Limit', algorithm: 'sliding_window' as RateLimitAlgorithm, scope: 'per_user' as LimitScope, requests: 100 },
      { name: 'Per IP Limit', algorithm: 'fixed_window' as RateLimitAlgorithm, scope: 'per_ip' as LimitScope, requests: 60 },
      { name: 'Auth Endpoint Limit', algorithm: 'leaky_bucket' as RateLimitAlgorithm, scope: 'per_endpoint' as LimitScope, requests: 5 },
      { name: 'Premium Tier Limit', algorithm: 'adaptive' as RateLimitAlgorithm, scope: 'per_api_key' as LimitScope, requests: 1000 },
    ];

    rulesData.forEach((rule, idx) => {
      const ruleId = `rule-${(idx + 1).toString().padStart(4, '0')}`;
      const rateLimitRule: RateLimitRule = {
        id: ruleId,
        name: rule.name,
        description: `${rule.name} rate limiting rule`,
        algorithm: rule.algorithm,
        scope: rule.scope,
        limits: {
          requests: rule.requests,
          window: rule.scope === 'per_endpoint' ? 60 : 1,
          windowUnit: rule.scope === 'per_endpoint' ? 'minute' : 'minute',
          refillRate: rule.algorithm === 'token_bucket' ? Math.floor(rule.requests / 60) : undefined,
          refillInterval: rule.algorithm === 'token_bucket' ? 1 : undefined,
          maxTokens: rule.algorithm === 'token_bucket' ? rule.requests : undefined,
        },
        targeting: {
          endpoints: rule.scope === 'per_endpoint' ? [{ path: '/api/auth/*', pattern: 'prefix' }] : [{ path: '/api/*', pattern: 'prefix' }],
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          users: [],
          ips: [],
          apiKeys: [],
          headers: [],
          customAttributes: [],
        },
        action: {
          type: 'reject',
          statusCode: 429,
          message: 'Rate limit exceeded. Please try again later.',
          headers: [
            { name: 'X-RateLimit-Limit', value: '{{limit}}', include: 'always' },
            { name: 'X-RateLimit-Remaining', value: '{{remaining}}', include: 'always' },
            { name: 'X-RateLimit-Reset', value: '{{reset}}', include: 'always' },
          ],
          retryAfter: true,
        },
        quotas: {
          enabled: idx >= 3,
          quotas: idx >= 3 ? [
            { id: 'quota-1', name: 'Daily Requests', type: 'requests', limit: rule.requests * 60 * 24, period: 'day', overageAllowed: false },
          ] : [],
          rollover: false,
          notifications: [
            { threshold: 80, channels: ['email'], message: 'You have used 80% of your quota', repeat: false },
            { threshold: 100, channels: ['email', 'webhook'], message: 'Quota exceeded', repeat: true, repeatInterval: 3600 },
          ],
        },
        burst: {
          enabled: true,
          maxBurst: Math.floor(rule.requests * 1.5),
          burstWindow: 10,
          burstWindowUnit: 'seconds',
          cooldown: 30,
          cooldownUnit: 'seconds',
          carryover: false,
        },
        scheduling: {
          enabled: idx === 0,
          schedules: idx === 0 ? [
            { id: 'sched-1', name: 'Peak Hours', limits: { requests: rule.requests * 2, window: 1, windowUnit: 'minute' }, daysOfWeek: [1, 2, 3, 4, 5], startTime: '09:00', endTime: '17:00', priority: 1 },
          ] : [],
          timezone: 'UTC',
          holidays: { enabled: false, holidays: [], behavior: 'increase' },
        },
        exemptions: {
          enabled: true,
          users: ['admin'],
          groups: ['internal'],
          ips: ['10.0.0.0/8', '192.168.0.0/16'],
          apiKeys: [],
          tokens: [],
          conditions: [],
        },
        monitoring: {
          enabled: true,
          alerts: [
            { id: 'alert-1', name: 'High Rejection Rate', condition: { metric: 'rejection_rate', operator: 'gt', threshold: 10, duration: 5, durationUnit: 'minutes' }, channels: ['slack', 'pagerduty'], severity: 'warning', cooldown: 300, enabled: true },
          ],
          metrics: [
            { name: 'requests_total', type: 'counter', labels: ['rule_id', 'status'] },
            { name: 'request_latency', type: 'histogram', labels: ['rule_id'], buckets: [5, 10, 25, 50, 100, 250, 500] },
          ],
          logging: { enabled: true, level: 'info', logAccepted: false, logRejected: true, logQuota: true, fields: ['client_id', 'endpoint', 'status'], sampling: 0.1 },
          dashboard: { enabled: true, refreshInterval: 30, timeRange: '1h', widgets: [] },
        },
        metadata: {
          createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
          createdBy: 'admin',
          updatedAt: new Date(),
          updatedBy: 'admin',
          version: 3,
          tags: [rule.algorithm, rule.scope],
          labels: { environment: 'production' },
          status: 'active',
          priority: idx + 1,
        },
      };
      this.rules.set(ruleId, rateLimitRule);
    });

    // Initialize Clients
    const clientsData = [
      { identifier: 'user-001', type: 'user' as const, tier: 'free' },
      { identifier: 'user-002', type: 'user' as const, tier: 'basic' },
      { identifier: 'api-key-001', type: 'api_key' as const, tier: 'premium' },
      { identifier: '192.168.1.100', type: 'ip' as const, tier: 'free' },
      { identifier: 'tenant-001', type: 'tenant' as const, tier: 'enterprise' },
    ];

    const tiers: Record<string, ClientTier> = {
      free: { id: 'tier-free', name: 'Free', level: 1, multiplier: 1, features: ['basic_api'], limits: { requestsPerSecond: 1, requestsPerMinute: 60, requestsPerHour: 1000, requestsPerDay: 10000, burstLimit: 10, quotaMultiplier: 1 } },
      basic: { id: 'tier-basic', name: 'Basic', level: 2, multiplier: 2, features: ['basic_api', 'priority_support'], limits: { requestsPerSecond: 5, requestsPerMinute: 300, requestsPerHour: 5000, requestsPerDay: 50000, burstLimit: 25, quotaMultiplier: 2 } },
      premium: { id: 'tier-premium', name: 'Premium', level: 3, multiplier: 5, features: ['full_api', 'priority_support', 'sla'], limits: { requestsPerSecond: 20, requestsPerMinute: 1000, requestsPerHour: 20000, requestsPerDay: 200000, burstLimit: 100, quotaMultiplier: 5 } },
      enterprise: { id: 'tier-enterprise', name: 'Enterprise', level: 4, multiplier: 10, features: ['full_api', 'dedicated_support', 'custom_sla'], limits: { requestsPerSecond: 100, requestsPerMinute: 5000, requestsPerHour: 100000, requestsPerDay: 1000000, burstLimit: 500, quotaMultiplier: 10 } },
    };

    clientsData.forEach((client, idx) => {
      const clientId = `client-${(idx + 1).toString().padStart(4, '0')}`;
      const rateLimitClient: RateLimitClient = {
        id: clientId,
        identifier: client.identifier,
        type: client.type,
        name: `Client ${idx + 1}`,
        tier: tiers[client.tier],
        limits: { custom: false, overrides: [], temporaryBoosts: [] },
        quotas: {
          allocations: [{ quotaId: 'quota-1', allocated: tiers[client.tier].limits.requestsPerDay, used: Math.floor(tiers[client.tier].limits.requestsPerDay * 0.3), remaining: Math.floor(tiers[client.tier].limits.requestsPerDay * 0.7), resetAt: new Date(Date.now() + 12 * 60 * 60 * 1000) }],
          purchases: [],
          rollover: { enabled: client.tier !== 'free', maxRollover: tiers[client.tier].limits.requestsPerDay * 0.2, currentRollover: 0 },
        },
        usage: {
          current: { timestamp: new Date(), requests: 1000, accepted: 990, rejected: 10, queued: 0, throttled: 0, bandwidth: 50000, latencyP50: 25, latencyP95: 100, latencyP99: 250 },
          hourly: [],
          daily: [],
          monthly: [],
          patterns: { peakHour: 14, peakDay: 3, averageRequests: 500, burstFrequency: 2, anomalyScore: 0.1 },
        },
        status: { state: idx === 3 ? 'limited' : 'active', violations: idx === 3 ? [{ id: 'viol-1', timestamp: new Date(), type: 'rate_exceeded', severity: 'minor', details: { exceeded_by: 10 }, resolved: false }] : [] },
        history: [{ timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), action: 'created', details: { tier: client.tier } }],
        metadata: { createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), updatedAt: new Date(), tags: [client.type, client.tier] },
      };
      this.clients.set(clientId, rateLimitClient);
    });

    // Initialize Policies
    const policy: RateLimitPolicy = {
      id: 'policy-0001',
      name: 'Default API Policy',
      description: 'Default rate limiting policy for all API endpoints',
      rules: Array.from(this.rules.keys()),
      priority: 1,
      scope: 'global',
      environments: ['production', 'staging'],
      tenants: [],
      inheritance: { inherit: false, override: 'merge' },
      defaults: {
        algorithm: 'sliding_window',
        limits: { requests: 100, window: 1, windowUnit: 'minute' },
        action: { type: 'reject', statusCode: 429, message: 'Rate limit exceeded', headers: [], retryAfter: true },
        monitoring: { enabled: true, alerts: [], metrics: [], logging: { enabled: true, level: 'info', logAccepted: false, logRejected: true, logQuota: true, fields: [], sampling: 0.1 }, dashboard: { enabled: true, refreshInterval: 30, timeRange: '1h', widgets: [] } },
      },
      enforcement: { mode: 'enforce', dryRun: false, logging: true, alerting: true },
      metadata: { createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), createdBy: 'admin', updatedAt: new Date(), version: 5, status: 'active' },
    };
    this.policies.set(policy.id, policy);
  }

  // Rule Operations
  public getRules(scope?: LimitScope, status?: LimitStatus): RateLimitRule[] {
    let rules = Array.from(this.rules.values());
    if (scope) rules = rules.filter((r) => r.scope === scope);
    if (status) rules = rules.filter((r) => r.metadata.status === status);
    return rules;
  }

  public getRuleById(id: string): RateLimitRule | undefined {
    return this.rules.get(id);
  }

  // Client Operations
  public getClients(type?: RateLimitClient['type']): RateLimitClient[] {
    let clients = Array.from(this.clients.values());
    if (type) clients = clients.filter((c) => c.type === type);
    return clients;
  }

  public getClientById(id: string): RateLimitClient | undefined {
    return this.clients.get(id);
  }

  // Policy Operations
  public getPolicies(): RateLimitPolicy[] {
    return Array.from(this.policies.values());
  }

  public getPolicyById(id: string): RateLimitPolicy | undefined {
    return this.policies.get(id);
  }

  // Rate Limit Check
  public checkRateLimit(request: RateLimitRequest): RateLimitResponse {
    const rule = Array.from(this.rules.values())[0];
    const remaining = Math.floor(Math.random() * rule.limits.requests);
    return {
      allowed: remaining > 0,
      remaining,
      limit: rule.limits.requests,
      reset: new Date(Date.now() + 60000),
      action: remaining > 0 ? 'reject' : rule.action.type,
      ruleId: rule.id,
      headers: {
        'X-RateLimit-Limit': String(rule.limits.requests),
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Reset': String(Math.floor((Date.now() + 60000) / 1000)),
      },
    };
  }

  // Statistics
  public getStatistics(): RateLimitingStatistics {
    const rules = Array.from(this.rules.values());
    const clients = Array.from(this.clients.values());

    const byAlgorithm: Record<RateLimitAlgorithm, number> = { token_bucket: 0, leaky_bucket: 0, fixed_window: 0, sliding_window: 0, sliding_log: 0, adaptive: 0 };
    const byScope: Record<LimitScope, number> = { global: 0, per_user: 0, per_ip: 0, per_api_key: 0, per_endpoint: 0, per_tenant: 0, custom: 0 };

    rules.forEach((r) => {
      byAlgorithm[r.algorithm]++;
      byScope[r.scope]++;
    });

    const totalRequests = clients.reduce((sum, c) => sum + c.usage.current.requests, 0);
    const totalAccepted = clients.reduce((sum, c) => sum + c.usage.current.accepted, 0);
    const totalRejected = clients.reduce((sum, c) => sum + c.usage.current.rejected, 0);

    return {
      overview: {
        totalRules: rules.length,
        activeRules: rules.filter((r) => r.metadata.status === 'active').length,
        totalClients: clients.length,
        activeClients: clients.filter((c) => c.status.state === 'active').length,
        limitedClients: clients.filter((c) => c.status.state === 'limited').length,
        blockedClients: clients.filter((c) => c.status.state === 'blocked').length,
      },
      requests: {
        total: totalRequests,
        accepted: totalAccepted,
        rejected: totalRejected,
        queued: clients.reduce((sum, c) => sum + c.usage.current.queued, 0),
        throttled: clients.reduce((sum, c) => sum + c.usage.current.throttled, 0),
        acceptRate: totalRequests > 0 ? (totalAccepted / totalRequests) * 100 : 0,
        rejectRate: totalRequests > 0 ? (totalRejected / totalRequests) * 100 : 0,
      },
      quotas: {
        totalAllocated: clients.reduce((sum, c) => sum + c.quotas.allocations.reduce((s, a) => s + a.allocated, 0), 0),
        totalUsed: clients.reduce((sum, c) => sum + c.quotas.allocations.reduce((s, a) => s + a.used, 0), 0),
        utilizationRate: 30,
        exceededCount: 2,
      },
      performance: {
        avgLatencyMs: 5,
        p50LatencyMs: 3,
        p95LatencyMs: 15,
        p99LatencyMs: 50,
        throughput: 10000,
      },
      byAlgorithm,
      byScope,
      topLimited: clients.filter((c) => c.status.violations.length > 0).map((c) => ({ clientId: c.id, rejections: c.usage.current.rejected, lastLimited: c.status.violations[0]?.timestamp || new Date() })),
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

export const rateLimitingService = RateLimitingService.getInstance();
export type {
  RateLimitAlgorithm,
  LimitScope,
  LimitAction,
  LimitStatus,
  RateLimitRule,
  LimitConfiguration,
  WarmupConfig,
  RuleTargeting,
  EndpointTarget,
  UserTarget,
  IPTarget,
  IPRange,
  GeoTarget,
  HeaderTarget,
  CustomTarget,
  LimitActionConfig,
  ResponseHeader,
  QueueActionConfig,
  ThrottleActionConfig,
  DegradeActionConfig,
  RedirectActionConfig,
  QuotaConfiguration,
  Quota,
  QuotaNotification,
  BurstConfiguration,
  RuleScheduling,
  RuleSchedule,
  HolidayConfig,
  Holiday,
  RuleExemptions,
  ExemptionToken,
  ExemptionCondition,
  RuleMonitoring,
  MonitoringAlert,
  AlertCondition,
  MonitoringMetric,
  LoggingConfig,
  DashboardConfig,
  DashboardWidget,
  RuleMetadata,
  RateLimitClient,
  ClientTier,
  TierLimits,
  ClientLimits,
  LimitOverride,
  TemporaryBoost,
  ClientQuotas,
  QuotaAllocation,
  QuotaPurchase,
  QuotaRollover,
  ClientUsage,
  UsageSnapshot,
  UsagePattern,
  ClientStatus,
  Violation,
  ClientHistory,
  ClientMetadata,
  RateLimitRequest,
  RateLimitResponse,
  QuotaStatus,
  RateLimitWindow,
  RateLimitPolicy,
  PolicyInheritance,
  PolicyDefaults,
  PolicyEnforcement,
  PolicyMetadata,
  DistributedRateLimiter,
  DistributedConfig,
  LimiterNode,
  ReplicationConfig,
  FailoverConfig,
  CircuitBreakerConfig,
  LimiterHealth,
  RateLimitingStatistics,
};
