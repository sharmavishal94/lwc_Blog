import { LightningElement, createElement } from 'lwc';
import Navigo from 'navigo';
export default class App extends LightningElement {
    router = new Navigo(location.origin, false);

    menuItems = [
        { title: 'Home', location: '/home' },
        { title: 'UI', location: '/ui' }
    ];
    constructor() {
        super(); // Why is super called ?
        this.router.on({
            '/home': async () => {
                const { default: ViewHome } = await import('view/home');
                this.setPage('view-home', ViewHome);
            },
            '/ui': async () => {
                const { default: ViewUi } = await import('view/ui');
                this.setPage('view-ui', ViewUi);
            }
        });

        const navigateToDefault = () => {
            this.router.navigate('/');
        };
        this.router.notFound(navigateToDefault);
        this.router.on(navigateToDefault);
    }
    handleMenuItemClick(evt) {
        evt.preventDefault();
        let { href } = evt.target;
        this.router.navigate(href);
        // this.template.querySelector('base-menu').close();
    }
    renderedCallback() {
        // Resolve the current view only after the container has rendered
        if (!this.isRendered) {
            this.isRendered = true;
            this.router.resolve();
        }
    }
    setPage(tagName, component, props = {}) {
        // when a route is called, create the related component and insert it into the DOM in whatever container you want

        const el = createElement(tagName, {
            is: component,
            fallback: false
        });

        Object.assign(el, props);

        // Remove previous components from the container if necessary
        const container = this.template.querySelector('.container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(el);
    }
}
