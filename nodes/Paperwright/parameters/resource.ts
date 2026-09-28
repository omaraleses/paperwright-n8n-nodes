import type { INodeProperties } from 'n8n-workflow';

export const resourceParameter: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  required: true,
  default: 'template',
  options: [
    {
      name: 'Template',
      value: 'template',
      description: 'Render or look up PDF templates',
    },
    {
      name: 'Batch',
      value: 'batch',
      description: 'Mail-merge many documents from one template',
    },
    {
      name: 'Usage',
      value: 'usage',
      description: "This month's render/quota usage",
    },
  ],
};

export const templateOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  required: true,
  default: 'render',
  displayOptions: {
    show: {
      resource: ['template'],
    },
  },
  options: [
    {
      name: 'Render',
      value: 'render',
      description: 'Render a stored template to a PDF file',
      routing: {
        request: {
          method: 'POST',
          url: '=/api/templates/{{$parameter.templateId}}/render',
        },
        output: {
          postReceive: [
            {
              type: 'binaryData',
              properties: {
                destinationProperty: 'data',
              },
            },
          ],
        },
      },
    },
    {
      name: 'Render Inline',
      value: 'renderInline',
      description: 'Render template JSON passed in the request body',
      routing: {
        request: {
          method: 'POST',
          url: '/api/render',
        },
        output: {
          postReceive: [
            {
              type: 'binaryData',
              properties: {
                destinationProperty: 'data',
              },
            },
          ],
        },
      },
    },
    {
      name: 'Get Many',
      value: 'list',
      description: 'List templates in the workspace',
      routing: {
        request: {
          method: 'GET',
          url: '/api/templates',
        },
      },
    },
  ],
};

export const usageOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  required: true,
  default: 'get',
  displayOptions: {
    show: {
      resource: ['usage'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      description: "Get this month's usage for the API key's workspace",
      routing: {
        request: {
          method: 'GET',
          url: '/api/usage',
        },
      },
    },
  ],
};
