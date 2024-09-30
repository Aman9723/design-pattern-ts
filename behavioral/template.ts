abstract class GameAI {
    builtStructures: Array<Structure> = []
    closestEnemy(): boolean {
        return true
    }

    turn() {
        this.collectResources()
        this.buildStructures()
        this.buildUnits()
        this.attack()
    }

    collectResources() {
        this.builtStructures.forEach(structures => {
            structures.collect()
        })
    }

    abstract buildStructures(): Array<string>
    abstract buildUnits(): void

    attack() {
        const enemy = this.closestEnemy()
        if (enemy) {
            this.sendWarriors()
        } else {
            this.sendScouts()
        }
    }

    abstract sendScouts(): void
    abstract sendWarriors(): void
}

class OrcsAI extends GameAI {
    scouts: Array<Scout> = []
    warriors: Array<Warrior> = []

    buildStructures() {
        return ['Barracks', 'Warrior Camp']
    }

    buildUnits() {
        console.log('Building warriors')
    }

    sendScouts() {
        if (this.scouts.length > 0) {
            console.log('Sending wolves')
        }
    }

    sendWarriors() {
        if (this.sendWarriors.length > 5) {
            console.log('Sending orcs')
        }
    }
}

class MonstersAI extends GameAI {
    buildStructures() {
        return ['Cave']
    }

    buildUnits() {
        console.log('Building monsters')
    }

    sendScouts() {
        console.log('Sending bats')
    }

    sendWarriors() {
        console.log('Sending goblins')
    }
}

class Structure {
    collect() {
        console.log('Collecting resources')
    }
}

class Scout {
    scout() {
        console.log('Scouting')
    }
}

class Warrior {
    attack() {
        console.log('Attacking')
    }
}
