import { once } from 'events';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto'
const PORT = 3000;
const isTest = process.env.NODE_ENV === "test"
let tickets = []
let reservations = []

function init() {
    reservations = []
    tickets = []

    for (let index = 0; index < 100; index++) {
        tickets.push({ status: "AV" });
    }
    // console.log('data', tickets.length)

    return tickets
}

const t = { 'content-type': "application/json" }
const app = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://' + (req.headers.host ?? 'localhost'));

    if (url.pathname === '/reservations') {

        const [data] = (await once(req, "data"))
        const obj = JSON.parse(data)
        if (!obj.cpf || !obj.quantity) {
            res.writeHead(403)
            res.end();
            return
        }
        const quantity = parseInt(obj.quantity)
        const indexes = []
        // for (let index = 0; index < quantity; index++) {
        const av = tickets
            .map((ticket, index) => ({ ...ticket, index }))
            .filter((ticket) => ticket.status === 'AV')
            .slice(0, quantity)

        // console.log('quantity', quantity, av.length)

        if (quantity > av.length) {

            res.writeHead(409, t)
            res.end(JSON.stringify({ error: "SOLD_OUT" }));
            return;
        }

        let reserv = { reservation_id: randomUUID(), quantity: 0, tickets: [] }

        for (const i of av) {
            // console.log('SOLD*99', i.index)

            tickets[i.index] = {
                ...tickets[i.index],
                status: "SOLD",
                tid: randomUUID(),
            }
            reserv.quantity++
            reserv.tickets.push(tickets[i.index])
        }
        reservations.push(reserv)
        // console.log('SOLD*8', tickets.filter(t => t.status === 'SOLD').length)

        res.writeHead(201, t)
        res.end();
        return;
    }

    if (url.pathname === '/world') {
        res.end('world');
        return;
    }

    res.writeHead(404);
    res.end('not found');
})

app.on('listening', () => init())
// app.once('close', () => init())

if (!isTest) {
    app.listen(PORT, () => console.log('server is running at', PORT));
}

export { app }