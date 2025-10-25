class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        .logo {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1.25rem;
          color: #1e40af;
          text-decoration: none;
        }
        .logo-icon {
          margin-right: 0.5rem;
          color: #3b82f6;
        }
        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        a:hover {
          color: #1e40af;
        }
        .nav-icon {
          width: 18px;
          height: 18px;
        }
        @media (max-width: 768px) {
          nav {
            padding: 1rem;
          }
          ul {
            gap: 1rem;
          }
        }
      </style>
      <nav>
        <a href="/" class="logo">
          <i data-feather="upload-cloud" class="logo-icon"></i>
          FileFlow
        </a>
        <ul>
          <li><a href="/"><i data-feather="home" class="nav-icon"></i> Home</a></li>
          <li><a href="/uploads.html"><i data-feather="hard-drive" class="nav-icon"></i> My Uploads</a></li>
          <li><a href="/profile.html"><i data-feather="user" class="nav-icon"></i> Profile</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);