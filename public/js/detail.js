// Parse the URL to get the ID, then fetch that specific wonder's data
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('detail-container');
    
    // Extract the ID from the URL (e.g., from "/wonders/crab-nebula" gets "crab-nebula")
    const pathParts = window.location.pathname.split('/');
    const wonderId = pathParts[pathParts.length - 1];

    try {
        const response = await fetch(`/api/wonders/${wonderId}`);
        const wonder = await response.json();
        
        // Update document title for SEO/UX
        document.title = `${wonder.name} | Cosmic Wonders`;
        
        // Render the detailed view
        container.innerHTML = `
            <header>
                <h2 style="margin-bottom: 0;">${wonder.name}</h2>
                <small>${wonder.type} • Distance: ${wonder.distance}</small>
            </header>
            <img src="${wonder.image}" alt="${wonder.name}" style="border-radius: 8px; margin: 1rem 0;">
            <p>${wonder.description}</p>
        `;
        container.removeAttribute('aria-busy');
    } catch (error) {
        container.innerHTML = '<p class="error">Data lost in a black hole.</p>';
        container.removeAttribute('aria-busy');
    }
});