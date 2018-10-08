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
                  //padding: 20px;
                  //border: solid red 1px;
                  /*width:100%;*/
                  /*height:calc(100vh - 70px);*/
                }
                
                div.centered {
                    padding: var(--tm-aspect-div-padding, 0);
                    box-sizing: border-box;
                    display: inline-block;
                    border: var(--tm-aspect-div-border, none);
                    //transition: width 1s, height 1s, margin-left 1s, margin-top 1s;
                }
            </style>
            <div id="aaa" class="centered"  style$="[[style]]">
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

    ready() {
        super.ready();
        const self = this;
        var resizeTimeout;
        setTimeout(function () {
            self._resize(self.clientWidth, self.clientHeight);
        }, 200);

        const refreshInterval = Math.round(1000 / self.fps);

        window.onresize = function (e) {
            if (!resizeTimeout) {
                self._resize(self.clientWidth, self.clientHeight);
                resizeTimeout = setTimeout(function () {
                    resizeTimeout = null;
                    self._resize(self.clientWidth, self.clientHeight);
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
