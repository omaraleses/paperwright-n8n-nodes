import type { INodeProperties } from 'n8n-workflow';

const SHOW_RENDER = {
  show: {
    resource: ['template'],
    operation: ['render'],
  },
};

const SHOW_RENDER_INLINE = {
  show: {
    resource: ['template'],
    operation: ['renderInline'],
  },
};

export const templateFields: INodeProperties[] = [
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: SHOW_RENDER,
    placeholder: 'e.g. bdf9af54-6745-4926-947a-37adeba61ba4',
    description:
      'The template to render. In Paperwright: open the template → "Use in code" → copy the Template ID.',
  },
  {
    displayName: 'Data',
    name: 'data',
    type: 'json',
    typeOptions: {
      alwaysOpenEditWindow: true,
    },
    required: true,
    default: '{}',
    displayOptions: SHOW_RENDER,
    description:
      'Values for the template\'s {{field}} tokens, e.g. { "customerName": "Acme" }. Supports expressions like {{ $json.customerName }}.',
    routing: {
      request: {
        body: {
          data: '={{ JSON.parse($parameter.data) }}',
        },
      },
    },
  },
  {
    displayName: 'Template Content',
    name: 'content',
    type: 'json',
    typeOptions: {
      alwaysOpenEditWindow: true,
    },
    required: true,
    default: '',
    displayOptions: SHOW_RENDER_INLINE,
    description: 'The template JSON itself (as exported from the designer).',
    routing: {
      request: {
        body: {
          content: '={{ JSON.parse($parameter.content) }}',
          data: '={{ JSON.parse($parameter.data) }}',
        },
      },
    },
  },
  {
    displayName: 'Data',
    name: 'data',
    type: 'json',
    typeOptions: {
      alwaysOpenEditWindow: true,
    },
    required: true,
    default: '{}',
    displayOptions: SHOW_RENDER_INLINE,
    description: 'Values for the template\'s {{field}} tokens.',
    routing: {
      request: {
        body: {
          data: '={{ JSON.parse($parameter.data) }}',
        },
      },
    },
  },
];
