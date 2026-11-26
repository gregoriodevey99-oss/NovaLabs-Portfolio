"use strict";

const navigation = document.querySelector('#main-navigation');
const menuToggle = document.querySelector('.menu-toggle');
const compactNavigation = window.matchMedia('(max-width: 900px)');

if (navigation && menuToggle) {
  menuToggle.hidden = false;
  document.documentElement.classList.add('navigation-ready');
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    const label = menuToggle.querySelector('.menu-label');
    if (label) label.textContent = 'Menú';
  };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    const label = menuToggle.querySelector('.menu-label');
    if (label) label.textContent = open ? 'Cerrar' : 'Menú';
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-container')) closeMenu();
  });
  compactNavigation.addEventListener('change', closeMenu);
}
