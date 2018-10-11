import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `tm-aspect-div`
 * Polymer web component container that maintains an aspect ratio.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TmAspectDivCSS extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    width:100%;
                    height:100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: solid blue 2px;
                }
            
                .cell {
                    box-sizing: border-box;
                    border: solid green 2px;
                    width: 100%;
                }
            
                .wrapper-with-intrinsic-ratio {
                    position: relative;
                    padding-bottom: 20%;
                    height: 0;
                    border: solid red 2px;
                    box-sizing: border-box;
                }
            
                .element-to-stretch {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: teal;
                }
                
                .aspectRatioSizer {
                  display: grid;
                }
                .aspectRatioSizer > * {
                  grid-area: 1 / 1 / 2 / 2;
                }
                .content {
                    width: 200px;
                    height: 200px;
                    border: solid teal 2px;
                }
            </style>
            <div class="aspectRatioSizer">
              <!--<svg viewBox="0 0 7 2"></svg>-->
              <div>
                <div class="content">Content goes here</div>
              </div>
            </div>
            <!--<div class="cell">-->
              <!--<div class="wrapper-with-intrinsic-ratio">-->
                <!--<div class="element-to-stretch">-->
                  <!--<slot></slot>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
        `;
    }

    static get properties() {
        return {};
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('tm-aspect-div-css', TmAspectDivCSS);
