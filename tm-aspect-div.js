import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `tm-aspect-div`
 * Polymer web component container that maintains an aspect ratio.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TmAspectDiv extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-block;
                    box-sizing: border-box;
                }
                
                div.centered {
                    display: inline-block;
                    box-sizing: border-box;
                    
                    padding: var(--tm-aspect-div-padding, 0);
                    border: var(--tm-aspect-div-border, none);
                }
            </style>
            <div class="centered" style$="[[style]]">
                <slot></slot>
            </div>
        `;
    }

    static get properties() {
        return {
            aspect: {
                type: Number,
                value: 1
            },
            style: {
                type: String,
                value: 'display:none'
            },
            fps: {
                type: Number,
                value: 10
            },
            duration: {
                type: Number,
                value: 0.5
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        console.log("------- tm-aspect-div has been attached to the DOM.");

        const self = this;
        setTimeout(function () {
            self.resize();
        }, 1000);
    }

    resize() {
        if (!this.hidden && this.clientHeight > 0 && this.clientWidth > 0) {
            this._resize(this.clientWidth, this.clientHeight);
        }
    }
    ready() {
        super.ready();

        const self = this;
        const refreshInterval = Math.round(1000 / self.fps);

        let resizeTimeout;
        window.onresize = function (e) {
            if (!resizeTimeout) {
                self.resize();
                resizeTimeout = setTimeout(function () {
                    resizeTimeout = null;
                    self.resize();
                }, refreshInterval);
            }
        }
    }

    _resize(width, height) {
        console.log('New Size: ', width, height);
        var style;
        if (this.aspect < 1) {
            // portrait
            var childWidth = height * this.aspect;
            var childHeight = height;
            if (childWidth > width) {
                childWidth = width;
                childHeight = childWidth / this.aspect;
                const padding = (height - childHeight) / 2;
                style = `height:${childHeight}px;width:${childWidth}px;margin-top:${padding}px;`;
            } else {
                const padding = (width - childWidth) / 2;
                style = `height:${childHeight}px;width:${childWidth}px;margin-left:${padding}px;`;
            }
        } else {
            // landscape
            var childHeight = width / this.aspect;
            var childWidth = width;
            if (childHeight > height) {
                childHeight = height;
                childWidth = childHeight * this.aspect;
                const padding = (width - childWidth) / 2;
                style = `height:${childHeight}px;width:${childWidth}px;margin-left:${padding}px;`;
            } else {
                const padding = (height - childHeight) / 2;
                style = `height:${childHeight}px;width:100%;margin-top:${padding}px;`;
            }

        }

        const interval = this.duration;
        style = `${style} transition: width ${interval}s, height ${interval}s, margin-left ${interval}s, margin-top ${interval}s;`;
        console.log('STYLE: ', style);
        this.set('style', style);
    }
}

window.customElements.define('tm-aspect-div', TmAspectDiv);
