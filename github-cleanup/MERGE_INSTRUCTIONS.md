# Repository Merge Instructions

## Overview
This document provides step-by-step instructions for merging duplicate repositories.

---

## 1. Booking System Merge

**Merge:** booking-backend + Booking-React-app → Booking-app

### Step 1: Clone the main repository
```bash
git clone https://github.com/Abhishek-Gharat/Booking-app.git
cd Booking-app
```

### Step 2: Add other repositories as remotes
```bash
git remote add backend https://github.com/Abhishek-Gharat/booking-backend.git
git remote add react-app https://github.com/Abhishek-Gharat/Booking-React-app.git
```

### Step 3: Fetch and merge backend
```bash
git fetch backend
git checkout -b merge-backend
git subtree add --prefix=server backend/main --squash
```

### Step 4: Fetch and merge React app
```bash
git fetch react-app
git subtree add --prefix=client-archive react-app/main --squash
```

### Step 5: Review and clean up
```bash
# Review the structure
git status

# Commit the merge
git checkout main
git merge merge-backend

# Push to GitHub
git push origin main
```

### Step 6: Update structure
Create this directory structure:
```
Booking-app/
├── client/          # Main frontend (from current Booking-app)
├── server/          # Backend (from booking-backend)
├── README.md        # Updated comprehensive README
└── package.json     # Root package.json with workspaces
```

### Step 7: Delete old repositories
```bash
# After successful merge
gh repo delete Abhishek-Gharat/booking-backend --yes
gh repo delete Abhishek-Gharat/Booking-React-app --yes
```

---

## 2. Exam Platform Merge

**Merge:** exam-platform-server → exam-platform-client

### Step 1: Clone client repository
```bash
git clone https://github.com/Abhishek-Gharat/exam-platform-client.git
cd exam-platform-client
```

### Step 2: Add server as remote
```bash
git remote add server https://github.com/Abhishek-Gharat/exam-platform-server.git
```

### Step 3: Merge server code
```bash
git fetch server
git subtree add --prefix=server server/main --squash
```

### Step 4: Update package.json
Add to root package.json:
```json
{
  "name": "exam-platform",
  "private": true,
  "workspaces": ["client", "server"],
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:server": "cd server && npm run dev",
    "dev:client": "cd client && npm start",
    "build": "cd client && npm run build",
    "start": "cd server && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

### Step 5: Commit and push
```bash
git add .
git commit -m "feat: merge server into monorepo structure"
git push origin main
```

### Step 6: Delete server repository
```bash
gh repo delete Abhishek-Gharat/exam-platform-server --yes
```

### Step 7: Rename repository (optional)
```bash
gh repo rename Abhishek-Gharat/exam-platform-client exam-platform
```

---

## 3. E-commerce Cleanup

**Action:** Keep EcomApp, delete ecommerce-app and ecommerce-frontend

### Step 1: Verify EcomApp is complete
```bash
git clone https://github.com/Abhishek-Gharat/EcomApp.git
cd EcomApp
# Verify all code is present
```

### Step 2: Delete duplicates
```bash
gh repo delete Abhishek-Gharat/ecommerce-app --yes
gh repo delete Abhishek-Gharat/ecommerce-frontend --yes
```

### Step 3: Update EcomApp README
- Add comprehensive documentation
- Include deployment URL
- Add screenshots

---

## Alternative: Manual File Copy (Simpler)

If subtree merge is too complex, do manual merge:

### For Booking System:
```bash
# Create new folder structure
mkdir Booking-app-merged
cd Booking-app-merged

# Copy frontend
cp -r ../Booking-app/* client/

# Copy backend
cp -r ../booking-backend/* server/

# Initialize new git repo
git init
git add .
git commit -m "Initial commit: merged booking platform"

# Push to Booking-app (force push after backup)
git remote add origin https://github.com/Abhishek-Gharat/Booking-app.git
git push --force origin main
```

---

## Post-Merge Checklist

- [ ] All code is present in main repository
- [ ] README is updated with new structure
- [ ] Old repositories are deleted
- [ ] Local links/shortcuts updated
- [ ] Deployment URLs still work
- [ ] Git history preserved (optional - use --squash for clean history)

---

## Notes

1. **Backup first:** Clone all repos locally before deleting
2. **Test locally:** Ensure merged code works before pushing
3. **Update documentation:** Change all references to old repos
4. **CI/CD:** Update any GitHub Actions or deployment scripts
