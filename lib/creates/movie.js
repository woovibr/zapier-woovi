"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// You can optionally add add the shape of the inputData in bundle, which will pass that
// info down into the function and tests
const perform = async (z, bundle) => {
    const response = await z.request({
        method: 'POST',
        url: 'https://auth-json-server.zapier-staging.com/movies',
        body: {
            title: bundle.inputData.title,
            year: bundle.inputData.year,
        },
    });
    return response.data;
};
exports.default = {
    key: 'movie',
    noun: 'Movie',
    display: {
        label: 'Create Movie',
        description: 'Creates a new movie.',
    },
    operation: {
        perform,
        inputFields: [
            { key: 'title', required: true },
            { key: 'year', type: 'integer' },
        ],
        sample: {
            id: '1',
            title: 'example',
        },
    },
};
