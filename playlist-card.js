import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlaylistCard extends DDDSuper(LitElement) {

  static get tag() {
    return "playlist-card";
  }

  constructor() {
    super();
    this.label = "";
    this.title = "";
    this.color = "";
  }

  static get properties() {
    return {
      ...super.properties,
      label: { type: String },
      title: { type: String },
      color: { type: String },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
      }

      /* white background so team title colors pop */
      .card {
        padding: var(--ddd-spacing-8);
        background-color: white;
        border-radius: var(--ddd-radius-lg);
      }

      /* small uppercase label at top */
      .card-label {
        font-size: var(--ddd-font-size-xs);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-nittanyNavy);
        text-transform: uppercase;
        margin-bottom: var(--ddd-spacing-2);
      }

      /* big team name title in nittany navy */
      .card-title {
        font-size: var(--ddd-font-size-xl);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-nittanyNavy);
        margin: var(--ddd-spacing-0);
        margin-bottom: var(--ddd-spacing-4);
      }

      /* short horizontal line under the title */
      .card-divider {
        border: none;
        border-top: 3px solid var(--ddd-theme-default-nittanyNavy);
        width: 80px;
        margin: var(--ddd-spacing-0);
        margin-bottom: var(--ddd-spacing-4);
      }

      /* fixed height forces scrollbar to appear */
      .card-content {
        font-size: var(--ddd-font-size-s);
        height: 150px;
        overflow-y: scroll;
        color: var(--ddd-theme-default-nittanyNavy);
        padding-right: var(--ddd-spacing-2);
      }
    `];
  }

  render() {
    return html`
      <div class="card">
        <div class="card-label">${this.label}</div>
        <!-- color property overrides title color with team's primary color -->
        <div class="card-title" style="color: ${this.color || 'var(--ddd-theme-default-nittanyNavy)'}">
          ${this.title}
        </div>
        <div class="card-divider"></div>
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

}

globalThis.customElements.define(PlaylistCard.tag, PlaylistCard);