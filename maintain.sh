#!/bin/bash

# Website Maintenance Helper Script
# This script helps with common maintenance tasks for your academic website

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Website Maintenance Helper${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to show menu
show_menu() {
    echo -e "${GREEN}What would you like to do?${NC}"
    echo ""
    echo "1) Edit CV"
    echo "2) Edit Research Content"
    echo "3) Edit Teaching Content"
    echo "4) Edit Outreach Content"
    echo "5) Add new image to website"
    echo "6) Check for broken links"
    echo "7) Preview website locally"
    echo "8) Commit and push changes"
    echo "9) View recent changes"
    echo "10) Create backup"
    echo "0) Exit"
    echo ""
}

# Function to edit CV
edit_cv() {
    echo -e "${YELLOW}Opening CV for editing...${NC}"
    if [ -f "content/cv.md" ]; then
        ${EDITOR:-nano} content/cv.md
        echo -e "${GREEN}✓ CV updated${NC}"
    else
        echo -e "${RED}Error: content/cv.md not found${NC}"
    fi
}

# Function to edit research
edit_research() {
    echo -e "${YELLOW}Select research area to edit:${NC}"
    echo "1) Nuclear Astrophysics"
    echo "2) Computation"
    echo "3) Machine Learning"
    read -p "Choice: " research_choice
    
    case $research_choice in
        1)
            ${EDITOR:-nano} content/research/nuclear-astrophysics.md
            ;;
        2)
            ${EDITOR:-nano} content/research/computation.md
            ;;
        3)
            ${EDITOR:-nano} content/research/machine-learning.md
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            ;;
    esac
}

# Function to edit teaching
edit_teaching() {
    echo -e "${YELLOW}Select teaching area to edit:${NC}"
    echo "1) Physics"
    echo "2) Mathematics"
    echo "3) Programming"
    read -p "Choice: " teaching_choice
    
    case $teaching_choice in
        1)
            ${EDITOR:-nano} content/teaching/physics.md
            ;;
        2)
            ${EDITOR:-nano} content/teaching/mathematics.md
            ;;
        3)
            ${EDITOR:-nano} content/teaching/programming.md
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            ;;
    esac
}

# Function to edit outreach
edit_outreach() {
    echo -e "${YELLOW}Opening outreach content...${NC}"
    ${EDITOR:-nano} content/outreach/outreach.md
}

# Function to add image
add_image() {
    echo -e "${YELLOW}Add new image${NC}"
    read -p "Enter source path of image: " img_source
    echo ""
    echo "Select destination category:"
    echo "1) General (img/)"
    echo "2) Nuclear Astrophysics (img/NuclearAstro/)"
    echo "3) Machine Learning (img/ML/)"
    echo "4) Computation (img/Computation/)"
    read -p "Choice: " img_choice
    
    case $img_choice in
        1) img_dest="img/" ;;
        2) img_dest="img/NuclearAstro/" ;;
        3) img_dest="img/ML/" ;;
        4) img_dest="img/Computation/" ;;
        *) echo -e "${RED}Invalid choice${NC}"; return ;;
    esac
    
    if [ -f "$img_source" ]; then
        cp "$img_source" "$img_dest"
        filename=$(basename "$img_source")
        echo -e "${GREEN}✓ Image copied to $img_dest${NC}"
        echo -e "${BLUE}Use in markdown: ![Description](../$img_dest$filename)${NC}"
    else
        echo -e "${RED}Error: Source file not found${NC}"
    fi
}

# Function to check links (basic)
check_links() {
    echo -e "${YELLOW}Checking for markdown files...${NC}"
    find content -name "*.md" -type f | while read file; do
        echo -e "${BLUE}Checking: $file${NC}"
        grep -o '\[.*\](http[s]*://[^)]*)' "$file" | cut -d'(' -f2 | cut -d')' -f1
    done
}

# Function to preview website
preview_site() {
    echo -e "${YELLOW}Starting local web server...${NC}"
    echo -e "${GREEN}Visit: http://localhost:8000${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
    python3 -m http.server 8000
}

# Function to commit and push
commit_push() {
    echo -e "${YELLOW}Checking status...${NC}"
    git status
    echo ""
    read -p "Commit message: " commit_msg
    
    if [ -z "$commit_msg" ]; then
        echo -e "${RED}Commit message required${NC}"
        return
    fi
    
    echo -e "${YELLOW}Adding changes...${NC}"
    git add content/ img/
    
    echo -e "${YELLOW}Committing...${NC}"
    git commit -m "$commit_msg"
    
    echo -e "${YELLOW}Pushing to GitHub...${NC}"
    git push
    
    echo -e "${GREEN}✓ Changes pushed! Website will update in ~2 minutes${NC}"
}

# Function to view recent changes
view_changes() {
    echo -e "${YELLOW}Recent commits:${NC}"
    git log --oneline -10
    echo ""
    echo -e "${YELLOW}Recent file changes:${NC}"
    git diff --stat HEAD~1 HEAD
}

# Function to create backup
create_backup() {
    backup_name="backup_$(date +%Y%m%d_%H%M%S).tar.gz"
    echo -e "${YELLOW}Creating backup: $backup_name${NC}"
    tar -czf "../$backup_name" \
        content/ \
        img/ \
        index.html \
        cv.html \
        --exclude='.git'
    echo -e "${GREEN}✓ Backup created: ../$backup_name${NC}"
}

# Main loop
while true; do
    show_menu
    read -p "Enter choice: " choice
    echo ""
    
    case $choice in
        1) edit_cv ;;
        2) edit_research ;;
        3) edit_teaching ;;
        4) edit_outreach ;;
        5) add_image ;;
        6) check_links ;;
        7) preview_site ;;
        8) commit_push ;;
        9) view_changes ;;
        10) create_backup ;;
        0)
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    echo ""
done
