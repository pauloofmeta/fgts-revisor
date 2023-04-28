import { Container } from "@decorators/di";
import { ExtractService } from "../services/extract.service";
import { FgtsRepository } from "../repositories/fgts.repository";
import { CalculateService } from "../services/calculate.service";

export const register = () => {
    Container.provide([
        { provide: 'IExtractService', useClass: ExtractService },
        { provide: 'IFgtsRepository', useClass: FgtsRepository},
        { provide: 'ICalculateService', useClass: CalculateService},
    ]);
};