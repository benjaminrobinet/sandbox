import * as PIXI from 'pixi.js';
import fragmentShader from './MouseMask/shader.frag'
import vertexShader from './MouseMask/shader.vert'

class MouseMask {
    constructor(element) {
        this.pixi = new PIXI.Application({antialias: true});
        this.pixi.resizeTo = window;
        this.pixi.stage.interactive = true;

        element.appendChild(this.pixi.view);

        // Inner radius of the circle
        this.radius = 100;

        this.layout = this.layout.bind(this);
        this.onResize = this.onResize.bind(this);
        this.render = this.render.bind(this);
        this.build();
        this.layout();
    }

    build() {
        this.background = PIXI.Sprite.from('/static/images/texture1.jpg');
        this.background.width = this.pixi.screen.width;
        this.background.height = this.pixi.screen.height;
        this.pixi.stage.addChild(this.background);

        this.focus = new PIXI.Container();
        this.focus.filterArea = new PIXI.Rectangle(0, 0, this.pixi.screen.width, this.pixi.screen.height);
        this.focus.filters = [this.focusFilter];
        this.pixi.stage.addChild(this.focus);
    }

    get focusFilter() {
        if (!this._focusFilter) {
            this._focusFilter = new PIXI.Filter(null, fragmentShader, {
                mousePosition: new PIXI.Point(),
                time: 0
            });
        }

        return this._focusFilter;
    }

    render(){
        this.focusFilter.uniforms.mousePosition.copyFrom(this.pixi.renderer.plugins.interaction.mouse.global);
        this.focusFilter.uniforms.time = performance.now();
    }

    layout() {
        this.pixi.resizeTo = window;
        this.focus.position.set(this.pixi.screen.width * 0.5 - this.focus.width * 0.5, this.pixi.screen.height * 0.5 - this.focus.height * 0.5);
    }

    onResize() {
        this.layout();
    }

    attach() {
        this.pixi.ticker.add(this.render);
        window.addEventListener('resize', this.onResize);
    }
}

export {MouseMask};