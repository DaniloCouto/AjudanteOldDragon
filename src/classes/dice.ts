export class Dice {
    private maxValue: number;

    constructor($maxValue: number) {
        this.maxValue = $maxValue;
    }

    public get $maxValue(): number {
        return this.maxValue;
    }

    public set $maxValue(value: number) {
        this.maxValue = value;
    }

    public get $roll(): number{
        return Math.floor(Math.random() * this.maxValue) + 1;
    }

}