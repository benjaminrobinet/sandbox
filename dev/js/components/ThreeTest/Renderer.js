import {Mesh, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, TextureLoader, WebGLRenderer} from "three";
import fragmentShader from './shader.frag';
import vertexShader from './shader.vert';
import * as dat from 'dat.gui';

class Renderer {
    constructor(element) {
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(50, 16 /9, 0.1, 1000);
        this.camera.position.z = 10;

        this.texture1 = new TextureLoader().load('/static/images/texture1.jpg');
        this.texture2 = new TextureLoader().load('/static/images/texture2.jpg');

        this.material = this.createMaterial();
        this.geometry = this.createGeometry();

        this.mesh = new Mesh();
        this.mesh.material = this.material;
        this.mesh.geometry = this.geometry;

        this.scene.add(this.mesh);

        this.gui = new dat.GUI({
            name: 'debug',
            width: 400
        });

        this.debug();

        this.onResize = this.onResize.bind(this);
        this.render = this.render.bind(this);
        this.onResize();
    }

    createMaterial() {
        let material = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                gradientScale: {value: 0.1},
                progress: {value: 0},
                texture1: {type: 't', value: null},
                texture2: {type: 't', value: null},
                time: {value: 0}
            }
        });

        material.uniforms.texture1.value = this.texture1;
        material.uniforms.texture2.value = this.texture2;
        return material;
    }

    createGeometry(){
        return new PlaneGeometry(10, 10, 1, 1)
    }

    debug(){
        let folder = this.gui.addFolder('Debug');
        folder.add(this.material.uniforms.progress, 'value').name('progress').step(0.001).min(0).max(1);
        folder.add(this.material.uniforms.gradientScale, 'value').name('gradient scale').step(0.001).min(0).max(1);
        folder.open();
    }

    render(){
        this.material.uniforms.time.value = performance.now();
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render);
    }

    onResize(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    attach(){
        window.addEventListener('resize', this.onResize);
        window.requestAnimationFrame(this.render);
    }

    detach(){

    }
}

export {Renderer};