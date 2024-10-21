export class Permission {
    #name: string;

    constructor(name: string) {
        this.#name = name;
    }

    public getName(): string {
        return this.#name;
    }

    public get name(): string {
        return this.#name;
    }

    public toString(): string {
        return `"permission": {
              "name": "${this.#name}"
            }`;
    }
}
