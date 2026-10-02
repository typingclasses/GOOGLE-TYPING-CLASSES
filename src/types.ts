export interface Course {
  id: string;
  title: string;
  category: 'typing' | 'computer' | 'shorthand' | 'competitive';
  duration: string;
  fees: string;
  description: string;
  highlights: string[];
  level: string;
  iconName: string;
  published: boolean;
}

export interface StudentResult {
  id: string;
  studentId: string;
  registrationNo: string;
  name: string;
  dob?: string;
  course: string;
  speed?: string;
  englishSpeed?: string;
  hindiSpeed?: string;
  accuracy?: string;
  marks?: string;
  cgpa?: string;
  testDate: string;
  status: 'Passed' | 'Distinction' | 'Certified' | 'Completed';
  achievement: string;
  certificateStatus: 'Available' | 'Issued' | 'Pending';
  published: boolean;
  documentUrl?: string;
  documentName?: string;
  documentType?: 'pdf' | 'docx' | 'doc' | 'image' | 'document';
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  course: string;
  registrationNo: string;
  enrolledDate: string;
  status: 'Active' | 'Inactive';
  dob?: string;
  avatar?: string;
  address?: string;
  batch?: string;
}

export interface TypingPassage {
  id: string;
  title: string;
  language: 'English' | 'Hindi';
  hindiFontType?: 'Kruti Dev 010' | 'Unicode / Mangal' | 'Remington Gail' | 'Inscript';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'SSC CHSL / Court Special' | 'Exam Special';
  category: string;
  durationSeconds: number;
  text: string;
  wordCount: number;
  dateAdded: string;
  isActive: boolean;
}

export interface TypingTestRecord {
  id: string;
  date: string;
  mode: 'English' | 'Hindi';
  passageTitle?: string;
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
  studentName?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CertificateItem {
  id: string;
  certificateId: string;
  studentId: string;
  studentName: string;
  course: string;
  issueDate: string;
  status: 'Valid' | 'Revoked' | 'Pending';
  verificationCode: string;
}

export interface WFHApplication {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  interest: string;
  date: string;
  status: 'New' | 'Contacted' | 'Approved' | 'Rejected';
  notes?: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  mobile: string;
  email: string;
  courseInterested: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Closed';
  notes?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'logo';
  url: string;
  size: string;
  uploadDate: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Content Manager' | 'Result Manager';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface ActivityLogItem {
  id: string;
  adminName: string;
  action: string;
  details: string;
  date: string;
  ipAddress: string;
}

export interface InstituteSettings {
  instituteName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapLocation: string;
  websiteTitle: string;
  metaDescription: string;
  keywords: string;
  footerText: string;
  logoUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  telegramUrl?: string;
  adminEmail?: string;
  adminPassword?: string;
  heroImageUrl?: string;
  bannerImageUrl?: string;
}

