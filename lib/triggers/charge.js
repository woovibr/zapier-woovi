"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
// Função para lidar com a requisição do webhook
function handleWebhook(request, response) {
    let data = "";
    // Concatena os chunks de dados recebidos
    request.on("data", (chunk) => {
        data += chunk;
    });
    // Quando toda a requisição for recebida
    request.on("end", () => {
        // Execute as ações desejadas com os dados do webhook
        console.log("Webhook recebido:", data);
        // Responda com um status 200 para indicar que a requisição foi recebida com sucesso
        response.statusCode = 200;
        response.end();
    });
}
// Função de execução do Zapier
const perform = async (z, bundle) => {
    const response = await z.request({
        method: "POST",
        url: `${process.env.BASE_URL}/webhook`,
        body: {
            webhook: {
                name: "Charge",
                event: "OPENPIX:CHARGE_CREATED",
                url: "https://hooks.zapier.com/hooks/standard/187534/webhook",
                authorization: "openpix",
                isActive: true,
            },
        },
        headers: {
            Authorization: bundle.inputData.appID,
        },
    });
    return response.data;
};
// Crie o servidor HTTP para receber o webhook
const server = (0, http_1.createServer)(handleWebhook);
// Inicie o servidor na porta desejada (por exemplo, 3000)
const port = 3000;
server.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
exports.default = {
    key: "charge",
    noun: "Charge",
    display: {
        label: "Create Charge",
        description: "Creates a new charge.",
    },
    operation: {
        perform,
        inputFields: [
            { key: "appID", type: "string", required: true },
            {
                key: "name",
                type: "string",
                required: true,
            },
            {
                key: "event",
                required: true,
                choices: {
                    chargeCreated: "OPENPIX:CHARGE_CREATED",
                    chargeCompleted: "OPENPIX:CHARGE_COMPLETED",
                    chargeExpired: "OPENPIX:CHARGE_EXPIRED",
                    transactionReceived: "OPENPIX:TRANSACTION_RECEIVED",
                    transactionRefundReceived: "OPENPIX:TRANSACTION_REFUND_RECEIVED",
                    movementConfirmed: "OPENPIX:MOVEMENT_CONFIRMED",
                    movementFailed: "OPENPIX:MOVEMENT_FAILED",
                    movementRemoved: "OPENPIX:MOVEMENT_REMOVED",
                },
            },
        ],
    },
};
