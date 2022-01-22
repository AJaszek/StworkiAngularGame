export class Creature  {
    type: number;
    kind: string;
    description: string;

    constructor(type: number, kind: string, description: string){
        this.type = type;
        this.kind = kind;
        this.description = description;
    }

}