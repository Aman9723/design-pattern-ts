interface Shape {
    move(x: number, y: number): void
    draw(): void
    accept(visitor: Visitor): void
}

class Dot implements Shape {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    move(x: number, y: number) {
        this.x += x
        this.y += y
    }

    draw() {
        console.log('Drawing dot')
    }

    accept(visitor: Visitor) {
        visitor.visitDot(this)
    }
}

class Circle implements Shape {
    x: number
    y: number
    radius: number

    constructor(x: number, y: number, radius: number) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    move(x: number, y: number) {
        this.x += x
        this.y += y
    }

    draw() {
        console.log('Drawing circle')
    }

    accept(visitor: Visitor) {
        visitor.visitCircle(this)
    }
}

class Rectangle implements Shape {
    x: number
    y: number
    width: number
    height: number

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    move(x: number, y: number) {
        this.x += x
        this.y += y
    }

    draw() {
        console.log('Drawing rectangle')
    }

    accept(visitor: Visitor) {
        visitor.visitRectangle(this)
    }
}

class CompoundShape implements Shape {
    children: Array<Shape> = []

    move(x: number, y: number) {
        this.children.forEach(child => child.move(x, y))
    }

    draw() {
        console.log('Drawing compound shape')
    }

    accept(visitor: Visitor) {
        visitor.visitCompoundShape(this)
    }
}

interface Visitor {
    visitDot(dot: Dot): void
    visitCircle(circle: Circle): void
    visitRectangle(rectangle: Rectangle): void
    visitCompoundShape(compoundShape: CompoundShape): void
}

class XMLExportVisitor implements Visitor {
    visitDot(dot: Dot) {
        console.log('Exporting dot to XML')
    }

    visitCircle(circle: Circle) {
        console.log('Exporting circle to XML')
    }

    visitRectangle(rectangle: Rectangle) {
        console.log('Exporting rectangle to XML')
    }

    visitCompoundShape(compoundShape: CompoundShape) {
        console.log('Exporting compound shape to XML')
    }
}

class Application {
    shapes: Array<Shape> = []

    export() {
        const visitor = new XMLExportVisitor()
        this.shapes.forEach(shape => shape.accept(visitor))
    }
}
