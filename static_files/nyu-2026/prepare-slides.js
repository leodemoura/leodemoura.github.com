// Use the title markup from aws-june-2026, keeping the text in Slides.lean.
function prepareSlides() {
  document.querySelectorAll('.slides > section').forEach(section => {
    if (section.dataset.backgroundColor || section.dataset.state === 'title' ||
        section.dataset.state === 'full-figure' || section.querySelector('.slide-header')) return;
    const header = document.createElement('div');
    header.className = 'slide-header';
    const logo = document.createElement('img');
    logo.src = 'lean-logo.png';
    logo.alt = 'Lean';
    header.append(logo);
    // Navigation strip: data-state tokens "nav-<area>-<when>", e.g. nav-trust-since.
    // A single "pillar-<area>" token marks one of the three fact slides before the
    // focus diagram with its area label.
    const tokens = (section.dataset.state || '').split(/\s+/);
    const nav = tokens.find(t => t.startsWith('nav-'));
    const pillar = tokens.find(t => t.startsWith('pillar-'));
    const names = { trust: 'Trust', scal: 'Scalability', und: 'Understanding' };
    if (nav) {
      const [, area, when] = nav.split('-');
      const strip = document.createElement('div');
      strip.className = 'nav-strip';
      const phase = document.createElement('span');
      phase.className = 'nav-phase';
      phase.textContent = when === 'next' ? 'Next' : 'Recent';
      strip.append(phase);
      for (const key of ['trust', 'scal', 'und']) {
        const item = document.createElement('span');
        item.className = 'nav-item' + (key === area ? ' active' : '');
        item.textContent = names[key];
        strip.append(item);
      }
      header.append(strip);
    } else if (pillar) {
      const area = pillar.split('-')[1];
      const strip = document.createElement('div');
      strip.className = 'nav-strip';
      const item = document.createElement('span');
      item.className = 'nav-item active';
      item.textContent = names[area];
      strip.append(item);
      header.append(strip);
    }
    section.prepend(header);
  });

  const slide = document.querySelector('section[data-state="title"]');
  if (!slide) return;
  const heading = slide.querySelector('h2');
  const event = slide.querySelector('.event');
  const paragraphs = Array.from(slide.querySelectorAll(':scope > p:not(.event)'));

  const top = document.createElement('div');
  top.className = 'top-area';
  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.src = 'lean-logo-large.png';
  logo.alt = 'Lean Logo';
  top.append(logo);

  const band = document.createElement('div');
  band.className = 'blue-band';
  const title = document.createElement('h1');
  title.append(...heading.childNodes);
  const meta = document.createElement('div');
  meta.className = 'meta';
  paragraphs.forEach((paragraph, index) => {
    if (index) meta.append(document.createElement('br'));
    meta.append(...paragraph.childNodes);
  });
  const date = document.createElement('div');
  date.className = 'date';
  date.append(...event.childNodes);
  band.append(title, meta, date);
  slide.classList.add('title-slide');
  slide.replaceChildren(top, band);

  // The closing slide uses the same two-part layout as the source decks.
  const last = Array.from(document.querySelectorAll('.slides > section')).at(-1);
  if (last?.querySelector('h2')?.textContent.trim() === 'Thank You') {
    const closingTop = top.cloneNode(true);
    const closingBand = document.createElement('div');
    closingBand.className = 'blue-band';
    const closingTitle = document.createElement('h1');
    closingTitle.textContent = 'Thank You';
    const closingMeta = document.createElement('div');
    closingMeta.className = 'meta';
    const name = document.createElement('strong');
    name.textContent = 'Leo de Moura';
    closingMeta.append(name, document.createElement('br'));
    ['https://lean-lang.org', 'https://leanprover.zulipchat.com', 'https://leodemoura.github.io'].forEach(url => {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = url.replace('https://', '');
      link.style.color = '#ffffff';
      closingMeta.append(link, document.createElement('br'));
    });
    closingBand.append(closingTitle, closingMeta, date.cloneNode(true));
    last.removeAttribute('data-background-color');
    last.classList.add('title-slide');
    last.replaceChildren(closingTop, closingBand);
  }
}
