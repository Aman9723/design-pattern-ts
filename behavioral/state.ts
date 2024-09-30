class AudioPlayer {
    state: State
    UI: UserInterface
    volume: number
    playing: boolean
    currentSong: number
    playlist: string[]

    constructor() {
        this.state = new Readystate(this)
        this.UI = new UserInterface()
        this.UI.lockButton.onClick(this.clickLock)
        this.UI.playButton.onClick(this.clickPlay)
        this.UI.nextButton.onClick(this.clickNext)
        this.UI.previousButton.onClick(this.clickPrevious)
    }

    changeState(state: State) {
        this.state = state
    }

    clickLock() {
        this.state.clickLock()
    }

    clickPlay() {
        this.state.clickPlay()
    }

    clickNext() {
        this.state.clickNext()
    }

    clickPrevious() {
        this.state.clickPrevious()
    }

    startPlayback() {
        console.log('Start playback')
    }

    stopPlayback() {
        console.log('Stop playback')
    }

    nextSong() {
        console.log('Next song')
    }

    previousSong() {
        console.log('Previous song')
    }

    fastForward(time: number) {
        console.log(`Fast forward ${time} seconds`)
    }

    rewind(time: number) {
        console.log(`Rewind ${time} seconds`)
    }
}

abstract class State {
    constructor(protected player: AudioPlayer) {}

    abstract clickLock(): void
    abstract clickPlay(): void
    abstract clickNext(): void
    abstract clickPrevious(): void
}

class LockedState extends State {
    clickLock() {
        if (this.player.playing) {
            this.player.changeState(new PlayingState(this.player))
        } else {
            this.player.changeState(new Readystate(this.player))
        }
    }

    clickPlay() {
        console.log('Locked')
    }

    clickNext() {
        console.log('Locked')
    }

    clickPrevious() {
        console.log('Locked')
    }
}

class Readystate extends State {
    clickLock() {
        this.player.changeState(new LockedState(this.player))
    }

    clickPlay() {
        this.player.startPlayback()
        this.player.changeState(new PlayingState(this.player))
    }

    clickNext() {
        this.player.nextSong()
    }

    clickPrevious() {
        this.player.previousSong()
    }
}

class PlayingState extends State {
    clickLock() {
        this.player.changeState(new LockedState(this.player))
    }

    clickPlay() {
        this.player.stopPlayback()
        this.player.changeState(new Readystate(this.player))
    }

    clickNext() {
        this.player.nextSong()
    }

    clickPrevious() {
        this.player.previousSong()
    }
}

class UserInterface {
    lockButton: Button
    playButton: Button
    nextButton: Button
    previousButton: Button

    constructor() {
        this.lockButton = new Button()
        this.playButton = new Button()
        this.nextButton = new Button()
        this.previousButton = new Button()
    }
}

class Button {
    onClick(callback: () => void) {
        callback()
    }
}
