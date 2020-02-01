import * as PIXI from 'pixi.js';
import fragmentShader from './MouseMask/shader.frag'
import vertexShader from './MouseMask/shader.vert'

class MouseMask{
    constructor(element) {
        this.pixi = new PIXI.Application();
        element.appendChild(this.pixi.view);

        this.layout = this.layout.bind(this);
        this.onResize = this.onResize.bind(this);
        this.build();
        this.layout();
    }

    build(){
        this.background = PIXI.Sprite.from('/static/images/texture1.jpg');
        this.background.width = this.pixi.screen.width;
        this.background.height = this.pixi.screen.height;

        this.backgroundFilter = new PIXI.Filter(vertexShader, fragmentShader, {
            mousePosition: 0.0
        });

        this.background.filters = [this.backgroundFilter];

        this.pixi.stage.addChild(this.background);
    }

    layout(){
        this.pixi.resizeTo = window;
    }

    onResize(){
        this.layout();
    }

    attach(){
        window.addEventListener('resize', this.onResize);
    }
}

export { MouseMask };