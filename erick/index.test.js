import { deepStrictEqual } from 'node:assert';
import { describe, test, before, beforeEach, afterEach } from 'node:test';
import { app } from './index.js'
describe('subject', () => {
    let server
    beforeEach(async () => {
        return new Promise((resolve, reject) => {
            server = app.listen(0, () => {
                resolve()
            })
        });
    })

    afterEach(async () => {
        return new Promise((resolve, reject) => {
            server.close(resolve)
        });

    })
    test('test1 - 201', async () => {
        const port = server.address().port
        // console.log('server', server.address().port);
        const r = await fetch(`http://localhost:${port}/reservations`, {
            method: "POST",
            body: JSON.stringify({
                cpf: "12345678900",
                quantity: 100
            })
        })

        deepStrictEqual(
            r.status,
            201
        )
    });

    test('test2 - 409', async () => {
        const port = server.address().port
        for (let index = 0; index < 80; index++) {
            const r = await fetch(`http://localhost:${port}/reservations`, {
                method: "POST",
                body: JSON.stringify({
                    cpf: "12345678900",
                    quantity: 1
                })
            })
            deepStrictEqual(
                r.status,
                201
            )
        }

        const r = await fetch(`http://localhost:${port}/reservations`, {
            method: "POST",
            body: JSON.stringify({
                cpf: "12345678900",
                quantity: 1
            })
        })
        deepStrictEqual(
            r.status,
            409
        )
        deepStrictEqual(
            await r.json(),
            { error: "SOLD_OUT" },
        )

    });
});