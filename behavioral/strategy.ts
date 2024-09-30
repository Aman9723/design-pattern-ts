interface Strategy {
    execute(a: number, b: number): number
}

class AddStrategy implements Strategy {
    execute(a: number, b: number): number {
        return a + b
    }
}

class SubtractStrategy implements Strategy {
    execute(a: number, b: number): number {
        return a - b
    }
}

class MultiplyStrategy implements Strategy {
    execute(a: number, b: number): number {
        return a * b
    }
}

class Context {
    constructor(private strategy: Strategy) {}

    setStrategy(strategy: Strategy) {
        this.strategy = strategy
    }

    executeStrategy(a: number, b: number): number {
        return this.strategy.execute(a, b)
    }
}

class ExampleApplication {
    action: string

    main() {
        const context = new Context(new AddStrategy())

        if (this.action === 'addition') {
            context.setStrategy(new AddStrategy())
        } else if (this.action === 'subtraction') {
            context.setStrategy(new SubtractStrategy())
        } else if (this.action === 'multiplication') {
            context.setStrategy(new MultiplyStrategy())
        }

        const result = context.executeStrategy(10, 5)
    }
}
