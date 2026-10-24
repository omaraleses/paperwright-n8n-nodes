import type {
  IAuthenticate,
  ICredentialTestRequest,
  ICredentialType,
  Icon,
  INodeProperties,
} from 'n8n-workflow';

/**
 * Paperwright workspace API key. Create one in the Paperwright web app under
 * Settings → API keys (shown once, so paste it straight in here). Sent as the
 * `X-Api-Key` header on every request the node makes.
 */
export class PaperwrightApi implements ICredentialType {
  name = 'paperwrightApi';

  displayName = 'Paperwright API Key';

  icon: Icon = 'file:../nodes/Paperwright/paperwright.svg';

  documentationUrl = 'https://api.paperwright.dev';

  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description:
        'Workspace API key from Paperwright (Settings → API keys). Shown once at creation.',
      placeholder: 'paperwright_…',
    },
  ];

  authenticate: IAuthenticate = {
    type: 'generic',
    properties: {
      headers: {
        'X-Api-Key': '={{$credentials.apiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      url: 'https://api.paperwright.dev/health',
      method: 'GET',
    },
  };
}
