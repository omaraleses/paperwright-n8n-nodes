import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { batchFields, batchOperation } from './parameters/batch';
import { resourceParameter, templateOperation, usageOperation } from './parameters/resource';
import { templateFields } from './parameters/template';

/**
 * Paperwright — declarative-style node over the public render API
 * (https://api.paperwright.dev). Attach any trigger (Webhook, Schedule, app
 * event) and every execution renders a PDF: the response arrives as binary
 * data (`data`), ready for Email/Slack/S3 nodes.
 *
 * CONTRACT: the node type string and parameter names (resource/operation/
 * templateId/data) are mirrored byte-for-byte by the Paperwright web app's
 * generated n8n workflows (`src/lib/integration/n8n-workflow.ts`). Changing
 * one side without the other breaks generated workflows.
 */
export class Paperwright implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Paperwright',
    name: 'paperwright',
    icon: 'file:paperwright.svg',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Render PDF documents from Paperwright templates',
    defaults: {
      name: 'Paperwright',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'paperwrightApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.paperwright.dev',
    },
    properties: [
      resourceParameter,
      templateOperation,
      batchOperation,
      usageOperation,
      ...templateFields,
      ...batchFields,
    ],
  };
}
