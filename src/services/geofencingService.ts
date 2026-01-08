/**
 * Geofencing Service
 * Location-based triggers, zones, and proximity alerts for disaster management
 */

// Zone type
type ZoneType = 'danger' | 'evacuation' | 'safe' | 'shelter' | 'distribution' | 'hospital' | 'checkpoint' | 'restricted' | 'monitoring' | 'custom';

// Zone status
type ZoneStatus = 'active' | 'inactive' | 'pending' | 'expired' | 'archived';

// Alert trigger type
type TriggerType = 'enter' | 'exit' | 'dwell' | 'crossing' | 'proximity';

// Shape type
type ShapeType = 'circle' | 'polygon' | 'rectangle';

// Coordinate
interface Coordinate {
  latitude: number;
  longitude: number;
}

// Geofence zone
interface GeofenceZone {
  id: string;
  name: string;
  description?: string;
  type: ZoneType;
  status: ZoneStatus;
  priority: number;
  shape: GeofenceShape;
  boundingBox: BoundingBox;
  triggers: ZoneTrigger[];
  alertConfig: AlertConfig;
  schedule?: ZoneSchedule;
  capacity?: ZoneCapacity;
  metadata: ZoneMetadata;
  permissions: ZonePermission[];
  parentZoneId?: string;
  childZoneIds: string[];
  relatedAlertId?: string;
  relatedIncidentId?: string;
  tags: string[];
  createdBy: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Geofence shape
interface GeofenceShape {
  type: ShapeType;
  center?: Coordinate;
  radius?: number; // in meters, for circle
  coordinates?: Coordinate[]; // for polygon/rectangle
  innerRadius?: number; // for ring/donut shape
}

// Bounding box
interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Zone trigger
interface ZoneTrigger {
  id: string;
  type: TriggerType;
  dwellTime?: number; // seconds, for dwell trigger
  proximityDistance?: number; // meters, for proximity trigger
  direction?: 'in' | 'out' | 'both'; // for crossing trigger
  cooldown?: number; // seconds between triggers
  conditions?: TriggerCondition[];
  actions: TriggerAction[];
  enabled: boolean;
}

// Trigger condition
interface TriggerCondition {
  field: 'time' | 'day' | 'speed' | 'altitude' | 'accuracy' | 'user_role' | 'custom';
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: unknown;
}

// Trigger action
interface TriggerAction {
  type: 'notification' | 'webhook' | 'alert' | 'sms' | 'email' | 'call' | 'log' | 'api_call';
  config: Record<string, unknown>;
  delay?: number; // seconds
}

// Alert config
interface AlertConfig {
  sendPush: boolean;
  sendSms: boolean;
  sendEmail: boolean;
  sendVoice: boolean;
  alertTemplate?: string;
  customMessage?: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  repeatInterval?: number; // minutes
  maxRepeats?: number;
}

// Zone schedule
interface ZoneSchedule {
  type: 'always' | 'scheduled' | 'recurring';
  startTime?: Date;
  endTime?: Date;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[];
    timeRanges?: { start: string; end: string }[];
  };
  timezone: string;
}

// Zone capacity
interface ZoneCapacity {
  maxOccupancy: number;
  currentOccupancy: number;
  alertThreshold: number; // percentage
  overcrowdingAlert: boolean;
}

// Zone metadata
interface ZoneMetadata {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  landmark?: string;
  contactPerson?: string;
  contactPhone?: string;
  facilities?: string[];
  accessibility?: string[];
  operatingHours?: string;
  custom: Record<string, unknown>;
}

// Zone permission
interface ZonePermission {
  principalId: string;
  principalType: 'user' | 'role' | 'group';
  permissions: ('view' | 'edit' | 'delete' | 'manage_triggers' | 'view_events')[];
}

// Device location
interface DeviceLocation {
  deviceId: string;
  userId?: string;
  coordinate: Coordinate;
  altitude?: number;
  accuracy: number; // in meters
  speed?: number; // in m/s
  heading?: number; // in degrees
  battery?: number; // percentage
  timestamp: Date;
  source: 'gps' | 'network' | 'wifi' | 'manual' | 'ip';
  isMoving: boolean;
  currentZones: string[];
  metadata?: Record<string, unknown>;
}

// Geofence event
interface GeofenceEvent {
  id: string;
  type: TriggerType;
  zoneId: string;
  zoneName: string;
  zoneType: ZoneType;
  deviceId: string;
  userId?: string;
  triggerId: string;
  coordinate: Coordinate;
  accuracy: number;
  speed?: number;
  dwellDuration?: number;
  previousZoneId?: string;
  timestamp: Date;
  processed: boolean;
  actionsExecuted: { action: TriggerAction; status: 'success' | 'failed'; error?: string }[];
  metadata?: Record<string, unknown>;
}

