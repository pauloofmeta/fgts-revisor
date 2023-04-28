import { ExtractModel } from "../../models/extract.model";

export interface ICalculateService {
    fgtsRevisionCalculate(extractValues: ExtractModel[]): Promise<any>;
}