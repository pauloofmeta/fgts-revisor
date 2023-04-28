import {PDFExtract, PDFExtractPage} from 'pdf.js-extract';
import { ExtractModel } from '../models/extract.model';
import { stringToDate, stringToFloat } from './utils';

const pageToLines = (page: PDFExtractPage, maxDiff: number) => {
    const collector:any = {};
    page.content.forEach(text => {
        collector[text.y] = collector[text.y] || [];
        collector[text.y].push(text);
    });
    const list = Object.keys(collector).map(key => ({y: key, items: collector[key]})).sort((a: any, b: any) => a.y - b.y);
    if (maxDiff > 0) {
        for (let i = list.length - 1; i > 0; i--) {
            const r1:any = list[i - 1];
            const r2:any = list[i];
            const diff = r2.y - r1.y;
            if (diff < maxDiff) {
                r1.items = r1.items.concat(r2.items);
                r2.items = [];
            }
        }
    }
    list.forEach(item => {
        item.items = item.items.sort((a: any, b: any) => a.x - b.x);
    });
    return list.filter(item => item.items.length > 0).map(item => item.items)
};

const extractTextRows = (lines: any[]) => lines.map(line => line.map((cell: any) => {
    if (!cell) return null;
    return cell.str;
}));

export const extractPdf = (buffer: Buffer, keySearch: string): Promise<ExtractModel[]> => new Promise((resolve, reject) => {
    const pdfExp = new PDFExtract();
    const options = {};
    pdfExp.extractBuffer(buffer, options, (err, data) => {
        if (err) {
            reject(err);
            return;
        }

        console.log('Read pdf pages...')
        const values: ExtractModel[] = [];
        data?.pages.forEach((page) => {
            const lines = pageToLines(page, 2);
            const rows = extractTextRows(lines);
            rows.forEach((row: any[]) => {
                const jam = row.find((r) => r.includes(keySearch));
                if (jam) {
                    const value: ExtractModel = {
                        date: stringToDate(row[1], 'dd/mm/yyyy', '/'),
                        description: row[3],
                        amount: stringToFloat(row[7])
                    };

                    values.push(value);
                }
            });
        });
        resolve(values);
    });
});