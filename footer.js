class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: #4b5563;
          padding: 2rem;
          text-align: center;
          margin-top: 3rem;
          border-top: 1px solid #e5e7eb;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .footer-links a {
          color: #4b5563;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: #3b82f6;
        }
        .copyright {
          font-size: 0.875rem;
        }
        @media (max-width: 640px) {
          .footer-links {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-links">
            <a href="/about.html">About</a>
            <a href="/privacy.html">Privacy</a>
            <a href="/terms.html">Terms</a>
            <a href="/contact.html">Contact</a>
          </div>
          <p class="copyright">&copy; ${new Date().getFullYear()} FileFlow. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);