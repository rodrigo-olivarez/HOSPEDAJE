const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');


navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

let allMembers = [];

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        allMembers = members;

        const savedFilter = localStorage.getItem('activeFilter') || 'All';
        setActiveButton(savedFilter);
        displayMembers(filterMembers(savedFilter));

    } catch (error) {
        document.getElementById('members-grid').innerHTML = `<p>Sorry, we could not load the museums. Please try again later.</p>`;
        console.error('Error loading members:', error);
    }
}

function filterMembers(filter) {
    if (filter === 'ALL') return allMembers;
    if (filter === 'Free') return allMembers.filter(m => m.free);
    if (filter === 'Family') return allMembers.filter(m => m.childrenArea);
    return allMembers.filter(m => m.type === filter);
}

function displayMembers(members) {
    const membersGrid = document.getElementById('members-grid');

    membersGrid.innerHTML = members.map(member => `
        <div class="member-card" data-id="${member.id}" tabindex="0" role="button" aria-label="View details for ${member.name}">
            <img src="${member.image}" alt="${member.name}" width="300" height="140" loading="lazy">
            <div class="member-card-info">
                <h3>${member.name}</h3>
                <span class="card-type">${member.type}</span>
                <span class="card-price">${member.price === 0 ? 'Gratis' : `$${member.price} MXN`}</span>
                <span class="card-schedule">${member.schedule}</span>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const member = allMembers.find(m => m.id === id);
            openModal(member);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') card.click();
        });
    });
}

function setActiveButton(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === filter);
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.textContent.trim();
        setActiveButton(filter);
        displayMembers(filterMembers(filter));
        localStorage.setItem('activeFilter', filter);
    });
});

function openModal(member) {
    const modal = document.getElementById('member-modal');
    const closeModal = document.getElementById('close-modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <img src="${member.image}" alt="${member.name}" width="500" height="200" loading="lazy">
        <span class="modal-type">${member.type}</span>
        <h2>${member.name}</h2>
        <p>${member.description}</p>
        <div class="modal-meta">
            <a href="${member.address}" target= "blank">📍[CLICK AQUI] Como llegar</a>
            <span>🕐 ${member.schedule}</span>
            <span> Gasto Aprox. por persona ${member.price === 0 ? 'Entrada gratis' : `$${member.price} MXN`}</span>
            <span>👨‍👩‍👧 Area infantil: ${member.childrenArea ? 'SI' : 'NO'}</span>
        </div>
    `;

    modal.showModal();
    closeModal.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('member-modal').close();
    }
});

loadMembers();