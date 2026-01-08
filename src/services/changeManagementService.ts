/**
 * Change Management Service
 * Comprehensive change request, approval workflow, and deployment tracking
 */

// Change Type
type ChangeType = 'standard' | 'normal' | 'emergency' | 'routine' | 'major' | 'minor';

// Change Status
type ChangeStatus = 'draft' | 'submitted' | 'pending_approval' | 'approved' | 'scheduled' | 'implementing' | 'completed' | 'failed' | 'rolled_back' | 'cancelled';

// Change Risk Level
type ChangeRiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'minimal';

// Change Category
type ChangeCategory = 'infrastructure' | 'application' | 'database' | 'network' | 'security' | 'configuration' | 'hardware' | 'software' | 'process';

// Change Impact
type ChangeImpact = 'critical' | 'major' | 'moderate' | 'minor' | 'none';

// Approval Status
type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'withdrawn';

// Change Request
interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  type: ChangeType;
  category: ChangeCategory;
  status: ChangeStatus;
  risk: ChangeRiskAssessment;
  impact: ChangeImpactAssessment;
  requester: ChangeRequester;
  assignee?: ChangeAssignee;
  approvals: ApprovalRecord[];
  schedule: ChangeSchedule;
  implementation: ImplementationPlan;
  rollback: RollbackPlan;
  testing: TestingPlan;
  communication: CommunicationPlan;
  affectedItems: AffectedItem[];
  relatedChanges: string[];
  relatedIncidents: string[];
  attachments: ChangeAttachment[];
  auditTrail: AuditEntry[];
  metrics: ChangeMetrics;
  metadata: ChangeMetadata;
}

// Change Risk Assessment
interface ChangeRiskAssessment {
  level: ChangeRiskLevel;
  score: number;
  factors: RiskFactor[];
  mitigations: RiskMitigation[];
  acceptedBy?: string;
  acceptedAt?: Date;
  notes?: string;
}

// Risk Factor
interface RiskFactor {
  id: string;
  name: string;
  category: 'technical' | 'business' | 'operational' | 'security' | 'compliance';
  weight: number;
  score: number;
  description: string;
  evidence?: string;
}

// Risk Mitigation
interface RiskMitigation {
  id: string;
  riskFactorId: string;
  description: string;
  type: 'preventive' | 'detective' | 'corrective';
  status: 'planned' | 'implemented' | 'verified';
  owner: string;
  dueDate?: Date;
  completedAt?: Date;
}

// Change Impact Assessment
interface ChangeImpactAssessment {
  level: ChangeImpact;
  businessImpact: BusinessImpact;
  technicalImpact: TechnicalImpact;
  serviceImpact: ServiceImpact;
  userImpact: UserImpact;
  downtime: DowntimeEstimate;
}

// Business Impact
interface BusinessImpact {
  level: ChangeImpact;
  description: string;
  affectedProcesses: string[];
  revenueImpact?: number;
  slaImpact: boolean;
  regulatoryImpact: boolean;
}

// Technical Impact
interface TechnicalImpact {
  level: ChangeImpact;
  description: string;
  affectedSystems: string[];
  dependencies: string[];
  performanceImpact: 'none' | 'minor' | 'moderate' | 'significant';
  securityImpact: 'none' | 'minor' | 'moderate' | 'significant';
}

// Service Impact
interface ServiceImpact {
  level: ChangeImpact;
  affectedServices: ServiceAffected[];
  totalServicesAffected: number;
  degradationExpected: boolean;
  outageExpected: boolean;
}

// Service Affected
interface ServiceAffected {
  id: string;
  name: string;
  impact: ChangeImpact;
  degradationDuration?: number;
  outageDuration?: number;
  workaround?: string;
}

// User Impact
interface UserImpact {
  level: ChangeImpact;
  affectedUsers: number;
  userGroups: string[];
  notificationRequired: boolean;
  trainingRequired: boolean;
}

// Downtime Estimate
interface DowntimeEstimate {
  expected: boolean;
  plannedDuration: number;
  worstCase: number;
  maintenanceWindow: boolean;
  serviceGracefulDegradation: boolean;
}

// Change Requester
interface ChangeRequester {
  id: string;
  name: string;
  email: string;
  team: string;
  department: string;
  role: string;
  phone?: string;
}

// Change Assignee
interface ChangeAssignee {
  id: string;
  name: string;
  email: string;
  team: string;
  role: 'implementer' | 'coordinator' | 'lead';
  assignedAt: Date;
  assignedBy: string;
}

// Approval Record
interface ApprovalRecord {
  id: string;
  approver: Approver;
  level: number;
  type: 'required' | 'optional' | 'informed';
  status: ApprovalStatus;
  requestedAt: Date;
  respondedAt?: Date;
  comments?: string;
  conditions?: string[];
  delegatedFrom?: string;
}

