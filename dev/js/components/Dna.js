import {
    BufferAttribute,
    BufferGeometry,
    Color,
    MeshBasicMaterial,
    PerspectiveCamera, Points, PointsMaterial,
    Scene,
    WebGLRenderer
} from "three";

import vertex from './Dna/shader.vert';
import fragment from './Dna/shader.frag';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class Dna {
    constructor(element) {
        this.renderer = new WebGLRenderer();
        element.appendChild(this.renderer.domElement);
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(50, 16 / 9, 0.1, 1000);
        this.camera.position.z = 1;

        new OrbitControls(this.camera, this.renderer.domElement);

        this.count = 100;
        this.radius = 1;
        this.separation = 5;
        this.positions = new Float32Array(this.count * 3);
        this.geometry = new BufferGeometry();
        this.geometry.setAttribute('position', new BufferAttribute(this.positions, 3));

        this.material = new PointsMaterial({
            color: new Color(0xFFFFFF)
        });

        this.particles = new Points(this.geometry, this.material);
        this.scene.add(this.particles);

        this.layout = this.layout.bind(this);
        this.render = this.render.bind(this);

        this.layout();
        this.build();
        this.render();
    }

    build() {
        let i = 0, j = 0;
        for (let ix = 0; ix < this.count; ix++) {

            for (let iy = 0; iy < this.count; iy++) {

                this.positions[i] = ix + this.radius * Math.cos(j * 2);
                this.positions[i + 1] = 0; // y
                this.positions[i + 2] = iy + this.radius * Math.sin(j * -2);

                i += 3;
                j++;

            }

        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render);
    }

    layout() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    attach() {
        window.addEventListener('resize', this.layout);
    }
}

export {Dna};