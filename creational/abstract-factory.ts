interface Button {
    paint(): void
}

interface Checkbox {
    paint(): void
}

class WinButton implements Button {
    paint() {
        console.log('Rendering Windows button')
    }
}

class MacButton implements Button {
    paint() {
        console.log('Rendering Mac button')
    }
}

class WinCheckbox implements Checkbox {
    paint() {
        console.log('Rendering Windows checkbox')
    }
}

class MacCheckbox implements Checkbox {
    paint() {
        console.log('Rendering Mac checkbox')
    }
}

interface GUIFactory {
    createButton(): Button
    createCheckbox(): Checkbox
}

class WinFactory implements GUIFactory {
    createButton() {
        return new WinButton()
    }

    createCheckbox() {
        return new WinCheckbox()
    }
}

class MacFactory implements GUIFactory {
    createButton() {
        return new MacButton()
    }

    createCheckbox() {
        return new MacCheckbox()
    }
}

class Application {
    private button!: Button

    constructor(private factory: GUIFactory) {}

    createUI() {
        this.button = this.factory.createButton()
    }

    paint() {
        this.button.paint()
    }
}

export {}
