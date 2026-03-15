import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import "./lib/playlist-card.js";
import "./lib/playlist-arrows.js";
import "./lib/playlist-indicator.js";

export class PlaylistProject extends DDDSuper(LitElement) {

  static get tag() {
    return "playlist-project";
  }

  constructor() {
    super();
    this.title = "";
    this.index = 0;
    this.total = 0;
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      index: { type: Number },
      total: { type: Number },
    };
  }

  indexChanged(e) {
    this.index = e.detail.index;
    // every time index changes, update which card is visible
    this.updateActiveCard();
  }

  // this runs once when the component first loads
  firstUpdated() {
    this.total = this.querySelectorAll("playlist-card").length;
    // show the first card right away
    this.updateActiveCard();
  }

  // this method hides all cards then shows only the active one
  updateActiveCard() {
    // get all the playlist-card elements
    const cards = this.querySelectorAll("playlist-card");
    
    // loop through every card
    cards.forEach((card, i) => {
      if (i === this.index) {
        // if this card matches the current index, show it
        card.style.display = "block";
      } else {
        // otherwise hide it
        card.style.display = "none";
      }
    });
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        color: var(--ddd-theme-default-slateMaxLight);
        background-color: var(--ddd-theme-default-nittanyNavy);
        font-family: var(--ddd-font-family-sans);
      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }

      .playlist-title {
        font-size: var(--ddd-font-size-xl);
        font-weight: var(--ddd-font-weight-bold);
        margin-bottom: var(--ddd-spacing-4);
        text-align: center;
      }

      .playlist-stage {
        overflow: hidden;
        width: 100%;
        position: relative;
      }

      .playlist-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--ddd-spacing-4);
      }
    `];
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="playlist-title">${this.title}</div>

        <div class="playlist-stage">
          <slot></slot>
        </div>

        <div class="playlist-controls">
          <playlist-arrows
            index="${this.index}"
            total="${this.total}"
            @play-list-index-changed="${this.indexChanged}">
          </playlist-arrows>

          <playlist-indicator
            index="${this.index}"
            total="${this.total}"
            @play-list-index-changed="${this.indexChanged}">
          </playlist-indicator>
        </div>
      </div>
    `;
  }

}

globalThis.customElements.define(PlaylistProject.tag, PlaylistProject);