import 'reflect-metadata';
import * as test from 'tape';
import {DailyValueController} from '../src/domain/DailyValue/DailyValueController';

test('addressController', (t) => {
    t.plan(1);

    const controller = new DailyValueController();

    t.assert(controller != null);
});