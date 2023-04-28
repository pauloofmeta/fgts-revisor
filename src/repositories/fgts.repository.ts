import { Injectable } from "@decorators/di";
import { FgtsHistory } from "../models/fgts-history.model";
import { IFgtsRepository } from "../ports/repositories/fgts.repository.port";
import fs from "fs";
import { stringToDate } from "../core/utils";

@Injectable()
export class FgtsRepository implements IFgtsRepository {
    getHistory = (): Promise<FgtsHistory[]> => new Promise((resolve, reject) => {
        const fileName = `${process.env.ROOT_PATH}/assets/fgts-datasouce.json`;
        fs.readFile(fileName, {encoding: 'utf-8'}, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            
            try {
                const source = JSON.parse(data) as any[];
                const history = source.map(s => ({
                    date: stringToDate(s.date, 'dd/mm/yyyy', '/'),
                    inpc: s.inpc,
                    jam: s.jam,
                    juros: s.juros
                }));
                resolve(history);
            } catch (error) {
                reject(err);
            }
        });
    });
}