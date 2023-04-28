import { Injectable } from "@decorators/di";
import { IExtractService } from "../ports/services/extract.service.port";
import { ExtractModel } from "../models/extract.model";
import { extractPdf } from "../core/pdf-reader";

@Injectable()
export class ExtractService implements IExtractService {
    async handle(buffer: Buffer): Promise<ExtractModel[]> {
        const keySearch = 'CREDITO DE JAM';
        const extacts = await extractPdf(buffer, keySearch);
        return extacts;
    } 
}