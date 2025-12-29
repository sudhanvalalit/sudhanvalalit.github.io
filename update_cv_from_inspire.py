#!/usr/bin/env python3
"""
InspireHEP CV Updater
Automatically fetches publication data from InspireHEP and updates your CV.

Usage:
    python update_cv_from_inspire.py

Requirements:
    pip install requests
"""

import requests
import json
from datetime import datetime

# Your InspireHEP author ID and name
INSPIRE_AUTHOR_ID = "1699142"
INSPIRE_AUTHOR_NAME = "Sudhanva Lalit"  # Use full name for literature search
INSPIRE_API_URL = f"https://inspirehep.net/api/authors/{INSPIRE_AUTHOR_ID}"
INSPIRE_LITERATURE_URL = f"https://inspirehep.net/api/literature?sort=mostrecent&size=100&q=a%20{INSPIRE_AUTHOR_NAME.replace(' ', '%20')}"

CV_FILE = "content/cv.md"
INDEX_FILE = "index.html"

def fetch_inspire_data():
    """Fetch author data and publications from InspireHEP API."""
    print("Fetching data from InspireHEP...")
    
    # Fetch author info
    author_response = requests.get(INSPIRE_API_URL)
    if author_response.status_code != 200:
        print(f"Error fetching author data: {author_response.status_code}")
        return None, None
    
    author_data = author_response.json()
    
    # Fetch publications
    lit_response = requests.get(INSPIRE_LITERATURE_URL)
    if lit_response.status_code != 200:
        print(f"Error fetching publications: {lit_response.status_code}")
        return author_data, None
    
    lit_data = lit_response.json()
    
    return author_data, lit_data

def extract_citation_summary(author_data):
    """Extract citation metrics from author data."""
    metadata = author_data.get('metadata', {})
    
    # Get citation summary
    citation_summary = metadata.get('citation_summary', {})
    
    return {
        'papers': citation_summary.get('paper_count', 0),
        'citeable': citation_summary.get('citeable_paper_count', 0),
        'published': citation_summary.get('published_paper_count', 0),
        'citations': citation_summary.get('citation_count', 0),
        'h_index': citation_summary.get('h_index', 0),
    }

def format_authors(authors, max_authors=5):
    """Format author list, using 'et al.' if too many authors."""
    if not authors:
        return ""
    
    author_names = []
    for author in authors:
        full_name = author.get('full_name', '')
        if full_name:
            author_names.append(full_name)
    
    if len(author_names) <= max_authors:
        return ", ".join(author_names)
    else:
        return ", ".join(author_names[:max_authors]) + ", et al."

def extract_arxiv(metadata):
    """Extract arXiv ID from metadata."""
    arxiv_eprints = metadata.get('arxiv_eprints', [])
    if arxiv_eprints:
        return arxiv_eprints[0].get('value', '')
    return None

def extract_doi(metadata):
    """Extract DOI from metadata."""
    dois = metadata.get('dois', [])
    if dois:
        return dois[0].get('value', '')
    return None

def extract_journal_info(metadata):
    """Extract journal publication info."""
    pub_info = metadata.get('publication_info', [])
    if pub_info:
        info = pub_info[0]
        journal = info.get('journal_title', '')
        volume = info.get('journal_volume', '')
        year = info.get('year', '')
        page_start = info.get('page_start', '')
        
        if journal:
            result = f"*{journal}*"
            if volume:
                result += f" {volume}"
            if year:
                result += f" ({year})"
            if page_start:
                result += f", {page_start}"
            return result
    return None

def get_citation_count(record):
    """Get citation count for a record."""
    metadata = record.get('metadata', {})
    return metadata.get('citation_count', 0)

def format_publication(record):
    """Format a single publication entry."""
    metadata = record.get('metadata', {})
    
    # Extract basic info
    title = metadata.get('titles', [{}])[0].get('title', 'Untitled')
    authors = format_authors(metadata.get('authors', []))
    
    # Get year
    earliest_date = metadata.get('earliest_date', '')
    year = earliest_date[:4] if earliest_date else metadata.get('publication_info', [{}])[0].get('year', '')
    
    # Get links
    arxiv = extract_arxiv(metadata)
    doi = extract_doi(metadata)
    journal_info = extract_journal_info(metadata)
    citations = get_citation_count(record)
    
    # Build the entry
    entry = f"**{title}**  \n"
    entry += f"{authors}  \n"
    
    if journal_info:
        entry += f"{journal_info}  \n"
    
    # Add links
    links = []
    if doi:
        links.append(f"[DOI: {doi}](https://doi.org/{doi})")
    if arxiv:
        links.append(f"arXiv:[{arxiv}](https://arxiv.org/abs/{arxiv})")
    
    if links:
        entry += " | ".join(links) + "  \n"
    
    if citations > 0:
        entry += f"**Citations:** {citations}\n"
    
    return entry, bool(journal_info), year

