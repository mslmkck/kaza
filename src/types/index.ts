// User and Profile Types
export type UserRole = "visitor" | "user" | "expert" | "lawyer" | "admin";
export type UserStatus = "active" | "inactive" | "pending" | "suspended";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  identity_number_encrypted: string | null;
  role: UserRole;
  avatar_url: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

// Accident Case Types
export type AccidentType =
  | "material_only"
  | "with_injury"
  | "with_death"
  | "hit_and_run"
  | "public_property"
  | "multiple_vehicles";

export type AccidentStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "expert_assigned"
  | "completed"
  | "closed"
  | "cancelled";

export interface AccidentCase {
  id: string;
  user_id: string;
  case_number: string;
  accident_date: string;
  accident_location: string;
  accident_type: AccidentType;
  injury_status: "none" | "minor" | "serious" | "fatal";
  vehicle_count: number;
  event_description: string;
  status: AccidentStatus;
  assigned_expert_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  case_id: string;
  plate_number: string;
  vehicle_type: "car" | "motorcycle" | "truck" | "bus" | "bicycle" | "other";
  driver_name: string | null;
  insurance_status: "valid" | "expired" | "none" | "unknown";
  damage_areas: string[];
  movement_description: string | null;
  created_at: string;
}

// Traffic Fine Types
export type FineStatus =
  | "draft"
  | "analyzed"
  | "objection_preparing"
  | "objection_submitted"
  | "under_review"
  | "accepted"
  | "rejected"
  | "cancelled";

export interface TrafficFine {
  id: string;
  user_id: string;
  fine_number: string;
  fine_date: string;
  notification_date: string;
  plate_number: string;
  article_number: string;
  fine_amount: number;
  fine_description: string;
  objection_reason: string | null;
  status: FineStatus;
  created_at: string;
  updated_at: string;
}

// Document Types
export type DocumentType =
  | "fine_decision"
  | "notification"
  | "identity"
  | "registration"
  | "license"
  | "sale_contract"
  | "accident_report"
  | "photos"
  | "camera_record"
  | "witness_info"
  | "insurance"
  | "expertise_report"
  | "medical_report"
  | "service_invoice"
  | "official_correspondence"
  | "other";

export type DocumentReviewStatus =
  | "uploaded"
  | "pending_review"
  | "under_review"
  | "approved"
  | "rejected"
  | "expired"
  | "needs_update";

export interface Document {
  id: string;
  user_id: string;
  case_id: string | null;
  fine_id: string | null;
  document_type: DocumentType;
  file_url: string;
  file_name: string;
  review_status: DocumentReviewStatus;
  uploaded_at: string;
  reviewed_at: string | null;
  reviewer_id: string | null;
  notes: string | null;
}

// Petition Types
export type PetitionType = "fine_objection" | "accident_objection" | "expertise_objection" | "other";

export interface Petition {
  id: string;
  user_id: string;
  fine_id: string | null;
  case_id: string | null;
  petition_type: PetitionType;
  content: string;
  version: number;
  pdf_url: string | null;
  docx_url: string | null;
  created_at: string;
  updated_at: string;
}

// Question/Answer Types
export type QuestionCategory =
  | "traffic_accident"
  | "material_damage"
  | "injury_accident"
  | "accident_report"
  | "fault_ratio"
  | "insurance"
  | "vehicle_depreciation"
  | "traffic_fine"
  | "radar_fine"
  | "parking_fine"
  | "license_suspension"
  | "fine_points"
  | "fine_objection"
  | "documents_petitions";

export type QuestionPrivacy = "public" | "private";
export type QuestionStatus = "new" | "under_review" | "awaiting_info" | "answered" | "closed";

export interface Question {
  id: string;
  user_id: string;
  category: QuestionCategory;
  title: string;
  description: string;
  privacy_type: QuestionPrivacy;
  status: QuestionStatus;
  assigned_expert_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Answer {
  id: string;
  question_id: string;
  expert_id: string;
  answer_text: string;
  created_at: string;
}

// Expert Notes
export type NoteVisibility = "user" | "expert_only" | "admin";

export interface ExpertNote {
  id: string;
  case_id: string | null;
  fine_id: string | null;
  expert_id: string;
  note: string;
  visibility: NoteVisibility;
  created_at: string;
}

// Notifications
export type NotificationType =
  | "missing_document"
  | "expert_answered"
  | "case_under_review"
  | "info_requested"
  | "petition_ready"
  | "deadline_approaching"
  | "document_reviewed"
  | "case_completed"
  | "payment_required"
  | "system";

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read_at: string | null;
  created_at: string;
  related_entity_type: string | null;
  related_entity_id: string | null;
}

// Legal Content
export interface LegalContent {
  id: string;
  category: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  status: "draft" | "published" | "archived";
  version: number;
  updated_at: string;
}

// Audit Logs
export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

// Dashboard Stats
export interface DashboardStats {
  total_users: number;
  daily_new_users: number;
  open_cases: number;
  completed_cases: number;
  most_asked_topic: string;
  most_objected_fine_type: string;
  avg_expert_response_time: number;
  user_satisfaction_rate: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Form Types
export interface AccidentWizardStep1 {
  has_injury: boolean;
  is_material_only: boolean;
  multiple_vehicles: boolean;
  public_property_damage: boolean;
  missing_insurance_or_license: boolean;
  alcohol_suspected: boolean;
  dispute_between_parties: boolean;
  public_vehicle_involved: boolean;
  foreign_plate: boolean;
  hit_and_run: boolean;
}

export interface AccidentWizardStep2 {
  accident_date: string;
  accident_time: string;
  location: string;
  weather: string;
  road_condition: string;
  intersection_type: string;
  has_traffic_light: boolean;
  lane_count: number;
  vehicle_count: number;
  user_maneuver: string;
  other_maneuver: string;
  collision_point: string;
  damage_areas: string[];
  traffic_signs: string[];
  has_witness: boolean;
  witness_info: string;
  has_camera: boolean;
  description: string;
  photos: File[];
}

export interface FineAnalysisForm {
  fine_date: string;
  notification_date: string;
  fine_amount: number;
  article_number: string;
  fine_series_number: string;
  issued_to: "plate" | "driver";
  location: string;
  description: string;
  has_radar_camera: boolean;
  notification_method: string;
  owner_is_driver: boolean;
  objection_reason: string;
  documents: File[];
}

export interface PetitionForm {
  authority: string;
  applicant_name: string;
  applicant_tc: string;
  applicant_address: string;
  applicant_phone: string;
  applicant_email: string;
  plate_number: string;
  fine_number: string;
  fine_date: string;
  notification_date: string;
  incident_description: string;
  objection_reasons: string[];
  legal_basis: string;
  evidence: string[];
  attachments: string[];
}