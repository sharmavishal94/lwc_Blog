import { LightningElement } from 'lwc';

export default class Ui extends LightningElement {
    constructor() {
        super();
        this.dispatchEvent(
            new CustomEvent('navigate', {
                bubbles: true,
                composed: true,
                detail: {
                    path: `ui`
                }
            })
        );
    }
}
