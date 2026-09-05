const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');


navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

async function loadSpotlights() {
    const response = await fetch(`data/members.json`);
    const members = await response.json();
    const eligible = members.filter(member => member.membership >= 2);

    eligible.sort(() => Math.random() - 0.5);

    const spotlights = eligible.slice(0, 3);
    const container = document.getElementById(`spotlights-cont`)
    container.innerHTML = ``;

    spotlights.forEach(member => {
        const card = document.createElement(`div`);
        card.classList.add(`spotlight-card`);
        card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div>
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                </div>
            `;
        container.appendChild(card);
    })
}

loadSpotlights();