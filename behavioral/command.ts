abstract class Command {
    protected backup: string

    constructor(protected app: Application, protected editor: Editor) {}

    saveBackup() {
        this.backup = this.editor.text
    }

    undo() {
        this.editor.text = this.backup
    }

    abstract execute(): boolean
}

class CopyCommand extends Command {
    execute() {
        this.app.clipboard = this.editor.getSelection()
        return false
    }
}

class CutCommand extends Command {
    execute() {
        this.saveBackup()
        this.app.clipboard = this.editor.getSelection()
        this.editor.deleteSelection()
        return true
    }
}

class PasteCommand extends Command {
    execute() {
        this.saveBackup()
        this.editor.replaceSelection(this.app.clipboard)
        return true
    }
}

class UndoCommand extends Command {
    execute() {
        this.app.undo()
        return false
    }
}

class CommandHistory {
    private history: Command[] = []

    push(command: Command) {
        this.history.push(command)
    }

    pop() {
        return this.history.pop()
    }
}

class Editor {
    text: string

    getSelection() {
        return this.text
    }

    deleteSelection() {
        this.text = ''
    }

    replaceSelection(text: string) {
        this.text = text
    }
}

class Application {
    clipboard: string
    editors: Editor[]
    activeEditor: Editor
    history: CommandHistory

    createUI() {
        const copy = function () {
            this.executeCommand(new CopyCommand(this, this.activeEditor))
        }

        const cut = function () {
            this.executeCommand(new CutCommand(this, this.activeEditor))
        }

        const paste = function () {
            this.executeCommand(new PasteCommand(this, this.activeEditor))
        }

        const undo = function () {
            this.executeCommand(new UndoCommand(this, this.activeEditor))
        }
    }

    executeCommand(command: Command) {
        if (command.execute()) {
            this.history.push(command)
        }
    }

    undo() {
        const command = this.history.pop()
        if (command) {
            command.undo()
        }
    }
}

export {}
