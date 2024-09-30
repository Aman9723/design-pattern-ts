class EventManager {
    private listeners: { [key: string]: Listener[] } = {}

    subscribe(eventType: string, listener: Listener) {
        this.listeners[eventType] = this.listeners[eventType] || []
        this.listeners[eventType].push(listener)
    }

    unsubscribe(eventType: string, listener: Listener) {
        this.listeners[eventType] = this.listeners[eventType].filter(l => l !== listener)
    }

    notify(eventType: string, data: any) {
        for (const listener of this.listeners[eventType]) {
            listener.update(data)
        }
    }
}

class Editor {
    public events: EventManager
    private file: Ffile

    constructor() {
        this.events = new EventManager()
    }

    openFile(path: string) {
        this.file = new Ffile(path)
        this.events.notify('file-opened', this.file.name)
    }

    saveFile() {
        this.file.write()
        this.events.notify('file-saved', this.file.name)
    }
}

class Ffile {
    public name: string

    constructor(name: string) {
        this.name = name
    }

    write() {
        console.log(`Writing file ${this.name}`)
    }
}

interface Listener {
    update(filename: string): void
}

class LoggingListener implements Listener {
    private log: Ffile
    private message: string

    constructor(log__filename: string, message: string) {
        this.log = new Ffile(log__filename)
        this.message = message
    }

    update(filename: string): void {
        this.log.write()
        console.log(`${this.message}: ${filename}`)
    }
}

class EmailAlertsListener implements Listener {
    constructor(private email: string, private message: string) {}

    update(filename: string): void {
        console.log(`Email sent to ${this.email}: File ${filename} has been changed`)
    }
}
