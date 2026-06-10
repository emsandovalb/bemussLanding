const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const modal = document.querySelector('#project-modal');
const modalCloseButton = document.querySelector('.project-modal__close');
const projectCards = document.querySelectorAll('.project-card[data-project]');
const whatsappPhone = '50671797507';

const whatsappMessages = {
  bamos: `Hola Bemuss.\n\nMe interesa conocer más sobre Bamos al Fut y las opciones para implementar una plataforma deportiva.`,
  booking: `Hola Bemuss.\n\nMe interesa conocer más sobre la Plataforma de Reservas White Label para mi negocio.`,
  bot: `Hola Bemuss.\n\nQuiero información sobre el sistema de pedidos por WhatsApp.`,
  enterprise: `Hola Bemuss.\n\nMe interesa conocer más sobre los sistemas empresariales y soluciones a medida.`
};

function buildWhatsAppHref(message) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

const projectModalContent = {
  bamos: {
    title: 'Bamos al Fut',
    category: 'SaaS Deportivo',
    description: 'Plataforma de reservas para canchas deportivas con pagos en línea, gestión operativa y una experiencia simple para usuarios y administradores.',
    solution: 'Diseñamos un flujo de reserva rápido, visual y confiable para que el usuario encuentre disponibilidad, pague y confirme en pocos pasos. Del otro lado, el negocio gana control de ocupación, cobros y operación diaria en un solo panel.',
    image: './assets/projects/bemuss-project-bamos-al-fut.png',
    alt: 'Proyecto Bamos al Fut',
    features: ['Reservas y disponibilidad en tiempo real', 'Cobros integrados y control de pagos', 'Panel operativo para administración del negocio'],
    technologies: ['Flutter', 'Laravel', 'MySQL']
  },
  booking: {
    title: 'Plataforma de Reservas',
    category: 'WHITE LABEL BOOKING',
    description: 'Plataforma white label para negocios que trabajan con citas, reservas o agenda: barberías, salones, clínicas, academias, gimnasios y más.',
    solution: 'Creamos una experiencia de reservas adaptable a múltiples nichos, manteniendo la identidad visual de cada negocio. La plataforma centraliza agenda, servicios, staff, clientes, confirmaciones y seguimiento para reducir fricción operativa.',
    image: './assets/projects/bemuss-project-barberias.png',
    alt: 'Proyecto Plataforma de Reservas',
    features: ['Agenda de citas y reservas', 'Servicios, staff y disponibilidad', 'Experiencia white label por negocio', 'Adaptable a múltiples nichos'],
    technologies: ['Flutter', 'Laravel', 'MySQL']
  },
  bot: {
    title: 'Bot de Pedidos',
    category: 'Automatización',
    description: 'Automatización de pedidos por WhatsApp con carrito, seguimiento y pasarela de pagos para vender con menos intervención manual.',
    solution: 'Orquestamos el pedido desde el chat para que el cliente explore productos, confirme su compra y reciba seguimiento automático. Esto reduce el trabajo manual del equipo y acelera la conversión sin perder contexto.',
    image: './assets/projects/bemuss-project-bot-pedidos.png',
    alt: 'Proyecto Bot de Pedidos',
    features: ['Flujos conversacionales para ventas', 'Carrito y checkout automatizado', 'Integración con pagos y notificaciones'],
    technologies: ['Flutter', 'Laravel', 'MySQL']
  },
  enterprise: {
    title: 'Sistemas Empresariales',
    category: 'Software a medida',
    description: 'Desarrollo de sistemas a medida para facturación, inventarios, reportes y procesos internos que requieren control y escalabilidad.',
    solution: 'Construimos software que se adapta a la operación real del negocio, no al revés. La arquitectura prioriza trazabilidad, automatización de procesos y una base sólida para crecer sin perder control.',
    image: './assets/projects/bemuss-project-enterprise.png',
    alt: 'Proyecto Sistemas Empresariales',
    features: ['Soluciones a medida para operación interna', 'Facturación, inventario y reportes', 'Arquitectura pensada para crecer'],
    technologies: ['Flutter', 'Laravel', 'MySQL']
  }
};

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

function setProjectModalContent(projectKey) {
  if (!modal) return;

  const content = projectModalContent[projectKey] || projectModalContent.bamos;
  const badge = modal.querySelector('.project-modal__badge');
  const title = modal.querySelector('#project-modal-title');
  const description = modal.querySelector('.project-modal__description');
  const solution = modal.querySelector('.project-modal__solution');
  const image = modal.querySelector('.project-modal__image');
  const features = modal.querySelector('.project-modal__features');
  const techs = modal.querySelector('.project-modal__techs');
  const cta = modal.querySelector('.project-modal__cta');

  if (badge) badge.textContent = content.category || 'Proyecto destacado';
  if (title) title.textContent = content.title;
  if (description) description.textContent = content.description;
  if (solution) solution.textContent = content.solution || content.description;
  if (image) {
    image.src = content.image;
    image.alt = content.alt;
  }
  if (features) {
    features.innerHTML = '';
    content.features.forEach((feature) => {
      const item = document.createElement('li');
      item.textContent = feature;
      features.appendChild(item);
    });
  }
  if (techs) {
    techs.innerHTML = '';
    content.technologies.forEach((technology) => {
      const chip = document.createElement('span');
      chip.className = 'project-modal__tech';
      chip.textContent = technology;
      techs.appendChild(chip);
    });
  }
  if (cta) {
    const whatsappMessage = whatsappMessages[projectKey] || whatsappMessages.bamos;
    cta.href = buildWhatsAppHref(whatsappMessage);
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
  }
}

function openProjectModal(projectKey) {
  if (!modal) return;

  setProjectModalContent(projectKey);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    openProjectModal(card.dataset.project);
  });
});

if (modalCloseButton) {
  modalCloseButton.addEventListener('click', closeProjectModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeProjectModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });
