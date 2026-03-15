import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlaylistArrows extends DDDSuper(LitElement) {

  static get tag() {
    return "playlist-arrows";
  }

  constructor() {
    super();
    // index is which card we are currently on
    this.index = 0;
    // total is how many cards there are
    this.total = 0;
  }

  static get properties() {
    return {
      ...super.properties,
      index: { type: Number },
      total: { type: Number },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      /* the circle button style */
      button {
        background-color: white;
        border: var(--ddd-border-sm);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: var(--ddd-font-size-m);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ddd-theme-default-beaverBlue);
        box-shadow: var(--ddd-boxShadow-sm);
      }

      /* slightly darker when you hover over it */
      button:hover {
        background-color: var(--ddd-theme-accent);
      }

      /* faded out when the button is disabled */
      button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    `];
  }

  // this runs when the left arrow is clicked
  _prevClick() {
    // create a custom event and send the new index up to the parent
    const event = new CustomEvent("play-list-index-changed", {
      composed: true,  // allows event to cross shadow DOM boundaries
      bubbles: true,   // allows event to bubble up to parent
      detail: {
        index: this.index - 1  // go back one
      },
    });
    this.dispatchEvent(event);
  }

  // this runs when the right arrow is clicked
  _nextClick() {
    const event = new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: {
        index: this.index + 1  // go forward one
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <!-- left arrow button -->
      <!-- ?disabled checks if we are on the first card, if so disable it -->
      <button
        @click="${this._prevClick}"
        ?disabled="${this.index <= 0}">
        &#8249;
      </button>

      <!-- right arrow button -->
      <!-- ?disabled checks if we are on the last card, if so disable it -->
      <button
        @click="${this._nextClick}"
        ?disabled="${this.index >= this.total - 1}">
        &#8250;
      </button>
    `;
  }

}

globalThis.customElements.define(PlaylistArrows.tag, PlaylistArrows);