class RoundHole {
    constructor(public radius: number) {}

    getRadius() {
        return this.radius
    }

    fits(peg: RoundPeg) {
        return this.getRadius() >= peg.getRadius()
    }
}

class RoundPeg {
    constructor(public radius: number) {}

    getRadius() {
        return this.radius
    }
}

class SquarePeg {
    constructor(public width: number) {}

    getWidth() {
        return this.width
    }
}

class SquarePegAdapter extends RoundPeg {
    constructor(private peg: SquarePeg) {
        super((peg.getWidth() * Math.sqrt(2)) / 2)
    }
}

const hole = new RoundHole(5)
const roundPeg = new RoundPeg(5)
hole.fits(roundPeg)

const smallSquarePeg = new SquarePeg(5)
const largeSquarePeg = new SquarePeg(10)

const smallSquarePegAdapter = new SquarePegAdapter(smallSquarePeg)
const largeSquarePegAdapter = new SquarePegAdapter(largeSquarePeg)
hole.fits(smallSquarePegAdapter)
hole.fits(largeSquarePegAdapter)

export {}
