import { Bundle, ZObject } from "zapier-platform-core";
import { createServer, IncomingMessage, ServerResponse } from "http";
import config from "../config";

type TBundle = {
  appID: string;
  correlationID: string;
  value: number;
};

// Função para lidar com a requisição do webhook
function handleWebhook(request: IncomingMessage, response: ServerResponse) {
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
const perform = async (z: ZObject, bundle: Bundle<TBundle>) => {
  const response = await z.request({
    method: "POST",
    url: `${config.BASE_URL}/webhook`,
    body: {
      webhook: {
        name: "Charge",
        event: "OPENPIX:CHARGE_CREATED",
        url: "https://hooks.zapier.com/hooks/standard/187534/webhook", // Altere para o seu endpoint de webhook
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

export default {
  key: "charge",
  noun: "Charge",

  display: {
    label: "Charge",
    description: "This will be trigger after some of the charge events",
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
