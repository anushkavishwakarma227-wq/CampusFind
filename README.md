# CampusFind 🔎

### Campus Lost & Found Platform

CampusFind is a web-based Lost & Found platform designed to help students report, search for, and reconnect with belongings lost or found on campus.

Instead of relying on scattered messages and groups, CampusFind provides a centralized platform where students can report items and search existing reports.

---

## 🎯 Problem Statement

Lost belongings on college campuses can be difficult to recover because information is often scattered across WhatsApp groups, class groups, social media, and personal conversations.

Students may not know:

- Where to report a lost or found item
- Whether someone has already found their belongings
- Where to search for recently reported items
- How to contact the person who reported an item

CampusFind addresses this problem by providing a centralized Lost & Found platform for the campus community.

---

## 💡 Our Solution

CampusFind allows students to:

1. Report an item they have lost or found.
2. Provide details such as item name, category, description, location, date, and contact information.
3. Upload an image of the item.
4. Browse recently reported Lost & Found items.
5. Search for items using keywords.
6. Filter reports by Lost/Found status and category.
7. View details of reported items.

The goal is to make finding and returning belongings faster and easier.

---

## ✨ Features

### 📢 Report an Item

Students can submit:

- Lost or Found status
- Item name
- Category
- Description
- Location
- Date
- Photo
- Contact information

### 🔎 Search

Users can search reports using:

- Item name
- Category
- Description
- Location
- Lost/Found status

### 🏷️ Filters

Users can filter reports by:

- All Items
- Lost
- Found
- Electronics
- Documents
- Accessories

### 🖼️ Image Upload

Users can upload an image while reporting an item. Images are processed and stored using Google Drive through the backend integration.

### 📋 View Details

Users can select **View Details** to see additional information about a reported item, including its description and contact information.

### 📱 Responsive Design

The website is designed to work across desktop and mobile screen sizes.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Google Apps Script | Backend/API integration |
| Google Sheets | Storing item reports |
| Google Drive | Storing uploaded images |
| VS Code | Development environment |
| Live Server | Local testing |

---

## ⚙️ How It Works

```text
Student
   ↓
CampusFind Website
   ↓
Report Item Form
   ↓
JavaScript
   ↓
Google Apps Script
   ↓
Google Sheets + Google Drive
   ↓
Reports retrieved by website
   ↓
Students search and find items
```

---

## 📂 Project Structure

```text
CampusFind/
│
├── index.html
├── report.html
├── style.css
├── script.js
└── README.md
```

### File Description

**`index.html`**  
Contains the main CampusFind homepage, search interface, filters, item listings, How It Works section, and navigation.

**`report.html`**  
Contains the form used to submit Lost and Found reports.

**`style.css`**  
Contains the website styling, responsive layout, item cards, forms, buttons, navigation, and footer.

**`script.js`**  
Handles form submission, image conversion, communication with Google Apps Script, loading reports, search, filtering, and item details.

**`README.md`**  
Contains documentation about the CampusFind project.

---

## 🔄 User Flow

### For a student who lost an item

```text
Open CampusFind
       ↓
Search for the item
       ↓
Apply filters if required
       ↓
View item details
       ↓
Contact the person who reported it
```

### For a student who found an item

```text
Open CampusFind
       ↓
Report Item
       ↓
Select "I found something"
       ↓
Enter item details
       ↓
Upload photo
       ↓
Submit Report
       ↓
Item appears on CampusFind
```

---

## 🗃️ Data Storage

CampusFind uses Google services for backend storage.

### Google Sheets

Stores information including:

- Item type
- Item name
- Category
- Description
- Location
- Date
- Image information
- Contact information

### Google Drive

Uploaded item photographs are stored in Google Drive.

### Google Apps Script

Google Apps Script acts as the communication layer between the website and Google services. It receives submitted reports and provides stored reports to the website.

---

## 🔐 Data Considerations

CampusFind collects contact information so students can communicate regarding lost or found items.

Users should avoid submitting unnecessary sensitive personal information.

---

## 🚀 Future Improvements

Possible future improvements include:

- Student authentication
- College email verification
- Admin dashboard
- Report moderation
- Email notifications
- Automatic matching of Lost and Found reports
- Advanced category filtering
- Location-based campus search
- Status updates such as **Claimed** or **Returned**
- Improved privacy controls for contact information

---

## 🎯 Impact

CampusFind aims to reduce the time and effort required to recover lost belongings on campus.

It can:

- Make reporting easier
- Improve discoverability of lost items
- Reduce dependence on scattered messaging groups
- Help students connect with people who found their belongings
- Encourage a more organized campus community

---

## 🧪 Testing

The prototype was tested for the following functionality:

| Test | Result |
|---|---|
| Homepage loading | ✅ Passed |
| Report form loading | ✅ Passed |
| Lost item submission | ✅ Passed |
| Found item submission | ✅ Passed |
| Image upload | ✅ Passed |
| Google Sheets storage | ✅ Passed |
| Reports displayed on homepage | ✅ Passed |
| Search functionality | ✅ Passed |
| Lost/Found filtering | ✅ Passed |
| Category filtering | ✅ Passed |
| View Details | ✅ Passed |
| Responsive layout | ✅ Tested |

---

## 👥 Team

**Project:** CampusFind

**Team Members:**  
Add your team members' names here.

### Developed for

Hackathon / Academic Project

---

## 📌 Conclusion

CampusFind provides a simple digital solution to a common campus problem: recovering lost and found belongings.

By combining a user-friendly frontend with Google Apps Script, Google Sheets, and Google Drive, the prototype demonstrates how a lightweight web application can provide a practical solution without requiring a complex backend infrastructure.

---

### CampusFind

**Helping campus belongings find their way home.**