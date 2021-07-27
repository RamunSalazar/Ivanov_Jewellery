'use strict';

const headerWrapElement = document.querySelector('.header__wrap');
const headerMobileMenuElement = headerWrapElement.querySelector('.header__mobile-menu');
const headerButtonToggleElement = headerWrapElement.querySelector('.header__button-toggle');
const bodyElement = document.querySelector('body');
const sliderShopButtonLeftElement = document.querySelector('.slider-shop__button-left');
const sliderShopButtonRightElement = document.querySelector('.slider-shop__button-right');
const sliderShopJewelleryListElement = document.querySelector('.slider-shop__jewellery-list');
const faqListItemElement = document.querySelectorAll('.faq__list-item');

const DESKTOP_WINDOW_SIZE_MAX = 1366;
const DESKTOP_WINDOW_SIZE_MIN = 1024;
const TABLET_WINDOW_SIZE = 768;
const DESKTOP_CONTAINER_WIDTH_MAX = 1200;
const DESKTOP_CONTAINER_WIDTH_MIN = 988;
const TABLET_CONTAINER_WIDTH = 708;
let index = 0;
let count = 0;
let flag;
let linkCount = 0;
let sliderShopPaginationLinks = document.querySelectorAll('.slider-shop__link');

headerWrapElement.classList.remove('header__wrap--nojs');
headerWrapElement.classList.remove('header__wrap--open');
headerMobileMenuElement.classList.remove('header__mobile-menu--open');
sliderShopButtonLeftElement.setAttribute('disabled', 'disabled');
for (let i = 0; i < faqListItemElement.length; i++) {
  faqListItemElement[i].classList.remove('faq__list-item--nojs');
}

headerButtonToggleElement.addEventListener('click', () => {
  if (headerWrapElement.classList.contains('header__wrap--open')) {
    headerWrapElement.classList.remove('header__wrap--open');
    headerMobileMenuElement.classList.remove('header__mobile-menu--open')
    bodyElement.classList.remove('body--menu');
  } else {
    headerWrapElement.classList.add('header__wrap--open');
    headerMobileMenuElement.classList.add('header__mobile-menu--open')
    headerWrapElement.classList.add('header__wrap--menu');
    bodyElement.classList.add('body--menu');
  }
});

const linkCounter = () => {
  if (window.innerWidth >= DESKTOP_WINDOW_SIZE_MIN) {
    sliderShopPaginationLinks = document.querySelectorAll('.slider-shop__link--desktop')
    linkCount = sliderShopPaginationLinks.length;
  } else if (window.innerWidth < DESKTOP_WINDOW_SIZE_MIN) {
    sliderShopPaginationLinks = document.querySelectorAll('.slider-shop__link--tablet')
    linkCount = sliderShopPaginationLinks.length;
  }
  return linkCount;
}

linkCount = linkCounter();

window.addEventListener('resize', () => {
  linkCount = linkCounter();
  count = 0;
  sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
  sliderShopButtonLeftElement.setAttribute('disabled', 'disabled');
  sliderShopButtonRightElement.removeAttribute('disabled');
  for (let i = 0; i < linkCount; i++) { 
    if (sliderShopPaginationLinks[i].classList.contains('slider-shop__link--active')) {
      sliderShopPaginationLinks[i].classList.remove('slider-shop__link--active');
    }
  }
  sliderShopPaginationLinks[0].classList.add('slider-shop__link--active');
});

sliderShopButtonRightElement.addEventListener('click', () => {
  if (window.innerWidth >= DESKTOP_WINDOW_SIZE_MAX) {
    count -= DESKTOP_CONTAINER_WIDTH_MAX;
    sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
  } else if (window.innerWidth < DESKTOP_WINDOW_SIZE_MAX && window.innerWidth >= DESKTOP_WINDOW_SIZE_MIN) {
    count -= DESKTOP_CONTAINER_WIDTH_MIN;
    sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
  } else if (window.innerWidth < DESKTOP_WINDOW_SIZE_MIN && window.innerWidth >= TABLET_WINDOW_SIZE) {
    count -= TABLET_CONTAINER_WIDTH;
    sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
  }
  for (let i = 0; i < linkCount; i++) {
    if (sliderShopPaginationLinks[i].classList.contains('slider-shop__link--active')) {
      sliderShopPaginationLinks[i].classList.remove('slider-shop__link--active');
      index = i;
    } 
  }
  sliderShopPaginationLinks[++index].classList.add('slider-shop__link--active');
  flag = index;
  if (index === linkCount - 1) {
    sliderShopButtonRightElement.setAttribute('disabled', 'disabled');
  }
  if (sliderShopPaginationLinks[index].classList.contains('slider-shop__link--active') && index !== 0) {
    sliderShopButtonLeftElement.removeAttribute('disabled');
  }
});

