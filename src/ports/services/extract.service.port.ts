import { ExtractModel } from "../../models/extract.model";

export interface IExtractService {
    handle(buffer: Buffer): Promise<ExtractModel[]>;
}