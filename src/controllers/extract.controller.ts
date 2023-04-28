import { Controller, Post, Res, Req, Next } from "@decorators/express";
import { NextFunction, Request, Response } from "express";
import { Inject } from "@decorators/di";
import { IExtractService } from "../ports/services/extract.service.port";

@Controller('/extract')
export class ExtractController {

    constructor(
        @Inject('IExtractService')
        private extractService: IExtractService,
    ) {}

    @Post('/')
    generate(@Res() res: Response, @Req() req: Request, @Next() next: NextFunction) {
        try {
            const maxfileSize = 1024 * 1024 * 50; // 50MB
            let contentBuffer: Uint8Array[] = [];
            let totalBytesInBuffer = 0;
    
            req.on('data', chunk => {
                contentBuffer.push(chunk);
                totalBytesInBuffer += chunk.length;
    
                if (totalBytesInBuffer > maxfileSize) {
                    req.pause();
    
                    res.header('Connection', 'close');
                    res.status(413).json({error: `The file size exceeded limit of ${maxfileSize} bytes`});
                    req.socket.destroy();
                }
            });
    
            req.on('end', () => {
                if (totalBytesInBuffer <= 0) {
                    res.header('Connection', 'close');
                    res.status(400).json({ error: 'The file must be passed!' });
                    req.socket.destroy();
                }

                const buffer = Buffer.concat(contentBuffer, totalBytesInBuffer);
                this.extractService
                    .handle(buffer)
                    .then(values => {
                        res.status(200).json({ values: values }); 
                    })
                    .catch(error => {
                        console.error(error);
                        res.header('Connection', 'close');
                        res.status(500).json({ error: 'Oops, something broke!' });
                        req.socket.destroy();
                    });
            }); 
        } catch (error) {
            next(error);
        }
    }
}