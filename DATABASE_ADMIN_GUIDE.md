# SkyUnit AI - Database Administration Guide
## Professional Client & Booking Management System

### Overview
This guide provides comprehensive instructions for managing your SkyUnit AI Real Estate platform's database and admin dashboards.

---

## Database Structure

### Users Table
Stores information about all registered clients and agents.

**Fields:**
- `id`: Unique identifier (UUID)
- `email`: User email (unique, searchable)
- `fullName`: First and last name
- `phoneNumber`: Contact phone number
- `profileImage`: Avatar URL
- `address`, `city`, `country`: Location information
- `accountStatus`: active | inactive | suspended
- `accountType`: buyer | seller | agent
- `verificationStatus`: pending | verified | rejected
- `createdAt`: Registration timestamp
- `lastLogin`: Most recent login time

### Property Bookings Table
Manages all property viewings, consultations, and inspections.

**Fields:**
- `id`: Booking ID (UUID)
- `userId`: Reference to Users table
- `propertyTitle`: Name of property
- `propertyPrice`: Listed price
- `bookingType`: site-visit | consultation | inspection | negotiation
- `bookingStatus`: pending | confirmed | completed | cancelled
- `preferredDate`: Booking appointment date
- `preferredTime`: Time slot (HH:MM format)
- `duration`: Session length in minutes
- `numberOfAttendees`: People attending
- `specialRequests`: Any notes or special requirements
- `agentAssigned`: Name of assigned agent
- `createdAt`: Booking creation time
- `completedAt`: When booking was finished

---

## Admin Dashboards

### 1. Clients Dashboard (`/admin/clients`)

**Features:**
- View all registered users in a professional table
- Search by name, email, or phone number
- Filter by account type (buyer/seller/agent)
- Filter by account status (active/inactive/suspended)
- View client profile details
- Edit user information
- Verify or reject client accounts
- View client booking history

**Quick Actions:**
- Click on any row to view full profile
- Bulk action buttons for verification
- Export client list (CSV/PDF)
- Send emails to verified clients

### 2. Bookings Dashboard (`/admin/bookings`)

**Features:**
- Complete list of all property bookings
- Real-time status updates
- Filter by booking type (site-visit, consultation, etc.)
- Filter by status (pending, confirmed, completed, cancelled)
- Search by client name or property name
- View booking details with client information
- Edit booking details and reassign agents
- Cancel or complete bookings
- View booking timeline and history

**Quick Actions:**
- Confirm pending bookings
- Mark bookings as completed
- Reassign agents
- Send reminder emails
- View client contact information

---

## Using the Admin Panels

### Accessing the Dashboards
```
Clients: https://skyunitai.site/admin/clients
Bookings: https://skyunitai.site/admin/bookings
```

### Searching and Filtering
1. Use search bar to find by keyword
2. Apply multiple filters for precise results
3. Sort by any column (name, date, status)
4. Click "Advanced Search" for complex queries

### Managing Client Accounts
1. **View Profile**: Click client name to see full details
2. **Edit Info**: Click edit icon to modify data
3. **Verify Account**: Approve pending verifications
4. **Suspend Account**: Disable inactive or problematic accounts
5. **View History**: See all bookings and interactions

### Managing Bookings
1. **Confirm Booking**: Change status from pending to confirmed
2. **Complete Booking**: Mark as done when appointment is finished
3. **Cancel Booking**: Note reason for cancellation
4. **Reassign Agent**: Change assigned agent if needed
5. **Send Reminder**: Automated email 24 hours before appointment

---

## Best Practices

✅ **DO:**
- Regularly backup your database
- Verify client accounts promptly
- Assign bookings to appropriate agents
- Send reminder emails 24 hours before appointments
- Keep client information updated
- Export reports weekly for analysis

❌ **DON'T:**
- Delete client records (archive instead)
- Share client contact information
- Modify completed bookings without reason
- Suspend accounts without communication
- Leave pending verifications unreviewed

---

## Data Security

- All data is encrypted in transit and at rest
- Access controlled by role-based permissions
- Audit logs track all administrative actions
- Regular automated backups to secure servers
- Password must be changed every 90 days

---

## Support

For issues or questions about the admin panel:
- Contact: support@skyunitai.site
- Documentation: https://docs.skyunitai.site
- Status Page: https://status.skyunitai.site
