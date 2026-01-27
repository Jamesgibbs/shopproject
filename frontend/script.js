document.querySelectorAll('.menu-link').forEach((link) => {
    link.addEventListener('click', () => {
        const parent = link.parentElement
        parent.classList.toggle('open')

        const submenu = parent.querySelector('.submenu')
        if (submenu) {
            submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex'
        }
    })
})