sliderShopButtonLeftElement.addEventListener('click', () => {
  if (window.innerWidth > DESKTOP_WINDOW_SIZE_MAX) {
    count += DESKTOP_CONTAINER_WIDTH_MAX;
    sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
  } else if (window.innerWidth < DESKTOP_WINDOW_SIZE_MAX && window.innerWidth >= DESKTOP_WINDOW_SIZE_MIN) {
    count += DESKTOP_CONTAINER_WIDTH_MIN;
    sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
  } else if (window.innerWidth < DESKTOP_WINDOW_SIZE_MIN && window.innerWidth >= TABLET_WINDOW_SIZE) {
    count += TABLET_CONTAINER_WIDTH;
    sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
  }
  for (let i = 0; i < linkCount; i++) {
    if (sliderShopPaginationLinks[i].classList.contains('slider-shop__link--active')) {
      sliderShopPaginationLinks[i].classList.remove('slider-shop__link--active');
      index = i;
    } 
  }
  sliderShopPaginationLinks[--index].classList.add('slider-shop__link--active');
  flag = index;
  if (index === 0) {
    sliderShopButtonLeftElement.setAttribute('disabled', 'disabled');
  }
  if (sliderShopPaginationLinks[index].classList.contains('slider-shop__link--active') && index !== linkCount - 1) {
    sliderShopButtonRightElement.removeAttribute('disabled');
  }
});

for (let i = 0; i < linkCount; i++) { 
  if (flag === 0) {
    sliderShopButtonLeftElement.setAttribute('disabled', 'disabled');
    sliderShopButtonRightElement.removeAttribute('disabled');
  } else if (flag === linkCount - 1) {
    sliderShopButtonRightElement.setAttribute('disabled', 'disabled');
    sliderShopButtonLeftElement.removeAttribute('disabled');
  } 
  sliderShopPaginationLinks[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    sliderShopButtonRightElement.removeAttribute('disabled');
    sliderShopButtonLeftElement.removeAttribute('disabled');
    for (let i = 0; i < linkCount; i++) { 
      if (sliderShopPaginationLinks[i].classList.contains('slider-shop__link--active')) {
        sliderShopPaginationLinks[i].classList.remove('slider-shop__link--active');
      }
    }
    sliderShopPaginationLinks[i].classList.add('slider-shop__link--active');
    flag = i;
    if (window.innerWidth > DESKTOP_WINDOW_SIZE_MAX) {
      count = parseInt(-DESKTOP_CONTAINER_WIDTH_MAX * i);
      sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
    } else if (window.innerWidth < DESKTOP_WINDOW_SIZE_MAX && window.innerWidth >= DESKTOP_WINDOW_SIZE_MIN) {
      count = parseInt(-DESKTOP_CONTAINER_WIDTH_MIN * i);
      sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
    } else if (window.innerWidth < DESKTOP_WINDOW_SIZE_MIN && window.innerWidth >= TABLET_WINDOW_SIZE) {
      count = parseInt(-TABLET_CONTAINER_WIDTH * i);
      sliderShopJewelleryListElement.style.transform = 'translateX(' + count + 'px)';
    }
    if (flag === 0) {
      sliderShopButtonLeftElement.setAttribute('disabled', 'disabled');
      sliderShopButtonRightElement.removeAttribute('disabled');
    } else if (flag === linkCount - 1) {
      sliderShopButtonRightElement.setAttribute('disabled', 'disabled');
      sliderShopButtonLeftElement.removeAttribute('disabled');
    } 
  });
}

for (let i = 0; i < faqListItemElement.length; i++) {
  faqListItemElement[i].addEventListener('click', () => {
    if (faqListItemElement[i].classList.contains('faq__list-item--open')) {
      faqListItemElement[i].classList.remove('faq__list-item--open');
    } else {
      for (let j = 0; j < faqListItemElement.length; j++) {
        faqListItemElement[j].classList.remove('faq__list-item--open');
      }
      faqListItemElement[i].classList.add('faq__list-item--open');
    };
  });
}