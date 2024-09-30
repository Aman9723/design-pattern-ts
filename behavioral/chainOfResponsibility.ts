interface ComponentWithContextualHelp {
    showHelp(): void
}

abstract class Component implements ComponentWithContextualHelp {
    tooltipText: string
    constructor(protected container: string) {}

    showHelp(): void {
        if (this.tooltipText) {
            console.log(`Tooltip: ${this.tooltipText}`)
        } else {
            console.log(`No help available`)
        }
    }
}

abstract class Container extends Component {
    protected children: Component[] = []

    addChild(child: Component): void {
        this.children.push(child)
    }
}

class Button extends Component {}

class Panel extends Container {
    modalHelpText: string

    showHelp(): void {
        if (this.modalHelpText) {
            console.log(`Modal: ${this.modalHelpText}`)
        } else {
            this.showHelp()
        }
    }
}

class Dialog extends Container {
    wikiPageURL: string

    showHelp(): void {
        if (this.wikiPageURL) {
            console.log(`Wiki: ${this.wikiPageURL}`)
        } else {
            this.showHelp()
        }
    }
}

class Application {
    createUI(): void {
        const dialog = new Dialog('Main Dialog')
        dialog.wikiPageURL = 'http://...'
        const panel = new Panel('Panel')
        panel.modalHelpText = 'This is a panel'
        const ok = new Button('OK')
        ok.tooltipText = 'This is an OK button'
        const cancel = new Button('Cancel')
        cancel.tooltipText = 'This is a Cancel button'

        panel.addChild(ok)
        panel.addChild(cancel)
        dialog.addChild(panel)

        dialog.showHelp()
    }
}

export {}
