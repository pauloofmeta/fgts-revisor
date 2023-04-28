import { FgtsHistory } from "../../models/fgts-history.model";

export interface IFgtsRepository {
    getHistory(): Promise<FgtsHistory[]>;
}