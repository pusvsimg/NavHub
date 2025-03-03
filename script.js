document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('search-input');

    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
    };

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Filter links by search
    function filterLinks() {
        const filterValue = searchInput.value.toLowerCase();
        const links = document.querySelectorAll('.link-card');
        const categories = document.querySelectorAll('.category');
        
        if (filterValue === '') {
            // Show all links and categories
            links.forEach(link => link.style.display = 'flex');
            categories.forEach(category => category.style.display = 'block');
            return;
        }
        
        // Hide/show links based on search
        categories.forEach(category => {
            const categoryTitle = category.querySelector('h2').textContent.toLowerCase();
            const categoryLinks = category.querySelectorAll('.link-card');
            let hasVisibleLinks = false;
            
            categoryLinks.forEach(link => {
                const linkTitle = link.querySelector('span').textContent.toLowerCase();
                const linkDesc = link.querySelector('.link-desc').textContent.toLowerCase();
                
                if (linkTitle.includes(filterValue) || linkDesc.includes(filterValue) || categoryTitle.includes(filterValue)) {
                    link.style.display = 'flex';
                    hasVisibleLinks = true;
                } else {
                    link.style.display = 'none';
                }
            });
            
            // Show/hide category based on if it has any visible links
            category.style.display = hasVisibleLinks ? 'block' : 'none';
        });
    }

    // Add real-time filtering as user types
    searchInput.addEventListener('input', filterLinks);
});