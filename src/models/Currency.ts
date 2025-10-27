import { Decimal } from "@prisma/client/runtime/library";

class Currency {
    private _value: number;

    constructor(value?: number | Decimal | null) {
        this._value = value ? Number(value) : 0;
    }

    getValue() {
        return this._value;
    }

    toString() {
    return this._value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}

export default Currency;