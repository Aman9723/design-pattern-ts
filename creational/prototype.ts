abstract class Shape {
    x: number
    y: number
    color: string

    constructor()
    constructor(source: Shape)

    constructor(source?: Shape) {
        if (source) {
            this.x = source.x
            this.y = source.y
            this.color = source.color
        }
    }

    abstract clone(): Shape
}

class Rectangle extends Shape {
    width: number
    height: number

    constructor()
    constructor(source: Rectangle)

    constructor(source?: Rectangle) {
        if (source) {
            super(source)
            this.width = source.width
            this.height = source.height
        }
    }

    clone(): Rectangle {
        return new Rectangle(this)
    }
}

class Circle extends Shape {
    radius: number

    constructor()
    constructor(source: Circle)

    constructor(source?: Circle) {
        if (source) {
            super(source)
            this.radius = source.radius
        }
    }

    clone(): Circle {
        return new Circle(this)
    }
}

class Application {
    shapes: Shape[] = []

    constructor() {
        const circle = new Circle()
        circle.x = 10
        circle.y = 10
        circle.color = 'red'
        circle.radius = 20

        this.shapes.push(circle)

        const anotherCircle = circle.clone()
        this.shapes.push(anotherCircle)

        const rectangle = new Rectangle()
        rectangle.x = 20
        rectangle.y = 20
        rectangle.color = 'blue'
        rectangle.width = 10
        rectangle.height = 20

        this.shapes.push(rectangle)
    }

    businessLogic() {
        const shapesCopy = this.shapes.map(shape => shape.clone())
        console.log(shapesCopy)
    }
}

export {}
