// public/js/menu.js o src/assets/js/menu.js

export const initMenu = () => {
  const toggleButton = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');
  const body = document.body;

  if (!toggleButton || !menu) return;

  // Abrir / cerrar menú
  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('navbar__menu--open');
    body.classList.toggle('no-scroll');
  });

  // Crear redes sociales flotantes si no existen aún
  const existingFloating = document.querySelector('.navbar__social-floating');
  const socialContent = document.querySelector('.navbar__social');

  if (!existingFloating && socialContent) {
    const socialFloating = document.createElement('div');
    socialFloating.className = 'navbar__social-floating';
    socialFloating.innerHTML = socialContent.innerHTML;
    body.appendChild(socialFloating);

    // Mostrar redes flotantes al hacer scroll en móviles
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 1024) {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        socialFloating.classList.toggle('navbar__social-floating--visible', scrollY > 100);
      }
    });
  }

  // Cerrar el menú si se hace clic fuera
  document.addEventListener('click', (e) => {
    const clickedInsideMenu = menu.contains(e.target);
    const clickedToggleButton = toggleButton.contains(e.target);

    if (!clickedInsideMenu && !clickedToggleButton) {
      menu.classList.remove('navbar__menu--open');
      body.classList.remove('no-scroll');
    }
  });
};
