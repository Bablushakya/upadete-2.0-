# Elevation By Kim - Functional Website with Backend

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Install dependencies** (already done):
```bash
npm install
```

2. **Start the server**:
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════╗
║  Elevation By Kim - Backend Server        ║
║  Running on http://localhost:3000         ║
║                                            ║
║  📊 Admin Dashboard: http://localhost:3000/admin ║
║  🗄️ Database: elevation-by-kim.db          ║
╚════════════════════════════════════════════╝
```

3. **Open in browser**:
- Main website: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin

---

## 📋 Features Implemented

### 1. **Apply for the Trip** Button
- Click the orange button in the hero section
- Modal form opens with:
  - Full Name *
  - Email Address *
  - Phone Number *
  - Business Type * (dropdown)
  - Company Name
  - Annual Revenue
  - Sourcing Experience
  - Goals/Requirements
  - How did you hear about us?
- Form validation
- Success notification
- Data saved to SQLite database

### 2. **Schedule a Discovery Call** Button
- Click the bordered button in the hero section
- Modal form opens with:
  - Full Name *
  - Email Address *
  - Phone Number *
  - Company Name
  - Preferred Date (date picker)
  - Preferred Time (time dropdown)
  - Questions/Concerns
- Form validation
- Success notification
- Data saved to SQLite database

### 3. **Admin Dashboard**
- View all applications: `/admin`
- View all discovery calls
- Real-time statistics:
  - Total applications received
  - Total discovery calls scheduled
  - Total newsletter subscribers
- Auto-refresh every 30 seconds
- Tables with sortable data

---

## 🗄️ Database

**File**: `elevation-by-kim.db`

### Tables:

#### 1. `applications`
Stores trip applications with fields:
- id, name, email, phone
- business_type, company_name
- annual_revenue, sourcing_experience
- goals, hearing_from
- created_at, status

#### 2. `discovery_calls`
Stores discovery call requests with fields:
- id, name, email, phone
- company_name
- preferred_date, preferred_time
- questions, created_at, status

#### 3. `newsletter_subscribers`
Stores newsletter signup emails with fields:
- id, email
- created_at

---

## 🔌 API Endpoints

### Submit Application
```
POST /api/apply
Body: {
  name, email, phone, businessType,
  companyName, annualRevenue, sourcingExperience,
  goals, hearingFrom
}
Response: { success: true, message, applicationId }
```

### Schedule Discovery Call
```
POST /api/discovery-call
Body: {
  name, email, phone, companyName,
  preferredDate, preferredTime, questions
}
Response: { success: true, message, callId }
```

### Subscribe to Newsletter
```
POST /api/newsletter
Body: { email }
Response: { success: true, message }
```

### Admin - Get Applications
```
GET /api/admin/applications
Response: { success: true, data: [], count }
```

### Admin - Get Discovery Calls
```
GET /api/admin/discovery-calls
Response: { success: true, data: [], count }
```

### Admin - Get Statistics
```
GET /api/admin/stats
Response: {
  success: true,
  data: {
    total_applications,
    total_discovery_calls,
    total_subscribers
  }
}
```

---

## 🧪 Testing the Flows

### Test Apply Flow:
1. Open http://localhost:3000
2. Scroll to hero section
3. Click "Apply for the Next Trip" button
4. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: +1-555-123-4567
   - Business Type: Brand Founder
   - Company: My Brand Co
   - Revenue: $500K - $1M
   - Goals: Want to source unique home décor
5. Click "Submit Application"
6. See success notification
7. Check admin dashboard - new record appears

### Test Discovery Call Flow:
1. Scroll to hero section
2. Click "Schedule a Discovery Call" button
3. Fill in the form:
   - Name: Jane Smith
   - Email: jane@example.com
   - Phone: +1-555-987-6543
   - Company: Smith Designs
   - Date: Pick a future date
   - Time: 2:00 PM
   - Questions: Can I bring a partner?
4. Click "Schedule Call"
5. See success notification
6. Check admin dashboard Discovery Calls tab

---

## 📊 Admin Dashboard Testing

1. Open http://localhost:3000/admin
2. View statistics at the top:
   - Total Applications
   - Discovery Calls Scheduled
   - Newsletter Subscribers
3. Browse submitted applications
4. Browse discovery call requests
5. Switch between tabs to see both datasets

---

## 📁 Project Structure

```
upadate 2.0/
├── server.js                    # Backend Express server
├── admin.html                   # Admin dashboard
├── index.html                   # Main website (updated with forms)
├── package.json                 # Node dependencies
├── elevation-by-kim.db          # SQLite database (created on first run)
├── itinerary/                   # Itinerary images
├── kim images/                  # Website images
└── [other assets]
```

---

## 🔧 Troubleshooting

### Port 3000 already in use?
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (on Windows)
taskkill /PID <PID> /F
```

### Database errors?
The database is automatically created on first run. If you want to reset:
```bash
# Delete the database file
rm elevation-by-kim.db

# Restart the server - new database will be created
npm start
```

### Forms not submitting?
- Check browser console (F12) for errors
- Ensure server is running (should see "Connected to SQLite database")
- Try refreshing the page

---

## 🎨 Customization

### Change port number:
Edit `server.js`, change line:
```javascript
const PORT = 3000;  // Change to desired port
```

### Modify form fields:
Edit in `index.html`, find the modal forms and update input fields.

### Customize database:
Edit `initializeDatabase()` function in `server.js` to add/remove fields.

---

## 📱 Features Working

✅ Apply button - Opens modal form, submits data  
✅ Discovery call button - Opens modal form, submits data  
✅ Form validation - Required fields  
✅ Success notifications - Toast messages  
✅ Database storage - SQLite  
✅ Admin dashboard - View all submissions  
✅ Real-time stats - Auto-refreshing  
✅ Error handling - User-friendly messages  
✅ Responsive design - Mobile & desktop  

---

## 📞 Next Steps

1. Start the server: `npm start`
2. Open browser to http://localhost:3000
3. Test the forms
4. Check admin dashboard at http://localhost:3000/admin
5. Verify data in database

**Enjoy your fully functional website!** 🎉
