const modal = document.getElementById('accessibleModal'),
  openModalBtn = document.getElementById('openModalBtn'),
  closeModalBtn = document.getElementById('closeModalBtn'),
  overlay = document.getElementById('overlay'),
  burgerBtn = document.getElementById('burger-btn');

openModalBtn.addEventListener('click', () => {
  modal.classList.add('active');
  overlay.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  closeModalBtn.focus();
});

closeModalBtn.addEventListener('click', closeAccessibleModal);
overlay.addEventListener('click', closeAccessibleModal);

function closeAccessibleModal() {
  modal.classList.remove('active');
  overlay.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  openModalBtn.focus();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeAccessibleModal();
  }
});

const dialog = document.getElementById('accessibleDialog'),
  openDialogBtn = document.getElementById('openDialogBtn'),
  closeDialogBtn = document.getElementById('closeDialogBtn');

openDialogBtn.addEventListener('click', () => {
  dialog.showModal();
  closeDialogBtn.focus();
});

closeDialogBtn.addEventListener('click', () => {
  dialog.close();
  openDialogBtn.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dialog.open) {
    dialog.close();
    openDialogBtn.focus();
  }
});

const menuButton = document.getElementById('menuButton'),
  menuContent = document.getElementById('menuContent');

menuButton.addEventListener('click', () => {
  burgerBtn.style.rotate = '90deg';
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

  menuButton.setAttribute('aria-expanded', !isExpanded);
  menuContent.classList.toggle('open', !isExpanded);
  menuContent.setAttribute('aria-hidden', isExpanded);

  if (isExpanded) burgerBtn.style.rotate = '180deg';
});
