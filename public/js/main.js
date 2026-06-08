// Fetch all wonders and render them as cards on the homepage
document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('wonders-grid');

    try {
        const response = await fetch('/api/wonders');
        const wonders = await response.json();
        
        grid.innerHTML = ''; // Clear loading text
        
        wonders.forEach(wonder => {
            // Create a PicoCSS card for each item
            const card = document.createElement('article');
            card.className = 'wonder-card';
            card.innerHTML = `
                <img src="${wonder.image}" alt="${wonder.name}">
                <div class="card-content">
                    <h3>${wonder.name}</h3>
                    <p><strong>Type:</strong> ${wonder.type}</p>
                    <a href="/wonders/${wonder.id}" role="button" class="outline">Explore</a>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = '<p class="error">Failed to load the universe. Check your connection.</p>';
    }
});