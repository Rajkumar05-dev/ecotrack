# Admin Authentication Pages

This document describes the admin login and register pages created for EcoTrack.

## Overview

Two new authentication pages have been created specifically for admin users:

1. **AdminLogin.jsx** - `/admin-login` - Admin login interface
2. **AdminRegister.jsx** - `/admin-register` - Admin registration interface

These pages are distinct from the regular user login/register pages and include role-based access control.

## File Locations

```
frontend/src/pages/
  ├── AdminLogin.jsx
  └── AdminRegister.jsx
```

## Routes

The following routes have been added to `App.jsx`:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin-login` | AdminLogin | Admin login page |
| `/admin-register` | AdminRegister | Admin registration page |
| `/admin-dashboard` | Dashboard | Admin-only dashboard (role-protected) |

## Features

### AdminLogin.jsx

**Validations:**
- Email format validation (required, valid email format)
- Password validation (required, minimum 6 characters)
- Admin role verification (ensures logged-in user has ADMIN role)

**Features:**
- Real-time validation feedback with error messages
- Loading state during authentication
- Error alerts for failed login attempts
- Link to user login page (`/login`)
- Shield icon for visual admin distinction
- Blue color scheme (#3b82f6) to differentiate from user pages

**Error Handling:**
- Invalid email format
- Missing required fields
- Incorrect credentials
- Non-admin account access attempt

### AdminRegister.jsx

**Validations:**
- **Full Name**: 2+ characters, letters and spaces only
- **Email**: Valid email format
- **Phone**: 10 digits (numbers only)
- **Password**: 8+ characters with strength indicator
  - Weak: < 4 criteria met
  - Good: 4 criteria met
  - Strong: 5 criteria met
  - Very Strong: All 6 criteria met
- **Confirm Password**: Must match password field
- **Admin Code**: Authorization code (demo: "ADMIN2026")

**Password Strength Criteria:**
- At least 8 characters
- At least 12 characters
- Contains lowercase letters (a-z)
- Contains uppercase letters (A-Z)
- Contains numbers (0-9)
- Contains special characters (!@#$%^&*)

**Features:**
- Visual password strength meter with color coding
- Real-time validation on blur
- Success message with auto-redirect to admin login
- Admin code verification
- Comprehensive error feedback
- Auto-formatting of phone number (numbers only)

## Usage

### For Admin Registration

1. Navigate to `/admin-register`
2. Fill in all required fields:
   - Full Name (e.g., "John Admin")
   - Email (e.g., "admin@example.com")
   - Phone (10 digits)
   - Password (8+ characters, recommended to use mix of case, numbers, symbols)
   - Confirm Password
   - Admin Code (use "ADMIN2026" for testing)
3. Click "Create Admin Account"
4. On success, automatically redirected to `/admin-login`

### For Admin Login

1. Navigate to `/admin-login`
2. Enter admin email
3. Enter password
4. Click "Sign In"
5. On success, redirected to `/admin-dashboard`

## Integration with Backend

The pages use the existing `api.register()` and `api.login()` methods from `api.js`:

```javascript
// Login
const response = await api.login(email, password);

// Register
await api.register(name, email, password, phoneNo);
```

### Backend Integration Notes

1. **Admin Code Validation**: Currently validates against hardcoded "ADMIN2026" on frontend. For production:
   - Implement server-side validation
   - Send admin code to backend
   - Backend should verify against secure codes database

2. **Admin Role Verification**: After successful login:
   - Frontend checks `response.userDto.role.appRole` for "ADMIN" substring
   - Backend should only assign ADMIN role through proper authorization
   - Only authenticated admins should have ADMIN role

3. **Future Enhancements**:
   - Add email verification for new admin accounts
   - Implement two-factor authentication
   - Add admin approval workflow for new registrations
   - Implement admin code expiration
   - Add admin access audit logging

## Styling

Both pages follow the existing EcoTrack design system:

- **Color Scheme**: Blue (#3b82f6) for admin distinction
- **Design**: Glass-morphism effect with dark background
- **Icons**: Lucide icons (Mail, Lock, Shield, User, Phone, etc.)
- **Responsive**: Works on mobile, tablet, and desktop
- **Typography**: Consistent with existing app

## Testing

### Test Credentials (Mock Data)

For testing with the existing mock data in `api.js`:

**Admin Account:**
- Email: `admin@ecotrack.com`
- Password: `any-password` (mock bypass)
- Role: `ROLE_ADMIN`

**Test Admin Registration:**
- Use demo admin code: `ADMIN2026`
- Fill in other fields with valid data

### Manual Testing Checklist

- [ ] Admin registration validation works for each field
- [ ] Password strength meter updates in real-time
- [ ] Confirm password validation matches
- [ ] Admin code verification works
- [ ] Non-matching passwords show error
- [ ] Admin login validates email and password
- [ ] Non-admin users cannot access admin dashboard
- [ ] Admin users can access admin dashboard
- [ ] Success messages appear and redirect correctly
- [ ] Error messages appear for failed attempts
- [ ] Links navigate to correct pages
- [ ] Mobile responsive design looks good

## Security Considerations

1. **Admin Code**: Currently hardcoded for demo. Should be:
   - Generated by system
   - Sent securely to authorized admins
   - Stored encrypted on backend
   - Have expiration dates

2. **Password Security**:
   - Enforces strong password requirements
   - Frontend validation + backend validation
   - Never store plain text passwords
   - Use HTTPS for all transmission

3. **Role-Based Access Control**:
   - ProtectedRoute component with role checking
   - Backend should verify admin role on every admin-only request
   - Implement proper JWT token validation

4. **Audit Logging**:
   - Log all admin registration attempts
   - Log all admin login attempts
   - Log all admin actions
   - Monitor for suspicious activity

## Common Issues & Solutions

**Issue**: Validation errors not showing
- **Solution**: Check browser console for JavaScript errors

**Issue**: Page not redirecting after successful login
- **Solution**: Ensure backend returns `ROLE_ADMIN` in response.userDto.role.appRole

**Issue**: Admin code not being accepted
- **Solution**: For testing, use "ADMIN2026". For production, implement backend validation

**Issue**: Responsive design issues on mobile
- **Solution**: All styling uses relative units and flexbox - should be responsive

## Future Enhancements

1. **Email Verification**: Send verification email to new admin registrations
2. **Two-Factor Authentication**: Add 2FA for admin accounts
3. **Approval Workflow**: Require existing admin to approve new admin registrations
4. **OAuth Integration**: Support sign-in with GitHub, Google, etc.
5. **Session Management**: Implement session timeout and re-authentication
6. **Admin Profile**: Add admin profile page to view/edit account details
7. **Audit Dashboard**: Add logs for admin activities
8. **Advanced Password Policy**: Enforce password rotation and history