// Location history
interface LocationHistory {
  deviceId: string;
  userId?: string;
  locations: {
    coordinate: Coordinate;
    timestamp: Date;
    accuracy: number;
    zoneIds: string[];
  }[];
  startDate: Date;
  endDate: Date;
  totalDistance: number; // meters
  totalTime: number; // seconds
}

// Proximity alert
interface ProximityAlert {
  id: string;
  name: string;
  description?: string;
  sourceType: 'device' | 'zone' | 'poi';
  sourceId: string;
  targetType: 'device' | 'zone' | 'poi';
  targetIds: string[];
  distance: number; // meters
  triggerOn: 'entering' | 'leaving' | 'both';
  alertConfig: AlertConfig;
  enabled: boolean;
  lastTriggered?: Date;
  triggerCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Point of interest
interface PointOfInterest {
  id: string;
  name: string;
  description?: string;
  category: 'hospital' | 'shelter' | 'fire_station' | 'police_station' | 'distribution_center' | 'evacuation_point' | 'landmark' | 'hazard' | 'other';
  coordinate: Coordinate;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  operatingHours?: string;
  capacity?: number;
  currentOccupancy?: number;
  services?: string[];
  accessibility?: string[];
  status: 'operational' | 'limited' | 'closed' | 'unknown';
  verifiedAt?: Date;
  verifiedBy?: string;
  photos?: string[];
  rating?: number;
  reviews?: number;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// Route
interface Route {
  id: string;
  name: string;
  description?: string;
  type: 'evacuation' | 'supply' | 'patrol' | 'custom';
  waypoints: Coordinate[];
  distance: number; // meters
  estimatedDuration: number; // seconds
  status: 'active' | 'blocked' | 'congested' | 'unknown';
  blockageInfo?: {
    location: Coordinate;
    reason: string;
    reportedAt: Date;
    reportedBy: string;
  };
  alternativeRouteId?: string;
  zones: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Heatmap data
interface HeatmapData {
  timestamp: Date;
  resolution: 'high' | 'medium' | 'low';
  bounds: BoundingBox;
  points: {
    coordinate: Coordinate;
    weight: number;
    metadata?: Record<string, unknown>;
  }[];
}

// Zone analytics
interface ZoneAnalytics {
  zoneId: string;
  period: { start: Date; end: Date };
  totalEvents: number;
  uniqueDevices: number;
  avgDwellTime: number;
  peakOccupancy: number;
  avgOccupancy: number;
  entryExitRatio: number;
  byEventType: { type: TriggerType; count: number }[];
  byHour: { hour: number; entries: number; exits: number }[];
  byDay: { date: string; entries: number; exits: number; avgOccupancy: number }[];
  hotspots: { coordinate: Coordinate; eventCount: number }[];
}

// Geofencing settings
interface GeofencingSettings {
  defaultRadius: number;
  minAccuracy: number;
  updateInterval: number;
  batchSize: number;
  maxZonesPerDevice: number;
  maxActiveZones: number;
  eventRetention: number; // days
  locationHistoryRetention: number; // days
  enableBackgroundTracking: boolean;
  enableBatteryOptimization: boolean;
}

class GeofencingService {
  private static instance: GeofencingService;
  private zones: Map<string, GeofenceZone> = new Map();
  private deviceLocations: Map<string, DeviceLocation> = new Map();
  private events: GeofenceEvent[] = [];
  private proximityAlerts: Map<string, ProximityAlert> = new Map();
  private pois: Map<string, PointOfInterest> = new Map();
  private routes: Map<string, Route> = new Map();
  private locationHistories: Map<string, LocationHistory> = new Map();
  private settings: GeofencingSettings;
  private listeners: ((event: string, data: unknown) => void)[] = [];

  private constructor() {
    this.settings = {
      defaultRadius: 500,
      minAccuracy: 100,
      updateInterval: 30,
      batchSize: 100,
      maxZonesPerDevice: 50,
      maxActiveZones: 1000,
      eventRetention: 90,
      locationHistoryRetention: 30,
      enableBackgroundTracking: true,
      enableBatteryOptimization: true,
    };
    this.initializeSampleData();
  }

  public static getInstance(): GeofencingService {
    if (!GeofencingService.instance) {
      GeofencingService.instance = new GeofencingService();
    }
    return GeofencingService.instance;
  }

