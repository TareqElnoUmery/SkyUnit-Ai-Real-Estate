// SkyUnit AI - Professional Database Schema
// Structure for Users and Property Bookings Management

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  profileImage?: string;
  address?: string;
  city?: string;
  country?: string;
  accountStatus: 'active' | 'inactive' | 'suspended';
  accountType: 'buyer' | 'seller' | 'agent';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface PropertyBooking {
  id: string;
  userId: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyPrice: number;
  bookingType: 'site-visit' | 'consultation' | 'inspection' | 'negotiation';
  bookingStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  preferredDate: Date;
  preferredTime: string;
  duration: number;
  numberOfAttendees: number;
  specialRequests?: string;
  agentAssigned?: string;
  notes?: string;
  confirmationEmail: string;
  remindersSent: boolean;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
