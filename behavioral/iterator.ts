interface SocialNetwork {
    createFriendsIterator(profileId: string): ProfileIterator
    createCoworkersIterator(profileId: string): ProfileIterator
}

interface Profile {
    id: string
    email: string
}

class Facebook implements SocialNetwork {
    createFriendsIterator(profileId: string) {
        return new FacebookIterator(this, profileId, 'friends')
    }

    createCoworkersIterator(profileId: string) {
        return new FacebookIterator(this, profileId, 'coworkers')
    }

    socialGraphRequest(profileId: string, type: string): Profile[] {
        // Send request to Facebook API
        return []
    }
}

interface ProfileIterator {
    getNext(): Profile | undefined
    hasMore(): boolean
}

class FacebookIterator implements ProfileIterator {
    private facebook: Facebook
    private profileId: string
    private type: string
    private currentPosition: number = 0
    private cache: Profile[] = []

    constructor(facebook: Facebook, profileId: string, type: string) {
        this.facebook = facebook
        this.profileId = profileId
        this.type = type
    }

    private lazyInit() {
        if (this.cache.length === 0) {
            this.cache = this.facebook.socialGraphRequest(this.profileId, this.type)
        }
    }

    getNext() {
        if (!this.hasMore()) {
            const result = this.cache[this.currentPosition]
            this.currentPosition++
            return result
        }
    }

    hasMore() {
        this.lazyInit()
        return this.currentPosition < this.cache.length
    }
}

class SocialSpammer {
    send(iterator: ProfileIterator, message: string) {
        while (iterator.hasMore()) {
            const profile = iterator.getNext()
            console.log(`Send message to ${profile?.email}: ${message}`)
        }
    }
}

class Application {
    network: SocialNetwork
    spammer: SocialSpammer

    config() {
        this.network = new Facebook()
        this.spammer = new SocialSpammer()
    }

    sendSpamToFriends(profileId: string, message: string) {
        const iterator = this.network.createFriendsIterator(profileId)
        this.spammer.send(iterator, message)
    }

    sendSpamToCoworkers(profileId: string, message: string) {
        const iterator = this.network.createCoworkersIterator(profileId)
        this.spammer.send(iterator, message)
    }
}

export {}
