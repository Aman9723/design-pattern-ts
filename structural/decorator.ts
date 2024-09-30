interface DataSource {
    writeData(data: string): void
    readData(): string
}

class FileDataSource implements DataSource {
    constructor(private filename: string) {}

    writeData(data: string) {
        console.log('Writing data to', this.filename)
    }

    readData() {
        console.log('Reading data from', this.filename)
        return ''
    }
}

class DataSourceDecorator implements DataSource {
    constructor(private wrappee: DataSource) {}

    writeData(data: string) {
        this.wrappee.writeData(data)
    }

    readData() {
        return this.wrappee.readData()
    }
}

class EncryptionDecorator extends DataSourceDecorator {
    writeData(data: string) {
        console.log('Encrypting data')
        this.writeData(data)
    }

    readData() {
        console.log('Decrypting data')
        return this.readData()
    }
}

class CompressionDecorator extends DataSourceDecorator {
    writeData(data: string) {
        console.log('Compressing data')
        this.writeData(data)
    }

    readData() {
        console.log('Decompressing data')
        return this.readData()
    }
}

class Application {
    dumbUsageExample() {
        const source1 = new FileDataSource('somefile.dat')
        source1.writeData('some data')

        const source2 = new CompressionDecorator(source1)
        source2.writeData('some data')

        const source3 = new EncryptionDecorator(source2)
        source3.writeData('some data')
    }
}

class SalaryManager {
    constructor(private source: DataSource) {}

    load() {
        this.source.readData()
    }

    save() {
        this.source.writeData('some salary data')
    }
}

class ApplicationConfigurator {
    configuratonExample() {
        const source = new FileDataSource('salary.dat')
        const encrypted = new EncryptionDecorator(source)
        const compressed = new CompressionDecorator(encrypted)
        const salaryManager = new SalaryManager(compressed)
        return salaryManager
    }
}

export {}
