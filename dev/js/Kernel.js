import * as Components from './components';

class Kernel{
    constructor() {
        this.componentElement = document.querySelectorAll('[data-component]');
        this.components = new Map();
        this.buildComponents();
        this.callStack();
    }

    buildComponents(){
        this.componentElement.forEach((el) => {
            let componentName = el.dataset.component;
            this.components.set(componentName, new Components[componentName](el))
        })
    }

    callStack(){
        ['attach', 'init'].forEach(mth => {
            this.components.forEach(component => {
                if(component[mth]) component[mth]();
            })
        })
    }
}

export { Kernel };