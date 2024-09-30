interface Builder {
    reset(): void
    setSeats(seats: number): void
    setEngine(engine: string): void
    setTripComputer(): void
    setGPS(): void
}

class Car {
    seats: number
    engine: string
    tripComputer: boolean
    gps: boolean
}

class Manual {
    seats: number
    engine: string
    tripComputer: boolean
    gps: boolean
}

class CarBuilder implements Builder {
    private car: Car

    constructor() {
        this.reset()
    }

    reset() {
        this.car = new Car()
    }

    setSeats(seats: number) {
        this.car.seats = seats
    }

    setEngine(engine: string) {
        this.car.engine = engine
    }

    setTripComputer() {
        this.car.tripComputer = true
    }

    setGPS() {
        this.car.gps = true
    }

    getProduct() {
        return this.car
    }
}

class ManualBuilder implements Builder {
    private manual: Manual

    constructor() {
        this.reset()
    }

    reset() {
        this.manual = new Manual()
    }

    setSeats(seats: number) {
        this.manual.seats = seats
    }

    setEngine(engine: string) {
        this.manual.engine = engine
    }

    setTripComputer() {
        this.manual.tripComputer = true
    }

    setGPS() {
        this.manual.gps = true
    }

    getProduct() {
        return this.manual
    }
}

class Director {
    constructSportsCar(builder: Builder) {
        builder.reset()
        builder.setSeats(2)
        builder.setEngine('sport')
        builder.setTripComputer()
        builder.setGPS()
    }

    constructSUV(builder: Builder) {
        builder.reset()
        builder.setSeats(4)
        builder.setEngine('suv')
        builder.setGPS()
    }
}

class Application {
    makeCar() {
        const director = new Director()
        const carBuilder = new CarBuilder()
        const carManualBuilder = new ManualBuilder()

        director.constructSportsCar(carBuilder)
        director.constructSportsCar(carManualBuilder)
        const car = carBuilder.getProduct()
        const manual = carManualBuilder.getProduct()
    }
}
