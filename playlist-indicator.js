import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlaylistIndicator extends DDDSuper(LitElement) {

  static get tag() {
    return "playlist-indicator";
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
        justify-content: center;
        align-items: center;
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
      }

      /* each dot */
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--ddd-theme-default-beaverBlue);
        opacity: 0.3;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }

      /* the active dot is fully visible */
      .dot.active {
        opacity: 1;
      }

      /* slightly more visible on hover */
      .dot:hover {
        opacity: 0.6;
      }
    `];
  }

  // this runs when a dot is clicked
  // i is the index number of the dot that was clicked
  _dotClick(i) {
    const event = new CustomEvent("play-list-index-changed", {
      composed: true,  // cross shadow DOM boundaries
      bubbles: true,   // bubble up to parent
      detail: {
        index: i  // send which dot was clicked
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <!-- Array.from creates an array of length "total" -->
      <!-- we loop through it to create one dot per card -->
      ${Array.from({ length: this.total }, (_, i) => html`
        <div
          class="dot ${i === this.index ? 'active' : ''}"
          @click="${() => this._dotClick(i)}">
        </div>
      `)}
    `;
  }

}

globalThis.customElements.define(PlaylistIndicator.tag, PlaylistIndicator);