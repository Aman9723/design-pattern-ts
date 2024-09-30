interface Button {
    render(): void
    onClick(cb: Function): void
}

class WindowsButton implements Button {
    render() {
        console.log('Rendering Windows button')
    }

    onClick() {
        console.log('Clicking Windows button')
    }
}

class HTMLButton implements Button {
    render() {
        console.log('Rendering HTML button')
    }

    onClick() {
        console.log('Clicking HTML button')
    }
}

abstract class Dialog {
    abstract createButton(): Button

    render() {
        const okButton = this.createButton()
        okButton.onClick(() => console.log('OK button clicked'))
        okButton.render()
    }
}

class WindowsDialog extends Dialog {
    createButton() {
        return new WindowsButton()
    }
}

class WebDialog extends Dialog {
    createButton() {
        return new HTMLButton()
    }
}

class Application {
    dialog: Dialog

    constructor(config: Record<string, string>) {
        if (config['os'] === 'windows') {
            this.dialog = new WindowsDialog()
        } else if (config['os'] === 'web') {
            this.dialog = new WebDialog()
        } else {
            throw new Error('Invalid OS')
        }

        this.dialog.render()
    }
}

export {}
