const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

const modifiedText = `Last Modification: ${document.lastModified}`;
document.getElementById("lastModified").textContent = modifiedText;

const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');


navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

import { places } from '../data/places.mjs';

const container = document.getElementById('cards-container');
places.forEach(place => {
    const card = document.createElement('div');
    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="images/${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
    `;
    container.appendChild(card);
});

const visitMessage = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
} else {
    const diff = now - lastVisit;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) {
        visitMessage.textContent = 'Back so soon! Awesome!';
    } else if (days === 1) {
        visitMessage.textContent = 'You last visited 1 day ago.';
    } else {
        visitMessage.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem('lastVisit', now);