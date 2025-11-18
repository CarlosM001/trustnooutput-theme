class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this.close();
      }
    });
  }

  onToggle() {
    if (!this.animations) {
      this.animations = this.content.getAnimations();
    }

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
    this.closeTimeout = null;

    // Add mouseenter/mouseleave listeners to prevent premature closing
    this.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  onMouseEnter() {
    // Clear any pending close timeout when mouse enters
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  onMouseLeave() {
    // Add a delay before closing when mouse leaves
    this.closeTimeout = setTimeout(() => {
      this.close();
      this.closeTimeout = null;
    }, 300); // 300ms delay gives users time to move mouse into dropdown
  }

  onFocusOut() {
    // Add delay to focusout as well to prevent premature closing
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this.closeTimeout = setTimeout(() => {
          this.close();
        }, 200);
      }
    });
  }

  onToggle() {
    if (!this.header) {
      return;
    }
    this.header.preventHide = this.mainDetailsToggle.open;

    if (
      document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== ''
    ) {
      return;
    }
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define('header-menu', HeaderMenu);
