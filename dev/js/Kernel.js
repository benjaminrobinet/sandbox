import * as Components from './components';

class Kernel{
    constructor() {
        this.componentElement = document.querySelectorAll('[data-component]');
        this.buildComponents();
    }

    buildComponents(){
        this.componentElement.forEach((el) => {
            let componentName = el.dataset.component;
            new Components[componentName](el);
        })
    }
}

export { Kernel };