// Approver
interface Approver {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  authority: 'technical' | 'business' | 'security' | 'executive' | 'cab';
}

// Change Schedule
interface ChangeSchedule {
  requestedDate: Date;
  scheduledStart?: Date;
  scheduledEnd?: Date;
  actualStart?: Date;
  actualEnd?: Date;
  maintenanceWindow?: MaintenanceWindow;
  blackoutWindows: BlackoutWindow[];
  timezone: string;
  recurring: boolean;
  recurrence?: RecurrencePattern;
}

// Maintenance Window
interface MaintenanceWindow {
  id: string;
  name: string;
  start: Date;
  end: Date;
  description: string;
  affectedServices: string[];
}

// Blackout Window
interface BlackoutWindow {
  id: string;
  name: string;
  start: Date;
  end: Date;
  reason: string;
  enforced: boolean;
}

// Recurrence Pattern
interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  interval: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
  endDate?: Date;
  occurrences?: number;
}

// Implementation Plan
interface ImplementationPlan {
  summary: string;
  steps: ImplementationStep[];
  resources: Resource[];
  dependencies: Dependency[];
  prerequisites: Prerequisite[];
  verificationSteps: VerificationStep[];
  estimatedDuration: number;
  actualDuration?: number;
}

// Implementation Step
interface ImplementationStep {
  id: string;
  order: number;
  name: string;
  description: string;
  type: 'manual' | 'automated' | 'approval' | 'verification';
  owner: string;
  estimatedDuration: number;
  actualDuration?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  startedAt?: Date;
  completedAt?: Date;
  commands?: string[];
  automationId?: string;
  notes?: string;
  output?: string;
}

// Resource
interface Resource {
  type: 'person' | 'system' | 'tool' | 'credential' | 'environment';
  name: string;
  description: string;
  required: boolean;
  available: boolean;
  owner?: string;
}

// Dependency
interface Dependency {
  id: string;
  type: 'change' | 'system' | 'service' | 'resource' | 'approval';
  name: string;
  description: string;
  status: 'pending' | 'resolved' | 'blocked';
  blocker: boolean;
  externalId?: string;
}

// Prerequisite
interface Prerequisite {
  id: string;
  description: string;
  type: 'backup' | 'approval' | 'communication' | 'system_state' | 'resource' | 'other';
  status: 'pending' | 'completed' | 'waived';
  completedAt?: Date;
  completedBy?: string;
  evidence?: string;
}

// Verification Step
interface VerificationStep {
  id: string;
  name: string;
  description: string;
  type: 'manual' | 'automated' | 'monitoring';
  expected: string;
  actual?: string;
  status: 'pending' | 'passed' | 'failed' | 'skipped';
  executedAt?: Date;
  executedBy?: string;
}

// Rollback Plan
interface RollbackPlan {
  available: boolean;
  automatic: boolean;
  triggerConditions: string[];
  steps: RollbackStep[];
  estimatedDuration: number;
  dataRecovery: boolean;
  tested: boolean;
  testedAt?: Date;
  testedBy?: string;
}

// Rollback Step
interface RollbackStep {
  id: string;
  order: number;
  name: string;
  description: string;
  type: 'manual' | 'automated';
  owner: string;
  commands?: string[];
  automationId?: string;
  verificationStep?: string;
}

// Testing Plan
interface TestingPlan {
  required: boolean;
  environments: TestEnvironment[];
  testCases: TestCase[];
  approvalRequired: boolean;
  signoffBy?: string;
  signoffAt?: Date;
}

// Test Environment
interface TestEnvironment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'uat' | 'pre-production';
  status: 'available' | 'in_use' | 'unavailable';
  url?: string;
}

// Test Case
interface TestCase {
  id: string;
  name: string;
  description: string;
  type: 'functional' | 'performance' | 'security' | 'regression' | 'smoke';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'passed' | 'failed' | 'skipped';
  executedAt?: Date;
  executedBy?: string;
  results?: string;
  evidence?: string;
}

// Communication Plan
interface CommunicationPlan {
  notifications: ChangeNotification[];
  stakeholders: Stakeholder[];
  channels: string[];
  schedule: NotificationSchedule[];
}

// Change Notification
interface ChangeNotification {
  id: string;
  type: 'pre_change' | 'start' | 'update' | 'completion' | 'rollback' | 'failure';
  audience: 'internal' | 'external' | 'customers' | 'stakeholders';
  channel: 'email' | 'slack' | 'statuspage' | 'sms' | 'teams';
  subject: string;
  message: string;
  scheduledFor: Date;
  sentAt?: Date;
  status: 'pending' | 'sent' | 'failed';
}

// Stakeholder
interface Stakeholder {
  id: string;
  name: string;
  email: string;
  role: string;
  notificationLevel: 'all' | 'important' | 'critical' | 'none';
  approver: boolean;
}

