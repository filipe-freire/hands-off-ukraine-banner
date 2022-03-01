const template = document.createElement("template");
template.innerHTML = `
   <style>
      *,
      ::before,
      ::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .hands-off-ukraine-banner {
        padding: 1rem;
        background-color: #6495ed;
        box-shadow: rgba(0, 0, 0, 0.6) 0px 2px 4px;
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
      }

      .hands-off-ukraine-banner .text-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-basis: 100%;
        margin-left: 1rem;
        flex-wrap: wrap;
      }

      .hands-off-ukraine-link {
        display: block;
        color: yellow;
        font-weight: 600;
        margin-top: 0.8rem;
      }

      .close-banner-button {
        margin-left: 1rem;
        padding: 1rem;
        background: transparent;
        border: none;
        cursor: pointer;
      }

      .close-icon {
        max-height: 1.3rem;
      }

      .hidden{
        transition: all 200ms ease-in-out;
        opacity: 0;
      }

      .support-ukraine-link{
          color: yellow;
          font-weight: 600;
      }

      @media screen and (min-width: 830px) {
        .hands-off-ukraine-banner {
          padding: 0.5rem 1rem;
        }

        .hands-off-ukraine-banner .text-wrapper {
          flex-direction: row;
          align-items: center;
          text-align: center;
        }

        .hands-off-ukraine-link {
          margin-top: auto;
          color: yellow;
        }
      }
    </style>

    <div class="hands-off-ukraine-banner">
        <div class="text-wrapper">
          <p>We support the people of Ukraine against Russia's full-scale invasion. <a aria-label="Ways to support Ukraine against Russian invasion." target="_blank"
            rel="noreferrer"
            class="support-ukraine-link"
            href="https://linktr.ee/razomforukraine">Here's how you can too.</a></p>
          <a
            target="_blank"
            rel="noreferrer"
            class="hands-off-ukraine-link"
            href="https://mobile.twitter.com/hashtag/handsoffukraine"
            >#handsOffUkraine</a
          >
        </div>
        <button class="close-banner-button" aria-label="close banner">
          <img alt="" class="close-icon" src="./close-icon.svg" />
        </button>
      </div>
`;

class handsOffUkraineBanner extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("keyup", (e) => {
      if (
        e.path[0].classList[0] === "close-banner-button" &&
        (e.code === "Space" || e.code === "Enter")
      ) {
        this.shadowRoot
          .querySelector(".hands-off-ukraine-banner")
          .classList.add("hidden");
        setTimeout(() => {
          this.remove();
        }, 200);
      }
    });
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".close-icon")
      .addEventListener("click", (e) => {
        console.log(e);
        this.shadowRoot
          .querySelector(".hands-off-ukraine-banner")
          .classList.add("hidden");
      });
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector(".close-icon").removeEventListener();
  }
}

window.customElements.define("hands-off-ukraine-banner", handsOffUkraineBanner);
