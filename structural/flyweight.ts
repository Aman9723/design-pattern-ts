class TreeType {
    constructor(public name: string, public color: string, public texture: string) {}

    draw(canvas: number, x: number, y: number) {}
}

class TreeFactory {
    static treeTypes: { [key: string]: TreeType } = {}

    static getTreeType(name: string, color: string, texture: string) {
        let result = this.treeTypes[name]
        if (!result) {
            result = new TreeType(name, color, texture)
            this.treeTypes[name] = result
        }
        return result
    }
}

class Tree {
    constructor(public x: number, public y: number, public type: TreeType) {}

    draw(canvas: number) {
        this.type.draw(canvas, this.x, this.y)
    }
}

class Forest {
    trees: Tree[] = []

    plantTree(x: number, y: number, name: string, color: string, texture: string) {
        const type = TreeFactory.getTreeType(name, color, texture)
        const tree = new Tree(x, y, type)
        this.trees.push(tree)
    }

    draw(canvas: number) {
        this.trees.forEach(tree => tree.draw(canvas))
    }
}
