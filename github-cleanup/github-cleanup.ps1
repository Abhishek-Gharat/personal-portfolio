# GitHub Repository Cleanup Script
# Run this in PowerShell to manage your repositories
# IMPORTANT: Install GitHub CLI first: https://cli.github.com/
# Then authenticate: gh auth login

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Cleanup Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration - Modify these based on your decisions
$REPOS_TO_MAKE_PRIVATE = @(
    "AIExpenseTracker",
    "auth-system",
    "chat-web-app",
    "color-generator",
    "frontend-mini-projects",
    "fullstack-projects",
    "mern-projects",
    "bootcamp-portfolio"
)

$REPOS_TO_DELETE = @(
    "dynamic-table-react",
    "ecommerce-frontend"
)

$REPOS_TO_ARCHIVE = @(
    "test"
)

function Make-Private {
    param([string]$repo)
    Write-Host "Making $repo private..." -ForegroundColor Yellow
    gh repo edit "Abhishek-Gharat/$repo" --visibility private
    if ($?) {
        Write-Host "  Success: $repo is now private" -ForegroundColor Green
    } else {
        Write-Host "  Failed to make $repo private" -ForegroundColor Red
    }
}

function Delete-Repo {
    param([string]$repo)
    Write-Host "Deleting $repo..." -ForegroundColor Yellow
    $confirm = Read-Host "Are you sure you want to delete $repo? (yes/no)"
    if ($confirm -eq "yes") {
        gh repo delete "Abhishek-Gharat/$repo" --yes
        if ($?) {
            Write-Host "  Deleted: $repo" -ForegroundColor Green
        } else {
            Write-Host "  Failed to delete $repo" -ForegroundColor Red
        }
    } else {
        Write-Host "  Skipped: $repo" -ForegroundColor Gray
    }
}

function Archive-Repo {
    param([string]$repo)
    Write-Host "Archiving $repo..." -ForegroundColor Yellow
    gh repo edit "Abhishek-Gharat/$repo" --archived
    if ($?) {
        Write-Host "  Archived: $repo" -ForegroundColor Green
    } else {
        Write-Host "  Failed to archive $repo" -ForegroundColor Red
    }
}

function Show-Menu {
    Write-Host ""
    Write-Host "Select action:" -ForegroundColor Cyan
    Write-Host "1. Make repositories private"
    Write-Host "2. Delete repositories"
    Write-Host "3. Archive repositories"
    Write-Host "4. List all repositories"
    Write-Host "5. Check repository sizes"
    Write-Host "6. Generate cleanup report"
    Write-Host "7. Exit"
    Write-Host ""
}

function Make-Private-All {
    Write-Host "`nMaking repositories private..." -ForegroundColor Cyan
    foreach ($repo in $REPOS_TO_MAKE_PRIVATE) {
        Make-Private $repo
    }
}

function Delete-All {
    Write-Host "`nDeleting repositories..." -ForegroundColor Cyan
    foreach ($repo in $REPOS_TO_DELETE) {
        Delete-Repo $repo
    }
}

function Archive-All {
    Write-Host "`nArchiving repositories..." -ForegroundColor Cyan
    foreach ($repo in $REPOS_TO_ARCHIVE) {
        Archive-Repo $repo
    }
}

function List-Repos {
    Write-Host "`nFetching all repositories..." -ForegroundColor Cyan
    gh repo list Abhishek-Gharat --limit 100 --json name,visibility,updatedAt,stargazersCount
}

function Check-Sizes {
    Write-Host "`nChecking repository sizes..." -ForegroundColor Cyan
    gh repo list Abhishek-Gharat --limit 100 --json name,size
}

function Generate-Report {
    Write-Host "`nGenerating cleanup report..." -ForegroundColor Cyan
    
    $reportContent = @"
# GitHub Cleanup Report
Generated: $(Get-Date)

## Repositories to Make Private
$($REPOS_TO_MAKE_PRIVATE -join "`n- ")

## Repositories to Delete
$($REPOS_TO_DELETE -join "`n- ")

## Repositories to Archive
$($REPOS_TO_ARCHIVE -join "`n- ")

## Recommended Public Repos (6 to pin)
1. Booking-app (merged with booking-backend)
2. EcomApp
3. exam-platform-client (merged with exam-platform-server)
4. FileCompressor

## Action Items
1. Update profile README
2. Merge duplicate repositories
3. Make learning repos private
4. Delete empty/useless repos
5. Pin 6 best repositories
"@
    
    $reportPath = "github-cleanup-report.md"
    $reportContent | Out-File -FilePath $reportPath -Encoding UTF8
    Write-Host "Report saved to: $reportPath" -ForegroundColor Green
}

$running = $true
while ($running) {
    Show-Menu
    $choice = Read-Host "Enter choice (1-7)"
    
    switch ($choice) {
        "1" { Make-Private-All }
        "2" { Delete-All }
        "3" { Archive-All }
        "4" { List-Repos }
        "5" { Check-Sizes }
        "6" { Generate-Report }
        "7" { $running = $false }
        default { Write-Host "Invalid choice" -ForegroundColor Red }
    }
    
    if ($running) {
        Write-Host "`nPress any key to continue..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
}

Write-Host "`nCleanup tool exited. Good luck with your profile optimization!" -ForegroundColor Green
