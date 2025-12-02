# Resume Configuration Guide

This project uses a centralized configuration file to manage your resume content. All changes made to your resume information should be updated in the `src/config/resumeConfig.js` file.

## How to Update Your Resume Content

### 1. Personal Information
Update your personal details in the `personal` section:
- `name`: Full name and display name
- `role`: Your current job title
- `location`: Your location
- `photo`: Path to your profile photo
- `bio`: Professional summary
- `contact`: Email, phone, website, and location

### 2. Work Experience
Add or modify your work experience in the `experience` array:
- `title`: Job title
- `company`: Company name
- `location`: Job location
- `period`: Start/end dates and duration
- `description`: Brief description of your role
- `responsibilities`: List of key responsibilities
- `technologies`: Technologies you worked with
- `achievements`: Notable accomplishments

### 3. Education
Update your education history in the `education` section:
- `current`: Current or most recent education
- `past`: Previous education history

### 4. Skills
Add or modify skills in the `skills` sections:
- `frontend`: Frontend development skills
- `design`: Design and UI/UX skills
- `soft`: Soft skills

### 5. Languages
Update languages you speak in the `languages` array.

### 6. Awards & Recognition
Add or modify awards in the `awards` array.

## Making Changes

1. Open `src/config/resumeConfig.js`
2. Update the relevant section with your new information
3. Save the file
4. The changes will automatically reflect in both your website CV section and the downloaded PDF

## Notes

- The CV section on the website only displays a download button
- The actual resume content is hidden but used for PDF generation
- All data is used in both the web display and PDF download
- Changes are immediately reflected when you rebuild the project