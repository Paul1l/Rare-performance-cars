const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');
const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
const form = document.querySelector('[data-form]');
const message = document.querySelector('[data-message]');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 10);
});

menuButton?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open');
  menuButton.classList.toggle('is-active', Boolean(isOpen));
  menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
  document.body.classList.toggle('nav-open', Boolean(isOpen));
});

nav?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove('is-open');
    menuButton?.classList.remove('is-active');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    cards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    message.textContent = 'Please complete all required fields with valid information.';
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  message.textContent = `Thank you, ${name}. Your demo request is ready to be connected to a backend.`;
  form.reset();
});
