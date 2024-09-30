interface ThirdPartyYouTubeLib {
    listVideos(): string
    getVideoInfo(id: string): string
    downloadVideo(id: string): string
}

class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
    listVideos(): string {
        return 'listVideos'
    }

    getVideoInfo(id: string): string {
        return 'getVideoInfo'
    }

    downloadVideo(id: string): string {
        return 'downloadVideo'
    }
}

class CachedYouTubeClass implements ThirdPartyYouTubeLib {
    private listCache: string
    private videoCache: string
    needReset: boolean

    constructor(private service: ThirdPartyYouTubeClass) {}

    listVideos(): string {
        if (!this.listCache || this.needReset) {
            this.listCache = this.service.listVideos()
        }
        return this.listCache
    }

    getVideoInfo(id: string): string {
        if (!this.videoCache || this.needReset) {
            this.videoCache = this.service.getVideoInfo(id)
        }
        return this.videoCache
    }

    downloadVideo(id: string): string {
        return this.service.downloadVideo(id)
    }
}

class YoutubeManager {
    constructor(private service: ThirdPartyYouTubeLib) {}

    renderVideoPage(id: string): string {
        return this.service.getVideoInfo(id)
    }

    renderListPanel(): string {
        return this.service.listVideos()
    }

    reactOnUserInput(): void {
        this.service.downloadVideo('someId')
    }
}

class Application {
    init(): void {
        const aYouTubeService = new ThirdPartyYouTubeClass()
        const aYouTubeProxy = new CachedYouTubeClass(aYouTubeService)
        const manager = new YoutubeManager(aYouTubeProxy)
        manager.reactOnUserInput()
    }
}

export {}
