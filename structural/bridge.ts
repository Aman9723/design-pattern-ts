class RemoteControl {
    constructor(protected device: Device) {}

    togglePower() {
        if (this.device.isEnabled()) {
            this.device.disable()
        } else {
            this.device.enable()
        }
    }

    volumeDown() {
        this.device.setVolume(this.device.getVolume() - 10)
    }

    volumeUp() {
        this.device.setVolume(this.device.getVolume() + 10)
    }

    channelDown() {
        this.device.setChannel(this.device.getChannel() - 1)
    }

    channelUp() {
        this.device.setChannel(this.device.getChannel() + 1)
    }
}

class AdvancedRemoteControl extends RemoteControl {
    mute() {
        this.device.setVolume(0)
    }
}

interface Device {
    isEnabled(): boolean
    enable(): void
    disable(): void
    getVolume(): number
    setVolume(volume: number): void
    getChannel(): number
    setChannel(channel: number): void
}

class TV implements Device {
    private on = false
    private volume = 30
    private channel = 1

    isEnabled() {
        return this.on
    }

    enable() {
        this.on = true
    }

    disable() {
        this.on = false
    }

    getVolume() {
        return this.volume
    }

    setVolume(volume: number) {
        this.volume = volume
    }

    getChannel() {
        return this.channel
    }

    setChannel(channel: number) {
        this.channel = channel
    }
}

class Radio implements Device {
    private on = false
    private volume = 30
    private channel = 1

    isEnabled() {
        return this.on
    }

    enable() {
        this.on = true
    }

    disable() {
        this.on = false
    }

    getVolume() {
        return this.volume
    }

    setVolume(volume: number) {
        this.volume = volume
    }

    getChannel() {
        return this.channel
    }

    setChannel(channel: number) {
        this.channel = channel
    }
}

const tv = new TV()
const remote = new RemoteControl(tv)
remote.togglePower()

const radio = new Radio()
const advancedRemote = new AdvancedRemoteControl(radio)

export {}
