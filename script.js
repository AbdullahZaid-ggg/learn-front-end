function navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    // Show target section
    const target = document.getElementById('section-' + sectionId);
    if (target) target.classList.add('active');

    // Update nav active state
    document.querySelectorAll('.sidebar-nav a').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.sidebar-nav a[data-section="${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Nav link clicks
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            if (section) navigateTo(section);
        });
    });

    // Keyboard navigation (left/right arrow keys)
    document.addEventListener('keydown', (e) => {
        const sections = ['home', 'html', 'css', 'js', 'api'];
        const activeLink = document.querySelector('.sidebar-nav a.active');
        if (!activeLink) return;
        const currentSection = activeLink.getAttribute('data-section');
        const idx = sections.indexOf(currentSection);
        if (idx === -1) return;

        if (e.key === 'ArrowRight' && idx > 0) {
            navigateTo(sections[idx - 1]);
        } else if (e.key === 'ArrowLeft' && idx < sections.length - 1) {
            navigateTo(sections[idx + 1]);
        }
    });

    // Show the home section by default
    navigateTo('home');
});