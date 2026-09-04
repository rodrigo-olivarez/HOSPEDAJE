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


document.getElementById('timestamp').value = new Date().toLocaleString();

const modalBtns = document.querySelectorAll('.modal-btn');
const closeBtns = document.querySelectorAll('.close-modal');

modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        document.getElementById(modalId).showModal();
    })
})

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('dialog').close();
    })
})