  /**
   * Initialize sample data
   */
  private initializeSampleData(): void {
    // Sample zones in India (Mumbai area)
    const sampleZones: Omit<GeofenceZone, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Mumbai Coastal Flood Zone',
        description: 'High-risk coastal flooding area during monsoon',
        type: 'danger',
        status: 'active',
        priority: 1,
        shape: {
          type: 'polygon',
          coordinates: [
            { latitude: 19.0760, longitude: 72.8777 },
            { latitude: 19.0860, longitude: 72.8877 },
            { latitude: 19.0860, longitude: 72.8677 },
            { latitude: 19.0760, longitude: 72.8677 },
          ],
        },
        boundingBox: { north: 19.0860, south: 19.0760, east: 72.8877, west: 72.8677 },
        triggers: [
          {
            id: 'trig-1',
            type: 'enter',
            actions: [{ type: 'notification', config: { title: 'Entering Flood Zone', body: 'You are entering a high-risk flood area' } }],
            enabled: true,
          },
        ],
        alertConfig: {
          sendPush: true,
          sendSms: true,
          sendEmail: false,
          sendVoice: false,
          urgencyLevel: 'high',
        },
        metadata: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          custom: {},
        },
        permissions: [],
        childZoneIds: [],
        tags: ['flood', 'monsoon', 'coastal'],
        createdBy: 'admin-1',
      },
      {
        name: 'BKC Evacuation Assembly Point',
        description: 'Primary evacuation assembly point for BKC area',
        type: 'evacuation',
        status: 'active',
        priority: 2,
        shape: {
          type: 'circle',
          center: { latitude: 19.0596, longitude: 72.8656 },
          radius: 200,
        },
        boundingBox: { north: 19.0616, south: 19.0576, east: 72.8676, west: 72.8636 },
        triggers: [
          {
            id: 'trig-2',
            type: 'enter',
            actions: [{ type: 'notification', config: { title: 'Evacuation Point', body: 'You have reached the evacuation assembly point' } }],
            enabled: true,
          },
        ],
        alertConfig: {
          sendPush: true,
          sendSms: false,
          sendEmail: false,
          sendVoice: false,
          urgencyLevel: 'medium',
        },
        capacity: { maxOccupancy: 5000, currentOccupancy: 0, alertThreshold: 80, overcrowdingAlert: true },
        metadata: {
          address: 'MMRDA Ground, BKC',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          facilities: ['water', 'first_aid', 'toilets', 'shade'],
          custom: {},
        },
        permissions: [],
        childZoneIds: [],
        tags: ['evacuation', 'assembly', 'safe'],
        createdBy: 'admin-1',
      },
      {
        name: 'Lilavati Hospital Safe Zone',
        description: 'Hospital area with emergency services',
        type: 'hospital',
        status: 'active',
        priority: 2,
        shape: {
          type: 'circle',
          center: { latitude: 19.0509, longitude: 72.8294 },
          radius: 300,
        },
        boundingBox: { north: 19.0539, south: 19.0479, east: 72.8324, west: 72.8264 },
        triggers: [],
        alertConfig: {
          sendPush: true,
          sendSms: false,
          sendEmail: false,
          sendVoice: false,
          urgencyLevel: 'low',
        },
        metadata: {
          address: 'A-791, Bandra Reclamation',
          city: 'Mumbai',
          state: 'Maharashtra',
          contactPhone: '+91-22-26751000',
          facilities: ['emergency', 'trauma', 'icu', 'pharmacy'],
          custom: {},
        },
        permissions: [],
        childZoneIds: [],
        tags: ['hospital', 'emergency', 'medical'],
        createdBy: 'admin-1',
      },
      {
        name: 'Relief Distribution Center - Dharavi',
        description: 'Relief material distribution point',
        type: 'distribution',
        status: 'active',
        priority: 3,
        shape: {
          type: 'circle',
          center: { latitude: 19.0430, longitude: 72.8550 },
          radius: 150,
        },
        boundingBox: { north: 19.0445, south: 19.0415, east: 72.8565, west: 72.8535 },
        triggers: [
          {
            id: 'trig-3',
            type: 'dwell',
            dwellTime: 300,
            actions: [{ type: 'log', config: { category: 'distribution_visit' } }],
            enabled: true,
          },
        ],
        alertConfig: {
          sendPush: false,
          sendSms: false,
          sendEmail: false,
          sendVoice: false,
          urgencyLevel: 'low',
        },
        schedule: {
          type: 'scheduled',
          startTime: new Date(),
          endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          timezone: 'Asia/Kolkata',
        },
        metadata: {
          address: 'Community Hall, Dharavi',
          city: 'Mumbai',
          state: 'Maharashtra',
          operatingHours: '08:00 - 18:00',
          custom: {},
        },
        permissions: [],
        childZoneIds: [],
        tags: ['distribution', 'relief', 'supplies'],
        createdBy: 'admin-1',
      },
      {
        name: 'Powai Lake Monitoring Zone',
        description: 'Lake water level monitoring area',
        type: 'monitoring',
        status: 'active',
        priority: 3,
        shape: {
          type: 'polygon',
          coordinates: [
            { latitude: 19.1280, longitude: 72.9050 },
            { latitude: 19.1280, longitude: 72.9150 },
            { latitude: 19.1180, longitude: 72.9150 },
            { latitude: 19.1180, longitude: 72.9050 },
          ],
        },
        boundingBox: { north: 19.1280, south: 19.1180, east: 72.9150, west: 72.9050 },
        triggers: [],
        alertConfig: {
          sendPush: false,
          sendSms: false,
          sendEmail: true,
          sendVoice: false,
          urgencyLevel: 'medium',
        },
        metadata: {
          city: 'Mumbai',
          state: 'Maharashtra',
          custom: { waterLevel: 'normal', lastInspection: new Date().toISOString() },
        },
        permissions: [],
        childZoneIds: [],
        tags: ['monitoring', 'water', 'lake'],
        createdBy: 'admin-1',
      },
    ];

