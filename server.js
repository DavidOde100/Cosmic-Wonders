// server.js — small Express server for the "Cosmic Wonders" demo
// Friendly notes: this keeps a tiny in-memory list of wonders and
// serves static assets plus a couple of simple API endpoints.

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// A small in-memory list of Cosmic Wonders — this acts as our mock "database"
const wondersDB = [
	{
		id: "crab-nebula",
		name: "Crab Nebula",
		type: "Supernova Remnant",
		distance: "6,500 light-years",
		description: "A six-light-year-wide expanding remnant of a star's supernova explosion. Japanese and Chinese astronomers recorded this violent event nearly 1,000 years ago in 1054 AD.",
		image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80"
	},
	{
		id: "andromeda",
		name: "Andromeda Galaxy",
		type: "Spiral Galaxy",
		distance: "2.5 million light-years",
		description: "The nearest major galaxy to the Milky Way. It is on a collision course with our galaxy and will merge with it in about 4.5 billion years.",
		image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=600&q=80"
	},
	{
		id: "pillars-of-creation",
		name: "Pillars of Creation",
		type: "Emission Nebula",
		distance: "7,000 light-years",
		description: "Elephant trunks of interstellar gas and dust in the Eagle Nebula. These towering structures are active star-forming regions.",
		image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&q=80"
	},
	{
		id: "sagittarius-a",
		name: "Sagittarius A*",
		type: "Supermassive Black Hole",
		distance: "26,670 light-years",
		description: "The supermassive black hole at the galactic center of the Milky Way. It contains the mass of about 4.3 million Suns packed into a relatively tiny volume.",
		image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&q=80"
	},
	{
		id: "trappist-1",
		name: "TRAPPIST-1 System",
		type: "Planetary System",
		distance: "39 light-years",
		description: "An ultra-cool red dwarf star surrounded by seven temperate terrestrial planets, making it one of the most promising locations to search for extraterrestrial life.",
		image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&q=80"
	}
];

// Serve static files from the `public` folder (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// API: return the full list of wonders
app.get('/api/wonders', (req, res) => {
	res.json(wondersDB);
});

// API: return a single wonder by its `id`
app.get('/api/wonders/:id', (req, res) => {
	const wonder = wondersDB.find(w => w.id === req.params.id);
	if (wonder) {
		res.json(wonder);
	} else {
		res.status(404).json({ error: "Wonder not found" });
	}
});

// Route: serve the homepage
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route: show a wonder's detail page (e.g., `/wonders/crab-nebula`).
// If the wonder isn't found, send our friendly 404 page.
app.get('/wonders/:id', (req, res) => {
	const wonder = wondersDB.find(w => w.id === req.params.id);
	if (!wonder) {
		return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
	}
	// We serve a generic detail template; the client will fetch the data.
	res.sendFile(path.join(__dirname, 'public', 'detail.html'));
});

// Catch-all 404 handler: send our friendly 404 page for unknown routes
app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
