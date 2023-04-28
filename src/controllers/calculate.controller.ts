import { Body, Controller, Post, Res } from "@decorators/express";
import { Response } from "express";
import { ExtractModel } from "../models/extract.model";
import { Inject } from "@decorators/di";
import { ICalculateService } from "../ports/services/calculate.service.port";

@Controller('/calculate')
export class CalculateController {

    constructor(
        @Inject('ICalculateService') private calculateService: ICalculateService
    ){}

    @Post('/fgts-revision')
    fgtsRevisionCalculate(@Res() res: Response, @Body() extractValues: ExtractModel[]) {
        if (!(extractValues instanceof Array) || extractValues.length <= 0) {
            res.status(400).json({ error: 'The values is not informed'});
            return;
        }

        this.calculateService
            .fgtsRevisionCalculate(extractValues)
            .then(calc => {
                res.status(200).json(calc);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({error: 'Oops, something broke!'})
            });
    }
}