def categorize_publications(lit_data):
    """Categorize publications into preprints and published."""
    records = lit_data.get('hits', {}).get('hits', [])
    
    preprints = []
    published = []
    
    for record in records:
        metadata = record.get('metadata', {})
        
        # Check if it's published in a journal
        has_journal = bool(metadata.get('publication_info'))
        
        # Get year
        earliest_date = metadata.get('earliest_date', '')
        year = earliest_date[:4] if earliest_date else ''
        
        entry_text, is_published, pub_year = format_publication(record)
        
        if is_published:
            published.append((entry_text, pub_year))
        else:
            preprints.append((entry_text, year))
    
    return preprints, published

def generate_cv_publications_section(citation_summary, preprints, published):
    """Generate the publications section of the CV."""
    section = "## Publications\n\n"
    
    # Add citation metrics
    section += "### Citation Metrics (from InspireHEP)\n"
    section += f"- **Total Papers:** {citation_summary['papers']}"
    if citation_summary['citeable'] > 0:
        section += f" ({citation_summary['citeable']} citeable"
    if citation_summary['published'] > 0:
        section += f", {citation_summary['published']} published)"
    else:
        section += ")"
    section += "\n"
    section += f"- **Total Citations:** {citation_summary['citations']}\n"
    section += f"- **h-index:** {citation_summary['h_index']}\n"
    section += "\n"
    
    # Add preprints
    if preprints:
        section += "### Recent Preprints\n\n"
        for i, (entry, year) in enumerate(preprints[:10], 1):  # Limit to 10 most recent
            section += f"{i}. {entry}\n"
    
    # Add published papers
    if published:
        section += "### Peer-Reviewed Publications\n\n"
        # Sort by year, most recent first
        published_sorted = sorted(published, key=lambda x: x[1], reverse=True)
        for i, (entry, year) in enumerate(published_sorted, len(preprints) + 1):
            section += f"{i}. {entry}\n"
    
    section += f"\n*Last updated from InspireHEP: {datetime.now().strftime('%B %d, %Y')}*\n"
    
    return section

