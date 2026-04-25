const menu = document.querySelector('.menu');


menu.addEventListener('click', (event) => {
    const link = event.target.closest('.menu__link');
    if (!link) return;
    
    const parentItem = link.closest('.menu__item');
    const submenu = parentItem.querySelector('.menu_sub');
    
    if (submenu) {
        event.preventDefault();
        closeAllSubmenus();
        submenu.classList.add('menu_active');
    }
});

function closeAllSubmenus() {
    document.querySelectorAll('.menu_sub').forEach(submenu => {
        submenu.classList.remove('menu_active');
    });
}