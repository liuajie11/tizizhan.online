const pages = [
  ["index.html", "首页", "home"],
  ["ladder.html", "梯子推荐", "ladder"],
  ["airports.html", "机场推荐", "airports"],
  ["reviews.html", "梯子评测", "reviews"],
  ["speed-test.html", "梯子测速", "speed"],
  ["tutorials.html", "客户端教程", "tutorials"],
  ["ai-tools.html", "AI工具", "ai"],
  ["alerts.html", "跑路预警", "alerts"],
  ["apple-id.html", "科学上网", "apple"],
  ["about.html", "关于", "about"]
];

const icon = (name) => {
  const icons = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };
  return icons[name] || '';
};

const brandLogo = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.8 20.5L9.2 3.5M17.2 20.5L14.8 3.5"/><path d="M8.7 8H15.3"/><path d="M8 12.5H16"/><path d="M7.3 17H16.7"/></svg>`;

function renderHeader() {
  const current = document.body.dataset.page || 'home';
  const links = pages.map(([href, label, key]) => `<a class="nav-link${current === key ? ' active' : ''}" href="${href}">${label}</a>`).join('');
  const header = document.querySelector('[data-site-header]');
  if (!header) return;
  header.innerHTML = `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="index.html" aria-label="梯子站首页">
          <span class="brand-mark" aria-hidden="true">${brandLogo}</span>
          <span>梯子站 <small>TIZI ZHAN</small></span>
        </a>
        <nav class="nav-links" id="mainNav" aria-label="主导航">${links}</nav>
        <div class="nav-actions">
          <a class="icon-button" href="airports.html" aria-label="打开收录目录">${icon('box')}</a>
          <a class="icon-button" href="about.html#bookmark" aria-label="收藏本站">${icon('heart')}</a>
          <button class="menu-button" type="button" aria-label="展开导航" aria-expanded="false" aria-controls="mainNav">${icon('menu')}</button>
        </div>
      </div>
    </header>`;
}

function renderFooter() {
  const footer = document.querySelector('[data-site-footer]');
  if (!footer) return;
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand footer-brand" href="index.html"><span class="brand-mark" aria-hidden="true">${brandLogo}</span><span>梯子站</span></a>
            <p class="footer-copy">面向中文用户的网络工具信息索引，提供选购思路、客观评测、客户端教程与风险提醒。本站不提供网络接入服务。</p>
          </div>
          <div class="footer-column"><h3>选购参考</h3><a href="ladder.html">梯子推荐</a><a href="airports.html">机场推荐</a><a href="reviews.html">深度评测</a></div>
          <div class="footer-column"><h3>实用内容</h3><a href="speed-test.html">测速方法</a><a href="tutorials.html">客户端教程</a><a href="ai-tools.html">AI 工具箱</a></div>
          <div class="footer-column"><h3>站点信息</h3><a href="alerts.html">跑路预警</a><a href="apple-id.html">科学上网</a><a href="about.html">关于本站</a></div>
        </div>
        <div class="footer-bottom"><span>© <span data-year></span> 梯子站 · 内容仅供信息参考</span><span>请遵守所在地法律法规，并妥善保护账号与隐私。</span></div>
      </div>
    </footer>`;
}

function initInteractions() {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav-links');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    if (nav?.classList.contains('open') && !event.target.closest('.nav-wrap')) {
      nav.classList.remove('open');
      menu?.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => button.closest('.faq-item').classList.toggle('open'));
  });

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.closest('[data-filter-group]');
      group?.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-category]').forEach((item) => {
        item.hidden = filter !== 'all' && item.dataset.category !== filter;
      });
    });
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        const previous = button.textContent;
        button.textContent = '已复制';
        setTimeout(() => button.textContent = previous, 1400);
      } catch {
        button.textContent = '请手动复制';
      }
    });
  });
}

renderHeader();
renderFooter();
document.querySelectorAll('[data-year]').forEach((el) => el.textContent = new Date().getFullYear());
initInteractions();