def update_cv_file(new_publications_section):
    """Update the CV file with new publications section."""
    print(f"Reading {CV_FILE}...")
    
    try:
        with open(CV_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: {CV_FILE} not found!")
        return False
    
    # Find and replace the publications section
    # Look for "## Publications" and replace until next "##" or end
    import re
    
    # Pattern to match from ## Publications to the next ## (or end of file)
    pattern = r'(## Publications.*?)(?=\n## |\Z)'
    
    if re.search(pattern, content, re.DOTALL):
        new_content = re.sub(pattern, new_publications_section.rstrip(), content, flags=re.DOTALL)
        
        print(f"Updating {CV_FILE}...")
        with open(CV_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("✓ CV updated successfully!")
        return True
    else:
        print("Warning: Could not find '## Publications' section in CV.")
        print("Appending publications to end of file...")
        with open(CV_FILE, 'a', encoding='utf-8') as f:
            f.write("\n\n---\n\n")
            f.write(new_publications_section)
        print("✓ Publications section added to CV!")
        return True

def update_research_markdown_files(lit_data):
    """Update citation counts in research markdown files."""
    import os
    import glob
    
    print("Updating research markdown files...")
    
    # Get all markdown files in work/markdown directory
    markdown_dir = "work/markdown"
    if not os.path.exists(markdown_dir):
        print(f"Warning: {markdown_dir} not found, skipping markdown updates")
        return False
    
    markdown_files = glob.glob(os.path.join(markdown_dir, "*.md"))
    
    # Build a mapping of DOI/arXiv to citation counts
    citation_map = {}
    records = lit_data.get('hits', {}).get('hits', [])
    
    for record in records:
        metadata = record.get('metadata', {})
        citations = get_citation_count(record)
        
        # Map by DOI
        dois = metadata.get('dois', [])
        for doi_obj in dois:
            doi = doi_obj.get('value', '')
            if doi:
                citation_map[doi] = citations
        
        # Map by arXiv
        arxiv_eprints = metadata.get('arxiv_eprints', [])
        for arxiv_obj in arxiv_eprints:
            arxiv = arxiv_obj.get('value', '')
            if arxiv:
                citation_map[arxiv] = citations
    
    updated_files = 0
    
    # Update each markdown file
    for md_file in markdown_files:
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Update citations for each DOI/arXiv found
            import re
            for identifier, citations in citation_map.items():
                # Simple approach: find **Citations:** <number> after the identifier
                # and replace the number
                
                if '/' in identifier:  # It's a DOI
                    # Find the DOI, then look ahead for **Citations:** pattern
                    # Use a simpler approach with re.escape for the identifier
                    search_pattern = re.escape(identifier)
                    # Find citation pattern after this DOI (within next 200 chars)
                    full_pattern = rf'{search_pattern}(?:(?!###).{{0,200}}?)\*\*Citations:\*\*\s*\d+'
                    
                    def replacer(match):
                        matched_text = match.group(0)
                        return re.sub(r'(\*\*Citations:\*\*\s*)\d+', rf'\g<1>{citations}', matched_text)
                    
                    content = re.sub(full_pattern, replacer, content, flags=re.DOTALL)
                    
                else:  # It's an arXiv ID
                    search_pattern = re.escape(identifier)
                    full_pattern = rf'{search_pattern}(?:(?!###).{{0,200}}?)\*\*Citations:\*\*\s*\d+'
                    
                    def replacer(match):
                        matched_text = match.group(0)
                        return re.sub(r'(\*\*Citations:\*\*\s*)\d+', rf'\g<1>{citations}', matched_text)
                    
                    content = re.sub(full_pattern, replacer, content, flags=re.DOTALL)
            
            # Write back if changed
            if content != original_content:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files += 1
                print(f"  ✓ Updated {os.path.basename(md_file)}")
        
        except Exception as e:
            print(f"  Warning: Could not update {os.path.basename(md_file)}: {e}")
            continue
    
    if updated_files > 0:
        print(f"✓ Updated {updated_files} markdown files with current citations")
        return True
    else:
        print("✓ No citation updates needed in markdown files")
        return True

def update_index_file(citation_summary):
    """Update the index.html file with citation metrics."""
    print(f"Reading {INDEX_FILE}...")
    
    try:
        with open(INDEX_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: {INDEX_FILE} not found!")
        return False
    
    # Calculate average citations
    avg_citations = round(citation_summary['citations'] / citation_summary['papers']) if citation_summary['papers'] > 0 else 0
    
    # Update metrics in HTML
    import re
    
    # Update publications count
    content = re.sub(
        r'<p class="counter" id="publications-count">\d+</p>',
        f'<p class="counter" id="publications-count">{citation_summary["papers"]}</p>',
        content
    )
    
    # Update citations count
    content = re.sub(
        r'<p class="counter" id="citations-count">\d+</p>',
        f'<p class="counter" id="citations-count">{citation_summary["citations"]}</p>',
        content
    )
    
    # Update h-index
    content = re.sub(
        r'<p class="counter" id="h-index">\d+</p>',
        f'<p class="counter" id="h-index">{citation_summary["h_index"]}</p>',
        content
    )
    
    # Update average citations
    content = re.sub(
        r'<p class="counter" id="avg-citations">\d+</p>',
        f'<p class="counter" id="avg-citations">{avg_citations}</p>',
        content
    )
    
    # Update last updated date
    current_date = datetime.now().strftime('%b %Y')
    content = re.sub(
        r'<span id="metrics-updated">[^<]+</span>',
        f'<span id="metrics-updated">{current_date}</span>',
        content
    )
    
    print(f"Updating {INDEX_FILE}...")
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ Index.html updated successfully!")
    return True

def main():
    """Main function."""
    print("=" * 60)
    print("InspireHEP CV Updater")
    print("=" * 60)
    
    # Fetch data
    author_data, lit_data = fetch_inspire_data()
    
    if not author_data or not lit_data:
        print("Error: Could not fetch data from InspireHEP")
        return 1
    
    # Extract metrics
    citation_summary = extract_citation_summary(author_data)
    print(f"✓ Found {citation_summary['papers']} papers")
    print(f"✓ Total citations: {citation_summary['citations']}")
    print(f"✓ h-index: {citation_summary['h_index']}")
    
    # Categorize publications
    preprints, published = categorize_publications(lit_data)
    print(f"✓ {len(preprints)} preprints, {len(published)} published papers")
    
    # Generate new publications section
    new_section = generate_cv_publications_section(citation_summary, preprints, published)
    
    # Update CV file
    cv_updated = update_cv_file(new_section)
    
    # Update research markdown files with current citations
    markdown_updated = update_research_markdown_files(lit_data)
    
    # Update index.html with metrics
    index_updated = update_index_file(citation_summary)
    
    if cv_updated and index_updated:
        print("\n" + "=" * 60)
        print("SUCCESS! Your CV and homepage have been updated!")
        print("=" * 60)
        return 0
    else:
        print("\nError updating files")
        return 1

if __name__ == "__main__":
    exit(main())
