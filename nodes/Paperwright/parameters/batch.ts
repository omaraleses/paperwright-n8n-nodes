import type { INodeProperties } from 'n8n-workflow';

const SHOW_CREATE = {
  show: {
    resource: ['batch'],
    operation: ['create'],
  },
};

const SHOW_JOB = {
  show: {
    resource: ['batch'],
    operation: ['status', 'result'],
  },
};

export const batchOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  required: true,
  default: 'create',
  displayOptions: {
    show: {
      resource: ['batch'],
    },
  },
  options: [
    {
      name: 'Create Job',
      value: 'create',
      description: 'Submit a mail-merge job (one document per data row)',
      routing: {
        request: {
          method: 'POST',
          url: '=/api/templates/{{$parameter.templateId}}/render-batch',
        },
      },
    },
    {
      name: 'Get Job Status',
      value: 'status',
      description: 'Poll a job (queued → running → succeeded/failed)',
      routing: {
        request: {
          method: 'GET',
          url: '=/api/templates/{{$parameter.templateId}}/render-batch/jobs/{{$parameter.jobId}}',
        },
      },
    },
    {
      name: 'Download Result',
      value: 'result',
      description: 'Download the finished ZIP or merged PDF',
      routing: {
        request: {
          method: 'GET',
          url: '=/api/templates/{{$parameter.templateId}}/render-batch/jobs/{{$parameter.jobId}}/result',
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
  ],
};

export const batchFields: INodeProperties[] = [
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['batch'],
        operation: ['create', 'status', 'result'],
      },
    },
    description: 'The template the batch job renders.',
  },
  {
    displayName: 'Job ID',
    name: 'jobId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: SHOW_JOB,
    description: 'Returned by Create Job. Poll until status is "succeeded".',
  },
  {
    displayName: 'Rows',
    name: 'rows',
    type: 'json',
    typeOptions: {
      alwaysOpenEditWindow: true,
    },
    required: true,
    default: '[]',
    displayOptions: SHOW_CREATE,
    description:
      'JSON array of data rows; each row becomes one document. e.g. [{ "customerName": "Acme" }, …]',
    routing: {
      request: {
        body: {
          rows: '={{ JSON.parse($parameter.rows) }}',
          output: '={{ $parameter.output }}',
        },
      },
    },
  },
  {
    displayName: 'Output',
    name: 'output',
    type: 'options',
    noDataExpression: true,
    default: 'zip',
    displayOptions: SHOW_CREATE,
    options: [
      {
        name: 'ZIP (one file per row)',
        value: 'zip',
      },
      {
        name: 'Merged (single PDF)',
        value: 'merged',
      },
    ],
  },
];
