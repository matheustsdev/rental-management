export class DependeciesMapper {
    _dependencies: Map<string, any>;

    constructor() {
        this._dependencies = new Map();
    }

    register(name: string, dependency: any) {
        this._dependencies.set(name, dependency);
    }

    resolve(name: string) {
        return this._dependencies.get(name)
    }
}