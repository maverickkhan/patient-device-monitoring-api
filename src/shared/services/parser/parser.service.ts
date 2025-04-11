import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ParserService {
    constructor(){}

    Logger = new Logger(ParserService.name);

    processDeviceData(raw: string){
        this.Logger.verbose(`parsing string`, raw)
        const parts = raw.replace(/#/g, '').split('::');
        if (parts.length !== 6) throw new Error('Invalid format');

        const [deviceId, unix, pulse, systolic, diastolic, o2sat] = parts;

        const parsed = {
            timestamp: new Date(Number(unix) * 1000),
            pulse: parseInt(pulse),
            systolic: parseInt(systolic),
            diastolic: parseInt(diastolic),
            o2sat: parseInt(o2sat),
        };

        if (
            isNaN(parsed.pulse) || parsed.pulse < 0 ||
            isNaN(parsed.systolic) || parsed.systolic < 0 ||
            isNaN(parsed.diastolic) || parsed.diastolic < 0 ||
            isNaN(parsed.o2sat) || parsed.o2sat < 0 ||
            isNaN(parsed.timestamp.getTime())
          ) {
            throw new Error('Invalid or negative values detected');
          }

          return {
            deviceId,
            ...parsed,
          }

    }
}
