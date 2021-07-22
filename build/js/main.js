'use strict';
const headerWrapElement = document.querySelector('.header__wrap--tablet');
const headerMobileMenuElement = headerWrapElement.querySelector('.header__mobile-menu');
const headerButtonToggleElement = headerWrapElement.querySelector('.header__button-toggle');

headerWrapElement.classList.remove('header__wrap--nojs');
headerWrapElement.classList.remove('header__wrap--open');
headerMobileMenuElement.classList.remove('header__mobile-menu--open')

headerButtonToggleElement.addEventListener('click', () => {
  if (headerWrapElement.classList.contains('header__wrap--open')) {
    headerWrapElement.classList.remove('header__wrap--open');
    headerMobileMenuElement.classList.remove('header__mobile-menu--open')
  } else {
    headerWrapElement.classList.add('header__wrap--open');
    headerMobileMenuElement.classList.add('header__mobile-menu--open')
  }
});
