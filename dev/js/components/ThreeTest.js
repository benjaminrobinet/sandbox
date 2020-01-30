import {Renderer} from "./ThreeTest/Renderer";

class ThreeTest{
    constructor(element) {
        this.renderer = new Renderer();
        element.appendChild(this.renderer.renderer.domElement);

        this.renderer.attach();
    }
}

export {ThreeTest};