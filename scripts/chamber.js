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

async function loadMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
    document.getElementById('members-container').classList.add('grid');
}
loadMembers();

function displayMembers(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
        `;
        container.appendChild(card);
    });
}

document.getElementById('grid-btn').addEventListener('click', () => {
    document.getElementById('members-container').classList.remove('list');
    document.getElementById('members-container').classList.add('grid');
})

document.getElementById('list-btn').addEventListener('click', () => {
    document.getElementById('members-container').classList.remove('grid');
    document.getElementById('members-container').classList.add('list');
})