class Editor {
    private text: string
    private curX: number
    private curY: number
    private selectionWidth: number

    setText(text: string) {
        this.text = text
    }

    setCursors(x: number, y: number) {
        this.curX = x
        this.curY = y
    }

    setSelectionWidth(width: number) {
        this.selectionWidth = width
    }

    createSnapshot(): Snapshot {
        return new Snapshot(this, this.text, this.curX, this.curY, this.selectionWidth)
    }
}

class Snapshot {
    constructor(private editor: Editor, private text: string, private curX: number, private curY: number, private selectionWidth: number) {}

    restore() {
        this.editor.setText(this.text)
        this.editor.setCursors(this.curX, this.curY)
        this.editor.setSelectionWidth(this.selectionWidth)
    }
}

class Command {
    private backup: Snapshot
    constructor(private editor: Editor) {}

    makeBackup() {
        this.backup = this.editor.createSnapshot()
    }

    undo() {
        this.backup.restore()
    }
}

export {}
