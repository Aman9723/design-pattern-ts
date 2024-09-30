interface Graphic {
    move(x: number, y: number): void
    draw(): void
}

class Dot implements Graphic {
    constructor(public x: number, public y: number) {}

    move(x: number, y: number) {
        this.x += x
        this.y += y
    }

    draw() {
        console.log('Drawing a dot at', this.x, this.y)
    }
}

class Circle extends Dot {
    constructor(x: number, y: number, private radius: number) {
        super(x, y)
    }

    draw() {
        console.log('Drawing a circle at', this.x, this.y, 'with radius', this.radius)
    }
}

class CompoundGraphic implements Graphic {
    private children: Graphic[] = []

    add(child: Graphic) {
        this.children.push(child)
    }

    move(x: number, y: number) {
        this.children.forEach(child => child.move(x, y))
    }

    draw() {
        this.children.forEach(child => child.draw())
    }
}

class ImageEditor {
    constructor(private all: CompoundGraphic) {}

    load() {
        this.all = new CompoundGraphic()
        this.all.add(new Dot(1, 2))
        this.all.add(new Circle(5, 3, 10))
    }

    groupSelected(components: Graphic[]) {
        const group = new CompoundGraphic()
        components.forEach(component => group.add(component))
        this.all.add(group)
        this.all.draw()
    }
}
