class VideoFile {
    constructor(filename: string) {}
}

class OggCompressionCodec {}

class MPEG4CompressionCodec {}

class CodeFactory {
    static extract(file: VideoFile): OggCompressionCodec | MPEG4CompressionCodec {
        return new OggCompressionCodec()
    }
}

class BitrateReader {
    static read(filename: string, sourceCodec: OggCompressionCodec | MPEG4CompressionCodec) {
        return ''
    }

    static convert(buffer: string, destinationCodec: OggCompressionCodec | MPEG4CompressionCodec) {
        return ''
    }
}

class AudioMixer {
    static fix(result: string) {
        return ''
    }
}

class VideoConverter {
    convert(filename: string, format: string): VideoFile {
        const file = new VideoFile(filename)
        const sourceCodec = CodeFactory.extract(file)
        let destinationCodec: MPEG4CompressionCodec | OggCompressionCodec
        if (format === 'mp4') {
            destinationCodec = new MPEG4CompressionCodec()
        } else {
            destinationCodec = new OggCompressionCodec()
        }

        const buffer = BitrateReader.read(filename, sourceCodec)
        const intermediateResult = BitrateReader.convert(buffer, destinationCodec)
        const result = AudioMixer.fix(intermediateResult)

        return new VideoFile(result)
    }
}

class Application {
    main(filename: string, format: string) {
        const converter = new VideoConverter()
        converter.convert(filename, format)
    }
}

export {}