// Notification Schedule
interface NotificationSchedule {
  triggerEvent: 'pre_change' | 'start' | 'milestone' | 'completion' | 'failure';
  timing: number;
  audiences: string[];
  channels: string[];
}

// Affected Item
interface AffectedItem {
  id: string;
  type: 'service' | 'server' | 'database' | 'application' | 'configuration' | 'network' | 'other';
  name: string;
  description: string;
  environment: string;
  owner: string;
  criticality: 'critical' | 'high' | 'medium' | 'low';
  currentVersion?: string;
  targetVersion?: string;
}

// Change Attachment
interface ChangeAttachment {
  id: string;
  name: string;
  type: 'document' | 'diagram' | 'script' | 'log' | 'screenshot' | 'other';
  url: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  description?: string;
}

// Audit Entry
interface AuditEntry {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  ipAddress?: string;
  userAgent?: string;
}

// Change Metrics
interface ChangeMetrics {
  timeToApproval: number;
  timeToImplementation: number;
  implementationDuration: number;
  totalDuration: number;
  approvalCycles: number;
  rollbackCount: number;
  testingDuration: number;
  communicationCount: number;
  stakeholdersNotified: number;
}

// Change Metadata
interface ChangeMetadata {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  version: number;
  tags: string[];
  labels: Record<string, string>;
  externalReferences: ExternalReference[];
}

// External Reference
interface ExternalReference {
  type: 'ticket' | 'project' | 'release' | 'incident' | 'document';
  id: string;
  url: string;
  name: string;
}

// Change Policy
interface ChangePolicy {
  id: string;
  name: string;
  description: string;
  type: ChangeType;
  category?: ChangeCategory;
  criteria: PolicyCriteria;
  approvalRequirements: ApprovalRequirement[];
  restrictions: PolicyRestriction[];
  sla: PolicySLA;
  notifications: PolicyNotification[];
  status: 'active' | 'draft' | 'disabled';
  metadata: {
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    version: number;
  };
}

// Policy Criteria
interface PolicyCriteria {
  riskLevels: ChangeRiskLevel[];
  impactLevels: ChangeImpact[];
  categories: ChangeCategory[];
  services?: string[];
  environments?: string[];
}

// Approval Requirement
interface ApprovalRequirement {
  level: number;
  name: string;
  approverRoles: string[];
  count: number;
  type: 'all' | 'any' | 'majority';
  timeout: number;
  escalationPolicy?: string;
}

// Policy Restriction
interface PolicyRestriction {
  type: 'blackout' | 'approval' | 'testing' | 'communication';
  description: string;
  condition: string;
  enforced: boolean;
}

// Policy SLA
interface PolicySLA {
  approvalTime: number;
  implementationStart: number;
  reviewTime: number;
  closureTime: number;
}

// Policy Notification
interface PolicyNotification {
  event: string;
  recipients: string[];
  channels: string[];
  template: string;
}

// Change Advisory Board
interface ChangeAdvisoryBoard {
  id: string;
  name: string;
  description: string;
  members: CABMember[];
  schedule: CABSchedule;
  pendingChanges: string[];
  reviewedChanges: CABReview[];
  policies: string[];
  status: 'active' | 'inactive';
  metadata: {
    createdAt: Date;
    updatedAt: Date;
  };
}

// CAB Member
interface CABMember {
  id: string;
  name: string;
  email: string;
  role: 'chair' | 'member' | 'advisor' | 'secretary';
  department: string;
  votingRights: boolean;
  active: boolean;
}

// CAB Schedule
interface CABSchedule {
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'adhoc';
  dayOfWeek?: number;
  time: string;
  timezone: string;
  duration: number;
  nextMeeting?: Date;
  location?: string;
  virtualLink?: string;
}

// CAB Review
interface CABReview {
  changeId: string;
  reviewDate: Date;
  decision: 'approved' | 'rejected' | 'deferred' | 'more_info';
  votes: CABVote[];
  comments: string;
  conditions?: string[];
  nextReviewDate?: Date;
}

// CAB Vote
interface CABVote {
  memberId: string;
  memberName: string;
  vote: 'approve' | 'reject' | 'abstain';
  comments?: string;
  timestamp: Date;
}

// Change Statistics
interface ChangeStatistics {
  overview: {
    totalChanges: number;
    pendingChanges: number;
    inProgressChanges: number;
    completedChanges: number;
    failedChanges: number;
    rolledBackChanges: number;
    successRate: number;
  };
  byType: Record<ChangeType, number>;
  byStatus: Record<ChangeStatus, number>;
  byRisk: Record<ChangeRiskLevel, number>;
  byCategory: Record<ChangeCategory, number>;
  byTeam: Record<string, number>;
  performance: {
    avgApprovalTime: number;
    avgImplementationTime: number;
    avgLeadTime: number;
    changeVelocity: number;
    rollbackRate: number;
  };
  compliance: {
    policyCompliance: number;
    slaCompliance: number;
    emergencyChangeRate: number;
    unauthorizedChanges: number;
  };
  trends: {
    timestamp: Date;
    created: number;
    completed: number;
    failed: number;
  }[];
}

