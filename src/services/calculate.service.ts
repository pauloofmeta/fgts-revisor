import { Inject, Injectable } from "@decorators/di";
import { ICalculateService } from "../ports/services/calculate.service.port";
import { ExtractModel } from "../models/extract.model";
import { IFgtsRepository } from "../ports/repositories/fgts.repository.port";
import { FgtsHistory } from "../models/fgts-history.model";
import { dateEquals, roundTo } from "../core/utils";

@Injectable()
export class CalculateService implements ICalculateService {

    constructor(
        @Inject('IFgtsRepository') private repository: IFgtsRepository
    ) {}

    async fgtsRevisionCalculate(extractValues: ExtractModel[]): Promise<any> {
        const calc = await this._calcule(extractValues);

        const totalDif = calc.reduce((total, value) => {
            return total + value.dif
        }, 0)

        return {
            totalDif: roundTo(totalDif, 2),
            calc: calc
        };
    }

    private _composeSaldo(calc: any[]): any[] {
        return calc.map((c, i) => {
            const saldo = calc
                .slice(0, i + 1)
                .map(e => e.dif)
                .reduce((prev, act) => prev + act);

            return {
                ...c,
                saldo: roundTo(saldo, 2)
            }
        });
    }


    private async _calcule(extractValues: ExtractModel[]): Promise<any[]> {
        const history = await this.repository.getHistory();

        const getHistory = (date: Date): FgtsHistory | undefined => 
            history.find(h => dateEquals(date, h.date));

        const calc = extractValues.map((extractValue) => {
            const history = getHistory(extractValue.date);
            if (!history) {
                return {
                    dif: 0,
                    newJam: 0,
                    newIndex: 0,
                    base: 0,
                    date: new Date()
                }
            }

            const base = roundTo(extractValue.amount / history.jam, 2);
            const newIndex = roundTo(((1 + history.inpc) * (1 + history.juros)) - 1, 9);
            const newJam = roundTo(base * newIndex, 2);
            const dif = newJam - extractValue.amount;

            return {
                date: extractValue.date,
                base,
                newIndex,
                newJam,
                dif
            }
        });
        return this._composeSaldo(calc);
    }

}