    sampleZones.forEach((zone, index) => {
      const id = `zone-${(index + 1).toString().padStart(6, '0')}`;
      this.zones.set(id, {
        ...zone,
        id,
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      });
    });

    // Create sample POIs
    const samplePOIs: Omit<PointOfInterest, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'KEM Hospital',
        description: 'Government hospital with emergency services',
        category: 'hospital',
        coordinate: { latitude: 19.0002, longitude: 72.8412 },
        address: 'Acharya Donde Marg, Parel',
        phone: '+91-22-24136051',
        status: 'operational',
        services: ['emergency', 'trauma', 'surgery', 'icu'],
        accessibility: ['wheelchair', 'elevator'],
        capacity: 2000,
        metadata: {},
      },
      {
        name: 'Juhu Beach Evacuation Point',
        description: 'Beach evacuation assembly area',
        category: 'evacuation_point',
        coordinate: { latitude: 19.0883, longitude: 72.8266 },
        address: 'Juhu Beach, Juhu',
        status: 'operational',
        services: ['first_aid', 'water', 'shelter'],
        capacity: 10000,
        metadata: {},
      },
      {
        name: 'Colaba Fire Station',
        description: 'Mumbai Fire Brigade station',
        category: 'fire_station',
        coordinate: { latitude: 18.9217, longitude: 72.8318 },
        address: 'Colaba Causeway',
        phone: '101',
        status: 'operational',
        services: ['fire_rescue', 'flood_rescue', 'emergency'],
        metadata: {},
      },
    ];

    samplePOIs.forEach((poi, index) => {
      const id = `poi-${(index + 1).toString().padStart(6, '0')}`;
      this.pois.set(id, {
        ...poi,
        id,
        createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      });
    });

    // Create sample device locations
    for (let i = 1; i <= 50; i++) {
      const location: DeviceLocation = {
        deviceId: `device-${i.toString().padStart(6, '0')}`,
        userId: `user-${i}`,
        coordinate: {
          latitude: 19.0 + Math.random() * 0.2,
          longitude: 72.8 + Math.random() * 0.2,
        },
        accuracy: Math.floor(Math.random() * 50) + 5,
        speed: Math.random() * 10,
        heading: Math.floor(Math.random() * 360),
        battery: Math.floor(Math.random() * 100),
        timestamp: new Date(Date.now() - Math.random() * 60 * 60 * 1000),
        source: 'gps',
        isMoving: Math.random() > 0.5,
        currentZones: [],
      };

      // Determine which zones the device is in
      this.zones.forEach((zone, zoneId) => {
        if (this.isPointInZone(location.coordinate, zone)) {
          location.currentZones.push(zoneId);
        }
      });

      this.deviceLocations.set(location.deviceId, location);
    }

    // Create sample events
    const eventTypes: TriggerType[] = ['enter', 'exit', 'dwell'];
    for (let i = 0; i < 500; i++) {
      const zoneKeys = Array.from(this.zones.keys());
      const zoneId = zoneKeys[i % zoneKeys.length];
      const zone = this.zones.get(zoneId)!;

      const event: GeofenceEvent = {
        id: `evt-${i.toString().padStart(8, '0')}`,
        type: eventTypes[i % eventTypes.length],
        zoneId,
        zoneName: zone.name,
        zoneType: zone.type,
        deviceId: `device-${((i % 50) + 1).toString().padStart(6, '0')}`,
        userId: `user-${(i % 50) + 1}`,
        triggerId: zone.triggers[0]?.id || 'auto',
        coordinate: {
          latitude: (zone.shape.center?.latitude || zone.boundingBox.north) + (Math.random() - 0.5) * 0.01,
          longitude: (zone.shape.center?.longitude || zone.boundingBox.east) + (Math.random() - 0.5) * 0.01,
        },
        accuracy: Math.floor(Math.random() * 30) + 5,
        speed: Math.random() * 5,
        dwellDuration: eventTypes[i % eventTypes.length] === 'dwell' ? Math.floor(Math.random() * 600) + 60 : undefined,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        processed: true,
        actionsExecuted: [],
      };

      this.events.push(event);
    }

    // Create sample proximity alerts
    for (let i = 0; i < 10; i++) {
      const alert: ProximityAlert = {
        id: `prox-${i.toString().padStart(6, '0')}`,
        name: `Proximity Alert ${i + 1}`,
        description: `Alert when devices come within range`,
        sourceType: 'zone',
        sourceId: `zone-${((i % 5) + 1).toString().padStart(6, '0')}`,
        targetType: 'device',
        targetIds: [`device-${((i * 5) % 50 + 1).toString().padStart(6, '0')}`],
        distance: (i + 1) * 100,
        triggerOn: 'entering',
        alertConfig: {
          sendPush: true,
          sendSms: false,
          sendEmail: false,
          sendVoice: false,
          urgencyLevel: 'medium',
        },
        enabled: true,
        triggerCount: Math.floor(Math.random() * 20),
        createdBy: `admin-1`,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      };

      this.proximityAlerts.set(alert.id, alert);
    }

    // Create sample routes
    const sampleRoutes: Omit<Route, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'BKC to Juhu Evacuation Route',
        description: 'Primary evacuation route from BKC to Juhu',
        type: 'evacuation',
        waypoints: [
          { latitude: 19.0596, longitude: 72.8656 },
          { latitude: 19.0700, longitude: 72.8500 },
          { latitude: 19.0883, longitude: 72.8266 },
        ],
        distance: 8500,
        estimatedDuration: 1800,
        status: 'active',
        zones: ['zone-000002'],
      },
      {
        name: 'Dharavi Relief Supply Route',
        description: 'Supply delivery route to Dharavi distribution center',
        type: 'supply',
        waypoints: [
          { latitude: 19.0176, longitude: 72.8562 },
          { latitude: 19.0300, longitude: 72.8550 },
          { latitude: 19.0430, longitude: 72.8550 },
        ],
        distance: 3200,
        estimatedDuration: 900,
        status: 'active',
        zones: ['zone-000004'],
      },
    ];

    sampleRoutes.forEach((route, index) => {
      const id = `route-${(index + 1).toString().padStart(6, '0')}`;
      this.routes.set(id, {
        ...route,
        id,
        createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      });
    });
  }

  /**
   * Check if point is in zone
   */
  private isPointInZone(point: Coordinate, zone: GeofenceZone): boolean {
    if (zone.shape.type === 'circle' && zone.shape.center && zone.shape.radius) {
      const distance = this.calculateDistance(point, zone.shape.center);
      return distance <= zone.shape.radius;
    }

    if ((zone.shape.type === 'polygon' || zone.shape.type === 'rectangle') && zone.shape.coordinates) {
      return this.isPointInPolygon(point, zone.shape.coordinates);
    }

    return false;
  }

  /**
   * Calculate distance between two points (Haversine formula)
   */
  private calculateDistance(point1: Coordinate, point2: Coordinate): number {
    const R = 6371000; // Earth's radius in meters
    const dLat = this.toRadians(point2.latitude - point1.latitude);
    const dLon = this.toRadians(point2.longitude - point1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.latitude)) *
        Math.cos(this.toRadians(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Check if point is in polygon (Ray casting algorithm)
   */
  private isPointInPolygon(point: Coordinate, polygon: Coordinate[]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].longitude;
      const yi = polygon[i].latitude;
      const xj = polygon[j].longitude;
      const yj = polygon[j].latitude;

      const intersect =
        yi > point.latitude !== yj > point.latitude &&
        point.longitude < ((xj - xi) * (point.latitude - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   * Create zone
   */
  public createZone(data: Omit<GeofenceZone, 'id' | 'boundingBox' | 'childZoneIds' | 'createdAt' | 'updatedAt'>): GeofenceZone {
    const id = `zone-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;

    const boundingBox = this.calculateBoundingBox(data.shape);

    const zone: GeofenceZone = {
      ...data,
      id,
      boundingBox,
      childZoneIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.zones.set(id, zone);
    this.emit('zone_created', zone);

    return zone;
  }

  /**
   * Calculate bounding box
   */
  private calculateBoundingBox(shape: GeofenceShape): BoundingBox {
    if (shape.type === 'circle' && shape.center && shape.radius) {
      const latDelta = (shape.radius / 111320);
      const lonDelta = shape.radius / (111320 * Math.cos(this.toRadians(shape.center.latitude)));
      return {
        north: shape.center.latitude + latDelta,
        south: shape.center.latitude - latDelta,
        east: shape.center.longitude + lonDelta,
        west: shape.center.longitude - lonDelta,
      };
    }

    if (shape.coordinates && shape.coordinates.length > 0) {
      const lats = shape.coordinates.map((c) => c.latitude);
      const lons = shape.coordinates.map((c) => c.longitude);
      return {
        north: Math.max(...lats),
        south: Math.min(...lats),
        east: Math.max(...lons),
        west: Math.min(...lons),
      };
    }

    return { north: 0, south: 0, east: 0, west: 0 };
  }

  /**
   * Update zone
   */
  public updateZone(zoneId: string, updates: Partial<Omit<GeofenceZone, 'id' | 'createdAt' | 'updatedAt'>>): GeofenceZone | null {
    const zone = this.zones.get(zoneId);
    if (!zone) return null;

    Object.assign(zone, updates);

    if (updates.shape) {
      zone.boundingBox = this.calculateBoundingBox(updates.shape);
    }

    zone.updatedAt = new Date();

    this.emit('zone_updated', zone);
    return zone;
  }

  /**
   * Delete zone
   */
  public deleteZone(zoneId: string): boolean {
    const zone = this.zones.get(zoneId);
    if (!zone) return false;

    this.zones.delete(zoneId);
    this.emit('zone_deleted', { zoneId });

    return true;
  }

  /**
   * Get zone
   */
  public getZone(zoneId: string): GeofenceZone | undefined {
    return this.zones.get(zoneId);
  }

  /**
   * Get zones
   */
  public getZones(filters?: {
    type?: ZoneType;
    status?: ZoneStatus;
    bounds?: BoundingBox;
    tags?: string[];
  }): GeofenceZone[] {
    let zones = Array.from(this.zones.values());

    if (filters?.type) {
      zones = zones.filter((z) => z.type === filters.type);
    }

    if (filters?.status) {
      zones = zones.filter((z) => z.status === filters.status);
    }

    if (filters?.bounds) {
      zones = zones.filter((z) => this.boundingBoxesOverlap(z.boundingBox, filters.bounds!));
    }

    if (filters?.tags?.length) {
      zones = zones.filter((z) => filters.tags!.some((tag) => z.tags.includes(tag)));
    }

    return zones.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Check if bounding boxes overlap
   */
  private boundingBoxesOverlap(box1: BoundingBox, box2: BoundingBox): boolean {
    return !(
      box1.east < box2.west ||
      box1.west > box2.east ||
      box1.north < box2.south ||
      box1.south > box2.north
    );
  }

  /**
   * Update device location
   */
  public updateDeviceLocation(data: {
    deviceId: string;
    userId?: string;
    coordinate: Coordinate;
    accuracy: number;
    altitude?: number;
    speed?: number;
    heading?: number;
    battery?: number;
    source?: DeviceLocation['source'];
  }): { location: DeviceLocation; events: GeofenceEvent[] } {
    const previousLocation = this.deviceLocations.get(data.deviceId);
    const previousZones = previousLocation?.currentZones || [];

    const currentZones: string[] = [];
    const events: GeofenceEvent[] = [];

    // Check which zones the device is now in
    this.zones.forEach((zone, zoneId) => {
      if (zone.status !== 'active') return;

      const isInZone = this.isPointInZone(data.coordinate, zone);

      if (isInZone) {
        currentZones.push(zoneId);

        // Check for enter event
        if (!previousZones.includes(zoneId)) {
          const enterTriggers = zone.triggers.filter((t) => t.type === 'enter' && t.enabled);
          enterTriggers.forEach((trigger) => {
            const event = this.createEvent('enter', zone, zoneId, data, trigger);
            events.push(event);
          });
        }
      } else if (previousZones.includes(zoneId)) {
        // Check for exit event
        const exitTriggers = zone.triggers.filter((t) => t.type === 'exit' && t.enabled);
        exitTriggers.forEach((trigger) => {
          const event = this.createEvent('exit', zone, zoneId, data, trigger);
          events.push(event);
        });
      }
    });

    const location: DeviceLocation = {
      deviceId: data.deviceId,
      userId: data.userId,
      coordinate: data.coordinate,
      altitude: data.altitude,
      accuracy: data.accuracy,
      speed: data.speed,
      heading: data.heading,
      battery: data.battery,
      timestamp: new Date(),
      source: data.source || 'gps',
      isMoving: (data.speed || 0) > 0.5,
      currentZones,
    };

    this.deviceLocations.set(data.deviceId, location);

    // Process events
    events.forEach((event) => {
      this.events.push(event);
      this.emit('geofence_event', event);
    });

    return { location, events };
  }

  /**
   * Create event
   */
  private createEvent(
    type: TriggerType,
    zone: GeofenceZone,
    zoneId: string,
    locationData: { deviceId: string; userId?: string; coordinate: Coordinate; accuracy: number; speed?: number },
    trigger: ZoneTrigger
  ): GeofenceEvent {
    return {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`,
      type,
      zoneId,
      zoneName: zone.name,
      zoneType: zone.type,
      deviceId: locationData.deviceId,
      userId: locationData.userId,
      triggerId: trigger.id,
      coordinate: locationData.coordinate,
      accuracy: locationData.accuracy,
      speed: locationData.speed,
      timestamp: new Date(),
      processed: false,
      actionsExecuted: [],
    };
  }

  /**
   * Get device location
   */
  public getDeviceLocation(deviceId: string): DeviceLocation | undefined {
    return this.deviceLocations.get(deviceId);
  }

  /**
   * Get devices in zone
   */
  public getDevicesInZone(zoneId: string): DeviceLocation[] {
    return Array.from(this.deviceLocations.values())
      .filter((loc) => loc.currentZones.includes(zoneId));
  }

  /**
   * Get events
   */
  public getEvents(filters?: {
    zoneId?: string;
    deviceId?: string;
    type?: TriggerType;
    dateRange?: { start: Date; end: Date };
  }, page: number = 1, pageSize: number = 50): { events: GeofenceEvent[]; total: number } {
    let events = [...this.events];

    if (filters?.zoneId) {
      events = events.filter((e) => e.zoneId === filters.zoneId);
    }

    if (filters?.deviceId) {
      events = events.filter((e) => e.deviceId === filters.deviceId);
    }

    if (filters?.type) {
      events = events.filter((e) => e.type === filters.type);
    }

    if (filters?.dateRange) {
      events = events.filter((e) =>
        e.timestamp >= filters.dateRange!.start && e.timestamp <= filters.dateRange!.end
      );
    }

    events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const total = events.length;
    const startIndex = (page - 1) * pageSize;

    return {
      events: events.slice(startIndex, startIndex + pageSize),
      total,
    };
  }

  /**
   * Get zone analytics
   */
  public getZoneAnalytics(zoneId: string, period: { start: Date; end: Date }): ZoneAnalytics {
    const zoneEvents = this.events.filter(
      (e) => e.zoneId === zoneId && e.timestamp >= period.start && e.timestamp <= period.end
    );

    const uniqueDevices = new Set(zoneEvents.map((e) => e.deviceId)).size;
    const dwellEvents = zoneEvents.filter((e) => e.type === 'dwell' && e.dwellDuration);
    const avgDwellTime = dwellEvents.length > 0
      ? dwellEvents.reduce((sum, e) => sum + (e.dwellDuration || 0), 0) / dwellEvents.length
      : 0;

    const byEventType = new Map<TriggerType, number>();
    const byHour = new Map<number, { entries: number; exits: number }>();
    const byDay = new Map<string, { entries: number; exits: number; avgOccupancy: number }>();

    zoneEvents.forEach((event) => {
      byEventType.set(event.type, (byEventType.get(event.type) || 0) + 1);

      const hour = event.timestamp.getHours();
      const hourStats = byHour.get(hour) || { entries: 0, exits: 0 };
      if (event.type === 'enter') hourStats.entries++;
      if (event.type === 'exit') hourStats.exits++;
      byHour.set(hour, hourStats);

      const day = event.timestamp.toISOString().split('T')[0];
      const dayStats = byDay.get(day) || { entries: 0, exits: 0, avgOccupancy: 0 };
      if (event.type === 'enter') dayStats.entries++;
      if (event.type === 'exit') dayStats.exits++;
      byDay.set(day, dayStats);
    });

    const entries = zoneEvents.filter((e) => e.type === 'enter').length;
    const exits = zoneEvents.filter((e) => e.type === 'exit').length;

    return {
      zoneId,
      period,
      totalEvents: zoneEvents.length,
      uniqueDevices,
      avgDwellTime,
      peakOccupancy: Math.max(...Array.from(byHour.values()).map((h) => h.entries - h.exits)),
      avgOccupancy: uniqueDevices / Math.max(1, (period.end.getTime() - period.start.getTime()) / (24 * 60 * 60 * 1000)),
      entryExitRatio: exits > 0 ? entries / exits : entries,
      byEventType: Array.from(byEventType.entries()).map(([type, count]) => ({ type, count })),
      byHour: Array.from(byHour.entries()).map(([hour, stats]) => ({ hour, ...stats })),
      byDay: Array.from(byDay.entries()).map(([date, stats]) => ({ date, ...stats })),
      hotspots: [],
    };
  }

  /**
   * Get POIs
   */
  public getPOIs(filters?: {
    category?: PointOfInterest['category'];
    bounds?: BoundingBox;
    status?: PointOfInterest['status'];
  }): PointOfInterest[] {
    let pois = Array.from(this.pois.values());

    if (filters?.category) {
      pois = pois.filter((p) => p.category === filters.category);
    }

    if (filters?.status) {
      pois = pois.filter((p) => p.status === filters.status);
    }

    if (filters?.bounds) {
      pois = pois.filter((p) =>
        p.coordinate.latitude >= filters.bounds!.south &&
        p.coordinate.latitude <= filters.bounds!.north &&
        p.coordinate.longitude >= filters.bounds!.west &&
        p.coordinate.longitude <= filters.bounds!.east
      );
    }

    return pois;
  }

  /**
   * Find nearest POIs
   */
  public findNearestPOIs(coordinate: Coordinate, category?: PointOfInterest['category'], limit: number = 5): { poi: PointOfInterest; distance: number }[] {
    let pois = Array.from(this.pois.values());

    if (category) {
      pois = pois.filter((p) => p.category === category);
    }

    return pois
      .map((poi) => ({
        poi,
        distance: this.calculateDistance(coordinate, poi.coordinate),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  }

  /**
   * Get routes
   */
  public getRoutes(type?: Route['type']): Route[] {
    let routes = Array.from(this.routes.values());
    if (type) {
      routes = routes.filter((r) => r.type === type);
    }
    return routes;
  }

  /**
   * Generate heatmap data
   */
  public generateHeatmap(bounds: BoundingBox, resolution: 'high' | 'medium' | 'low'): HeatmapData {
    const points: HeatmapData['points'] = [];

    this.events.forEach((event) => {
      if (
        event.coordinate.latitude >= bounds.south &&
        event.coordinate.latitude <= bounds.north &&
        event.coordinate.longitude >= bounds.west &&
        event.coordinate.longitude <= bounds.east
      ) {
        points.push({
          coordinate: event.coordinate,
          weight: event.type === 'dwell' ? 2 : 1,
        });
      }
    });

    return {
      timestamp: new Date(),
      resolution,
      bounds,
      points,
    };
  }

  /**
   * Get settings
   */
  public getSettings(): GeofencingSettings {
    return { ...this.settings };
  }

  /**
   * Update settings
   */
  public updateSettings(updates: Partial<GeofencingSettings>): void {
    Object.assign(this.settings, updates);
    this.emit('settings_updated', this.settings);
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

export const geofencingService = GeofencingService.getInstance();
export type {
  ZoneType,
  ZoneStatus,
  TriggerType,
  ShapeType,
  Coordinate,
  GeofenceZone,
  GeofenceShape,
  BoundingBox,
  ZoneTrigger,
  TriggerCondition,
  TriggerAction,
  AlertConfig,
  ZoneSchedule,
  ZoneCapacity,
  ZoneMetadata,
  ZonePermission,
  DeviceLocation,
  GeofenceEvent,
  LocationHistory,
  ProximityAlert,
  PointOfInterest,
  Route,
  HeatmapData,
  ZoneAnalytics,
  GeofencingSettings,
};