class ChangeManagementService {
  private static instance: ChangeManagementService;
  private changes: Map<string, ChangeRequest> = new Map();
  private policies: Map<string, ChangePolicy> = new Map();
  private cabs: Map<string, ChangeAdvisoryBoard> = new Map();
  private eventListeners: ((event: string, data: unknown) => void)[] = [];

  private constructor() {
    this.initializeSampleData();
  }

  public static getInstance(): ChangeManagementService {
    if (!ChangeManagementService.instance) {
      ChangeManagementService.instance = new ChangeManagementService();
    }
    return ChangeManagementService.instance;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeSampleData(): void {
    // Initialize Change Requests
    const changesData = [
      { title: 'Deploy API Gateway v2.5.0', type: 'normal' as ChangeType, category: 'application' as ChangeCategory, status: 'implementing' as ChangeStatus, risk: 'medium' as ChangeRiskLevel },
      { title: 'Database Schema Migration', type: 'normal' as ChangeType, category: 'database' as ChangeCategory, status: 'approved' as ChangeStatus, risk: 'high' as ChangeRiskLevel },
      { title: 'Security Patch - CVE-2024-1234', type: 'emergency' as ChangeType, category: 'security' as ChangeCategory, status: 'completed' as ChangeStatus, risk: 'critical' as ChangeRiskLevel },
      { title: 'Network Configuration Update', type: 'standard' as ChangeType, category: 'network' as ChangeCategory, status: 'pending_approval' as ChangeStatus, risk: 'low' as ChangeRiskLevel },
      { title: 'Infrastructure Scaling', type: 'normal' as ChangeType, category: 'infrastructure' as ChangeCategory, status: 'scheduled' as ChangeStatus, risk: 'medium' as ChangeRiskLevel },
    ];

    changesData.forEach((c, idx) => {
      const createdDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      const change: ChangeRequest = {
        id: `CHG-${(idx + 1).toString().padStart(6, '0')}`,
        title: c.title,
        description: `${c.title} - detailed description of the change request`,
        type: c.type,
        category: c.category,
        status: c.status,
        risk: {
          level: c.risk,
          score: c.risk === 'critical' ? 90 : c.risk === 'high' ? 70 : c.risk === 'medium' ? 50 : 30,
          factors: [
            { id: `rf-${idx}-1`, name: 'Complexity', category: 'technical', weight: 0.3, score: 60, description: 'Technical complexity assessment' },
            { id: `rf-${idx}-2`, name: 'Impact Scope', category: 'business', weight: 0.4, score: 70, description: 'Business impact scope' },
            { id: `rf-${idx}-3`, name: 'Experience', category: 'operational', weight: 0.3, score: 50, description: 'Team experience with this type of change' },
          ],
          mitigations: [
            { id: `rm-${idx}-1`, riskFactorId: `rf-${idx}-1`, description: 'Thorough testing in staging', type: 'preventive', status: 'implemented', owner: 'dev-team', completedAt: new Date() },
          ],
          acceptedBy: 'risk-manager',
          acceptedAt: new Date(createdDate.getTime() + 24 * 60 * 60 * 1000),
        },
        impact: {
          level: c.risk === 'critical' ? 'critical' : c.risk === 'high' ? 'major' : 'moderate',
          businessImpact: { level: 'moderate', description: 'Moderate business impact', affectedProcesses: ['api-calls', 'user-authentication'], slaImpact: false, regulatoryImpact: false },
          technicalImpact: { level: 'moderate', description: 'Moderate technical impact', affectedSystems: ['api-gateway', 'load-balancer'], dependencies: [], performanceImpact: 'minor', securityImpact: 'none' },
          serviceImpact: { level: 'moderate', affectedServices: [{ id: `svc-${idx}`, name: 'API Gateway', impact: 'moderate', degradationDuration: 30 }], totalServicesAffected: 1, degradationExpected: true, outageExpected: false },
          userImpact: { level: 'minor', affectedUsers: Math.floor(Math.random() * 10000) + 1000, userGroups: ['all-users'], notificationRequired: true, trainingRequired: false },
          downtime: { expected: true, plannedDuration: 30, worstCase: 60, maintenanceWindow: true, serviceGracefulDegradation: true },
        },
        requester: { id: `req-${idx}`, name: 'John Doe', email: 'john.doe@example.com', team: 'platform', department: 'engineering', role: 'senior-engineer' },
        assignee: { id: `assign-${idx}`, name: 'Jane Smith', email: 'jane.smith@example.com', team: 'platform', role: 'implementer', assignedAt: createdDate, assignedBy: 'team-lead' },
        approvals: [
          { id: `appr-${idx}-1`, approver: { id: 'appr-1', name: 'Tech Lead', email: 'tech.lead@example.com', role: 'tech-lead', team: 'platform', authority: 'technical' }, level: 1, type: 'required', status: c.status !== 'draft' && c.status !== 'submitted' ? 'approved' : 'pending', requestedAt: createdDate, respondedAt: c.status !== 'draft' ? new Date(createdDate.getTime() + 2 * 60 * 60 * 1000) : undefined },
          { id: `appr-${idx}-2`, approver: { id: 'appr-2', name: 'CAB', email: 'cab@example.com', role: 'cab-member', team: 'governance', authority: 'cab' }, level: 2, type: 'required', status: c.status === 'approved' || c.status === 'scheduled' || c.status === 'implementing' || c.status === 'completed' ? 'approved' : 'pending', requestedAt: new Date(createdDate.getTime() + 4 * 60 * 60 * 1000) },
        ],
        schedule: {
          requestedDate: new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          scheduledStart: c.status === 'scheduled' || c.status === 'implementing' || c.status === 'completed' ? new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000) : undefined,
          scheduledEnd: c.status === 'scheduled' || c.status === 'implementing' || c.status === 'completed' ? new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000) : undefined,
          actualStart: c.status === 'implementing' || c.status === 'completed' ? new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000) : undefined,
          actualEnd: c.status === 'completed' ? new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000) : undefined,
          maintenanceWindow: { id: `mw-${idx}`, name: 'Weekly Maintenance', start: new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000), end: new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), description: 'Weekly maintenance window', affectedServices: ['api-gateway'] },
          blackoutWindows: [],
          timezone: 'America/New_York',
          recurring: false,
        },
        implementation: {
          summary: `Implementation plan for ${c.title}`,
          steps: [
            { id: `step-${idx}-1`, order: 1, name: 'Pre-flight checks', description: 'Verify prerequisites', type: 'manual', owner: 'implementer', estimatedDuration: 15, status: c.status === 'implementing' || c.status === 'completed' ? 'completed' : 'pending' },
            { id: `step-${idx}-2`, order: 2, name: 'Apply changes', description: 'Execute change', type: 'automated', owner: 'automation', estimatedDuration: 30, status: c.status === 'completed' ? 'completed' : c.status === 'implementing' ? 'in_progress' : 'pending' },
            { id: `step-${idx}-3`, order: 3, name: 'Verify changes', description: 'Verify successful implementation', type: 'verification', owner: 'implementer', estimatedDuration: 15, status: c.status === 'completed' ? 'completed' : 'pending' },
          ],
          resources: [
            { type: 'person', name: 'Implementer', description: 'Primary implementer', required: true, available: true },
            { type: 'system', name: 'Deployment Pipeline', description: 'CI/CD system', required: true, available: true },
          ],
          dependencies: [],
          prerequisites: [
            { id: `prereq-${idx}-1`, description: 'Backup completed', type: 'backup', status: c.status !== 'draft' && c.status !== 'submitted' && c.status !== 'pending_approval' ? 'completed' : 'pending' },
            { id: `prereq-${idx}-2`, description: 'Stakeholders notified', type: 'communication', status: c.status !== 'draft' && c.status !== 'submitted' ? 'completed' : 'pending' },
          ],
          verificationSteps: [
            { id: `verify-${idx}-1`, name: 'Health check', description: 'Verify service health', type: 'automated', expected: 'All health checks pass', status: c.status === 'completed' ? 'passed' : 'pending' },
            { id: `verify-${idx}-2`, name: 'Smoke test', description: 'Run smoke tests', type: 'automated', expected: 'All tests pass', status: c.status === 'completed' ? 'passed' : 'pending' },
          ],
          estimatedDuration: 60,
          actualDuration: c.status === 'completed' ? 55 : undefined,
        },
        rollback: {
          available: true,
          automatic: false,
          triggerConditions: ['Health check failures', 'Error rate > 5%', 'Latency > 2x baseline'],
          steps: [
            { id: `rb-${idx}-1`, order: 1, name: 'Revert deployment', description: 'Revert to previous version', type: 'automated', owner: 'automation', automationId: 'rollback-job' },
            { id: `rb-${idx}-2`, order: 2, name: 'Verify rollback', description: 'Verify service restored', type: 'manual', owner: 'implementer' },
          ],
          estimatedDuration: 30,
          dataRecovery: false,
          tested: true,
          testedAt: new Date(createdDate.getTime() + 2 * 24 * 60 * 60 * 1000),
          testedBy: 'qa-engineer',
        },
        testing: {
          required: true,
          environments: [
            { id: `env-${idx}-1`, name: 'Staging', type: 'staging', status: 'available', url: 'https://staging.example.com' },
          ],
          testCases: [
            { id: `tc-${idx}-1`, name: 'Functional tests', description: 'Core functionality tests', type: 'functional', priority: 'critical', status: c.status !== 'draft' && c.status !== 'submitted' ? 'passed' : 'pending' },
            { id: `tc-${idx}-2`, name: 'Performance tests', description: 'Load and performance tests', type: 'performance', priority: 'high', status: c.status !== 'draft' && c.status !== 'submitted' ? 'passed' : 'pending' },
          ],
          approvalRequired: true,
          signoffBy: c.status !== 'draft' && c.status !== 'submitted' ? 'qa-lead' : undefined,
          signoffAt: c.status !== 'draft' && c.status !== 'submitted' ? new Date(createdDate.getTime() + 3 * 24 * 60 * 60 * 1000) : undefined,
        },
        communication: {
          notifications: [
            { id: `notif-${idx}-1`, type: 'pre_change', audience: 'stakeholders', channel: 'email', subject: `Upcoming change: ${c.title}`, message: 'Change details...', scheduledFor: new Date(createdDate.getTime() + 6 * 24 * 60 * 60 * 1000), status: c.status === 'scheduled' || c.status === 'implementing' || c.status === 'completed' ? 'sent' : 'pending' },
            { id: `notif-${idx}-2`, type: 'start', audience: 'internal', channel: 'slack', subject: `Change started: ${c.title}`, message: 'Change implementation has started', scheduledFor: new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000), status: c.status === 'implementing' || c.status === 'completed' ? 'sent' : 'pending' },
          ],
          stakeholders: [
            { id: `sh-${idx}-1`, name: 'Product Manager', email: 'pm@example.com', role: 'product-manager', notificationLevel: 'important', approver: false },
            { id: `sh-${idx}-2`, name: 'Operations Lead', email: 'ops@example.com', role: 'ops-lead', notificationLevel: 'all', approver: true },
          ],
          channels: ['email', 'slack'],
          schedule: [
            { triggerEvent: 'pre_change', timing: -24, audiences: ['stakeholders'], channels: ['email'] },
            { triggerEvent: 'start', timing: 0, audiences: ['internal'], channels: ['slack'] },
          ],
        },
        affectedItems: [
          { id: `item-${idx}-1`, type: 'service', name: 'API Gateway', description: 'Primary API gateway', environment: 'production', owner: 'platform-team', criticality: 'critical', currentVersion: '2.4.0', targetVersion: '2.5.0' },
        ],
        relatedChanges: [],
        relatedIncidents: [],
        attachments: [
          { id: `att-${idx}-1`, name: 'Architecture Diagram', type: 'diagram', url: '/attachments/arch-diagram.png', size: 256000, uploadedAt: createdDate, uploadedBy: 'john.doe' },
        ],
        auditTrail: [
          { id: `audit-${idx}-1`, timestamp: createdDate, action: 'created', user: 'john.doe' },
          { id: `audit-${idx}-2`, timestamp: new Date(createdDate.getTime() + 60 * 60 * 1000), action: 'submitted', user: 'john.doe' },
        ],
        metrics: {
          timeToApproval: c.status !== 'draft' && c.status !== 'submitted' && c.status !== 'pending_approval' ? Math.floor(Math.random() * 24 * 60 * 60 * 1000) + 4 * 60 * 60 * 1000 : 0,
          timeToImplementation: c.status === 'implementing' || c.status === 'completed' ? Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000) : 0,
          implementationDuration: c.status === 'completed' ? 55 * 60 * 1000 : 0,
          totalDuration: Date.now() - createdDate.getTime(),
          approvalCycles: 1,
          rollbackCount: 0,
          testingDuration: 4 * 60 * 60 * 1000,
          communicationCount: 2,
          stakeholdersNotified: 5,
        },
        metadata: {
          createdAt: createdDate,
          createdBy: 'john.doe',
          updatedAt: new Date(),
          updatedBy: 'jane.smith',
          version: 3,
          tags: [c.type, c.category, c.risk],
          labels: { environment: 'production', team: 'platform' },
          externalReferences: [{ type: 'ticket', id: `JIRA-${1000 + idx}`, url: `https://jira.example.com/JIRA-${1000 + idx}`, name: 'Related JIRA ticket' }],
        },
      };
      this.changes.set(change.id, change);
    });

    // Initialize Policies
    const policiesData = [
      { name: 'Standard Change Policy', type: 'standard' as ChangeType },
      { name: 'Normal Change Policy', type: 'normal' as ChangeType },
      { name: 'Emergency Change Policy', type: 'emergency' as ChangeType },
    ];

    policiesData.forEach((p, idx) => {
      const policy: ChangePolicy = {
        id: `policy-${(idx + 1).toString().padStart(4, '0')}`,
        name: p.name,
        description: `Policy for ${p.type} changes`,
        type: p.type,
        criteria: {
          riskLevels: p.type === 'standard' ? ['low', 'minimal'] : p.type === 'emergency' ? ['critical', 'high', 'medium', 'low', 'minimal'] : ['high', 'medium', 'low'],
          impactLevels: p.type === 'standard' ? ['minor', 'none'] : ['critical', 'major', 'moderate', 'minor', 'none'],
          categories: ['infrastructure', 'application', 'database', 'network', 'security', 'configuration'],
        },
        approvalRequirements: [
          { level: 1, name: 'Technical Approval', approverRoles: ['tech-lead', 'senior-engineer'], count: 1, type: 'any', timeout: p.type === 'emergency' ? 1 : 24, escalationPolicy: 'default-escalation' },
          { level: 2, name: 'CAB Approval', approverRoles: ['cab-member'], count: p.type === 'standard' ? 0 : p.type === 'emergency' ? 1 : 3, type: p.type === 'standard' ? 'any' : 'majority', timeout: p.type === 'emergency' ? 2 : 72 },
        ],
        restrictions: [
          { type: 'blackout', description: 'No changes during blackout periods', condition: 'not in blackout window', enforced: true },
          { type: 'testing', description: 'Testing required for non-standard changes', condition: 'type != standard', enforced: true },
        ],
        sla: {
          approvalTime: p.type === 'emergency' ? 4 : p.type === 'standard' ? 24 : 72,
          implementationStart: p.type === 'emergency' ? 1 : 168,
          reviewTime: 24,
          closureTime: 168,
        },
        notifications: [
          { event: 'submitted', recipients: ['approvers', 'stakeholders'], channels: ['email', 'slack'], template: 'change-submitted' },
          { event: 'approved', recipients: ['requester', 'implementer'], channels: ['email', 'slack'], template: 'change-approved' },
        ],
        status: 'active',
        metadata: { createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), createdBy: 'admin', updatedAt: new Date(), version: 2 },
      };
      this.policies.set(policy.id, policy);
    });

    // Initialize CAB
    const cab: ChangeAdvisoryBoard = {
      id: 'cab-0001',
      name: 'Technical CAB',
      description: 'Technical Change Advisory Board',
      members: [
        { id: 'cab-m-1', name: 'CTO', email: 'cto@example.com', role: 'chair', department: 'engineering', votingRights: true, active: true },
        { id: 'cab-m-2', name: 'VP Engineering', email: 'vp.eng@example.com', role: 'member', department: 'engineering', votingRights: true, active: true },
        { id: 'cab-m-3', name: 'Security Lead', email: 'security@example.com', role: 'member', department: 'security', votingRights: true, active: true },
        { id: 'cab-m-4', name: 'Ops Lead', email: 'ops@example.com', role: 'member', department: 'operations', votingRights: true, active: true },
        { id: 'cab-m-5', name: 'Change Manager', email: 'change@example.com', role: 'secretary', department: 'governance', votingRights: false, active: true },
      ],
      schedule: { frequency: 'weekly', dayOfWeek: 2, time: '10:00', timezone: 'America/New_York', duration: 60, nextMeeting: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), virtualLink: 'https://meet.example.com/cab' },
      pendingChanges: ['CHG-000004'],
      reviewedChanges: [
        { changeId: 'CHG-000001', reviewDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), decision: 'approved', votes: [{ memberId: 'cab-m-1', memberName: 'CTO', vote: 'approve', timestamp: new Date() }], comments: 'Approved with conditions' },
      ],
      policies: ['policy-0001', 'policy-0002', 'policy-0003'],
      status: 'active',
      metadata: { createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), updatedAt: new Date() },
    };
    this.cabs.set(cab.id, cab);
  }

  // Change Operations
  public getChanges(status?: ChangeStatus, type?: ChangeType): ChangeRequest[] {
    let changes = Array.from(this.changes.values());
    if (status) changes = changes.filter((c) => c.status === status);
    if (type) changes = changes.filter((c) => c.type === type);
    return changes.sort((a, b) => b.metadata.createdAt.getTime() - a.metadata.createdAt.getTime());
  }

  public getChangeById(id: string): ChangeRequest | undefined {
    return this.changes.get(id);
  }

  public getPendingApprovals(): ChangeRequest[] {
    return this.getChanges('pending_approval');
  }

  // Policy Operations
  public getPolicies(): ChangePolicy[] {
    return Array.from(this.policies.values());
  }

  public getPolicyById(id: string): ChangePolicy | undefined {
    return this.policies.get(id);
  }

  public getPolicyForChangeType(type: ChangeType): ChangePolicy | undefined {
    return Array.from(this.policies.values()).find((p) => p.type === type && p.status === 'active');
  }

  // CAB Operations
  public getCABs(): ChangeAdvisoryBoard[] {
    return Array.from(this.cabs.values());
  }

  public getCABById(id: string): ChangeAdvisoryBoard | undefined {
    return this.cabs.get(id);
  }

  // Statistics
  public getStatistics(): ChangeStatistics {
    const changes = Array.from(this.changes.values());

    const byType: Record<ChangeType, number> = { standard: 0, normal: 0, emergency: 0, routine: 0, major: 0, minor: 0 };
    const byStatus: Record<ChangeStatus, number> = { draft: 0, submitted: 0, pending_approval: 0, approved: 0, scheduled: 0, implementing: 0, completed: 0, failed: 0, rolled_back: 0, cancelled: 0 };
    const byRisk: Record<ChangeRiskLevel, number> = { critical: 0, high: 0, medium: 0, low: 0, minimal: 0 };
    const byCategory: Record<ChangeCategory, number> = { infrastructure: 0, application: 0, database: 0, network: 0, security: 0, configuration: 0, hardware: 0, software: 0, process: 0 };
    const byTeam: Record<string, number> = {};

    changes.forEach((c) => {
      byType[c.type]++;
      byStatus[c.status]++;
      byRisk[c.risk.level]++;
      byCategory[c.category]++;
      byTeam[c.requester.team] = (byTeam[c.requester.team] || 0) + 1;
    });

    const completedChanges = changes.filter((c) => c.status === 'completed');
    const failedChanges = changes.filter((c) => c.status === 'failed' || c.status === 'rolled_back');

    return {
      overview: {
        totalChanges: changes.length,
        pendingChanges: changes.filter((c) => ['draft', 'submitted', 'pending_approval'].includes(c.status)).length,
        inProgressChanges: changes.filter((c) => ['approved', 'scheduled', 'implementing'].includes(c.status)).length,
        completedChanges: completedChanges.length,
        failedChanges: failedChanges.length,
        rolledBackChanges: changes.filter((c) => c.status === 'rolled_back').length,
        successRate: completedChanges.length / (completedChanges.length + failedChanges.length) * 100 || 100,
      },
      byType,
      byStatus,
      byRisk,
      byCategory,
      byTeam,
      performance: {
        avgApprovalTime: completedChanges.reduce((sum, c) => sum + c.metrics.timeToApproval, 0) / completedChanges.length / 1000 / 60 / 60 || 0,
        avgImplementationTime: completedChanges.reduce((sum, c) => sum + c.metrics.implementationDuration, 0) / completedChanges.length / 1000 / 60 || 0,
        avgLeadTime: completedChanges.reduce((sum, c) => sum + c.metrics.totalDuration, 0) / completedChanges.length / 1000 / 60 / 60 / 24 || 0,
        changeVelocity: changes.length / 7,
        rollbackRate: changes.filter((c) => c.status === 'rolled_back').length / completedChanges.length * 100 || 0,
      },
      compliance: {
        policyCompliance: 95,
        slaCompliance: 92,
        emergencyChangeRate: changes.filter((c) => c.type === 'emergency').length / changes.length * 100,
        unauthorizedChanges: 0,
      },
      trends: [],
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

export const changeManagementService = ChangeManagementService.getInstance();
export type {
  ChangeType,
  ChangeStatus,
  ChangeRiskLevel,
  ChangeCategory,
  ChangeImpact,
  ApprovalStatus,
  ChangeRequest,
  ChangeRiskAssessment,
  RiskFactor,
  RiskMitigation,
  ChangeImpactAssessment,
  BusinessImpact,
  TechnicalImpact,
  ServiceImpact,
  ServiceAffected,
  UserImpact,
  DowntimeEstimate,
  ChangeRequester,
  ChangeAssignee,
  ApprovalRecord,
  Approver,
  ChangeSchedule,
  MaintenanceWindow,
  BlackoutWindow,
  RecurrencePattern,
  ImplementationPlan,
  ImplementationStep,
  Resource,
  Dependency,
  Prerequisite,
  VerificationStep,
  RollbackPlan,
  RollbackStep,
  TestingPlan,
  TestEnvironment,
  TestCase,
  CommunicationPlan,
  ChangeNotification,
  Stakeholder,
  NotificationSchedule,
  AffectedItem,
  ChangeAttachment,
  AuditEntry,
  ChangeMetrics,
  ChangeMetadata,
  ExternalReference,
  ChangePolicy,
  PolicyCriteria,
  ApprovalRequirement,
  PolicyRestriction,
  PolicySLA,
  PolicyNotification,
  ChangeAdvisoryBoard,
  CABMember,
  CABSchedule,
  CABReview,
  CABVote,
  ChangeStatistics,
};
