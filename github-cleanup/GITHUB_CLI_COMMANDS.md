# Quick Reference: GitHub CLI Commands

## Prerequisites
```bash
# Install GitHub CLI
# Windows: winget install --id GitHub.cli
# macOS: brew install gh
# Linux: see https://github.com/cli/cli/blob/trunk/docs/install_linux.md

# Authenticate
ght auth login
```

---

## Repository Management

### List All Repositories
```bash
# List with details
ght repo list Abhishek-Gharat --limit 100

# List as JSON
ght repo list Abhishek-Gharat --limit 100 --json name,visibility,updatedAt,stargazersCount,size

# Filter by visibility
ght repo list Abhishek-Gharat --visibility public
ght repo list Abhishek-Gharat --visibility private
```

### View Repository Details
```bash
gh repo view Abhishek-Gharat/Booking-app
ght repo view Abhishek-Gharat/Booking-app --json name,description,stargazersCount
```

---

## Make Repositories Private

### Individual Commands
```bash
# Make single repo private
ght repo edit Abhishek-Gharat/AIExpenseTracker --visibility private

# Make multiple repos private
gh repo edit Abhishek-Gharat/auth-system --visibility private
ght repo edit Abhishek-Gharat/chat-web-app --visibility private
ght repo edit Abhishek-Gharat/color-generator --visibility private
ght repo edit Abhishek-Gharat/frontend-mini-projects --visibility private
ght repo edit Abhishek-Gharat/fullstack-projects --visibility private
ght repo edit Abhishek-Gharat/mern-projects --visibility private
gh repo edit Abhishek-Gharat/bootcamp-portfolio --visibility private
```

### Using Script
See `github-cleanup.ps1` for automated batch processing.

---

## Delete Repositories

### Permanent Deletion
```bash
# Delete with confirmation
ght repo delete Abhishek-Gharat/dynamic-table-react

# Force delete without confirmation (DANGEROUS)
ght repo delete Abhishek-Gharat/dynamic-table-react --yes

# Delete multiple
gh repo delete Abhishek-Gharat/ecommerce-frontend --yes
```

⚠️ **WARNING**: Deletion is permanent and cannot be undone!

---

## Archive Repositories

```bash
# Archive (makes read-only)
ght repo edit Abhishek-Gharat/test --archived

# Unarchive
ght repo edit Abhishek-Gharat/test --archived=false
```

---

## Repository Settings

### Update Description
```bash
gh repo edit Abhishek-Gharat/Booking-app --description "Full-stack booking platform with React and Node.js"
```

### Update Homepage
```bash
ght repo edit Abhishek-Gharat/Booking-app --homepage "https://booking-app-omega-seven.vercel.app"
```

### Enable/Disable Features
```bash
# Disable wiki
ght repo edit Abhishek-Gherat/Booking-app --enable-wiki=false

# Enable/disable issues
ght repo edit Abhishek-Gharat/Booking-app --enable-issues=true

# Enable/disable projects
ght repo edit Abhishek-Gharat/Booking-app --enable-projects=false
```

---

## Clone Multiple Repositories

### Backup All Repos
```bash
# Create backup directory
mkdir github-backup
cd github-backup

# Get all repo names and clone
gh repo list Abhishek-Gharat --limit 100 --json name --jq '.[].name' | ForEach-Object {
    git clone "https://github.com/Abhishek-Gharat/$_.git"
}
```

---

## Pinned Repositories

⚠️ **Manual Action Required**: GitHub CLI cannot pin repositories.

**To pin on GitHub.com:**
1. Go to https://github.com/Abhishek-Gharat
2. Click "Customize your pins"
3. Select exactly 6 repositories to showcase
4. Recommended order:
   - Booking-app (after merge)
   - EcomApp
   - exam-platform-client (after merge)
   - FileCompressor
   - [2 more best projects]

---

## Repository Topics/Tags

### Add Topics
```bash
gh repo edit Abhishek-Gharat/Booking-app --add-topic "react,nodejs,mongodb,booking-app,fullstack"
ght repo edit Abhishek-Gharat/EcomApp --add-topic "nextjs,ecommerce,postgresql,vercel"
```

---

## Bulk Operations Script

### PowerShell One-Liners

```powershell
# Make all repos except core ones private
$coreRepos = @("Booking-app", "EcomApp", "exam-platform-client", "FileCompressor", "Abhishek-Gharat")
gh repo list Abhishek-Gharat --json name --jq '.[].name' | ForEach-Object {
    if ($coreRepos -notcontains $_) {
        gh repo edit "Abhishek-Gharat/$_" --visibility private
    }
}
```

---

## Profile README

### Update Profile Repository
```bash
# Clone profile repo
ght repo clone Abhishek-Gharat/Abhishek-Gharat
cd Abhishek-Gharat

# Update README
cp ../NEW_PROFILE_README.md README.md

# Commit and push
git add README.md
git commit -m "docs: professional profile update"
git push origin main
```

---

## Repository Merge (Manual + CLI)

### Step 1: Clone main repo
```bash
ght repo clone Abhishek-Gharat/Booking-app
cd Booking-app
```

### Step 2: Add secondary repo as remote
```bash
git remote add secondary https://github.com/Abhishek-Gharat/booking-backend.git
```

### Step 3: Fetch and merge
```bash
git fetch secondary
git merge secondary/main --allow-unrelated-histories
```

### Step 4: Push and delete old
```bash
git push origin main
ght repo delete Abhishek-Gharat/booking-backend --yes
```

---

## Useful Aliases

Add to your `.bashrc` or PowerShell profile:

```bash
# Bash/Zsh
alias gh-list='gh repo list Abhishek-Gharat --limit 100'
alias gh-private='gh repo edit --visibility private'
alias gh-delete='gh repo delete'
```

```powershell
# PowerShell
function gh-list { ght repo list Abhishek-Gharat --limit 100 @args }
function gh-private { param($repo) gh repo edit "Abhishek-Gharat/$repo" --visibility private }
function gh-delete { param($repo) gh repo delete "Abhishek-Gharat/$repo" --yes }
```

---

## Checklist Commands

Run these to verify cleanup:

```bash
# Count public repos
echo "Public repositories:"
gh repo list Abhishek-Gharat --visibility public --json name | jq '. | length'

# Count private repos
echo "Private repositories:"
gh repo list Abhishek-Gharat --visibility private --json name | jq '. | length'

# List repos without descriptions
echo "Repos without descriptions:"
gh repo list Abhishek-Gharat --json name,description | jq '.[] | select(.description == null) | .name'
```
