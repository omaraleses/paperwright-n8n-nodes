# n8n-nodes-paperwright

Render PDF documents from [Paperwright](https://paperwright.dev) templates in
your n8n workflows. Attach any trigger (Webhook, Schedule, an app event) and
every execution renders a PDF as binary data, ready for Email, Slack, Google
Drive, or S3 nodes.

## Installation

Community nodes are installed per n8n instance:

1. In n8n, open **Settings → Community Nodes**.
2. Select **Install**, then enter `n8n-nodes-paperwright`.
3. Approve the risks of using community nodes (self-hosted instances only).

n8n Cloud users: community nodes must be verified by n8n before they can be
installed on Cloud instances.

## Credentials

1. In the [Paperwright app](https://app.paperwright.dev), open
   **Settings → API keys** and create a key (it's shown once — copy it).
2. In n8n, create a new **Paperwright API Key** credential and paste the key.
3. The credential is tested against `https://api.paperwright.dev/health`.

The key is sent as the `X-Api-Key` header. Keep it server-side.

## Usage

Resources and operations:

| Resource | Operation | What it does |
|---|---|---|
| Template | Render | Renders a stored template; PDF arrives as binary `data` |
| Template | Render Inline | Renders template JSON passed inline |
| Template | Get Many | Lists the workspace's templates |
| Batch | Create Job | Submits a mail-merge (one document per row) |
| Batch | Get Job Status | Polls a job until `succeeded` |
| Batch | Download Result | Downloads the finished ZIP/merged PDF |
| Usage | Get | This month's usage for the workspace |

### First render in 3 clicks

1. Add a **Paperwright** node, pick your credential.
2. **Template ID**: open the template in Paperwright → "Use in code" → n8n tab
   gives you a ready-to-import workflow with the id pre-filled.
3. Run the workflow — the PDF lands in the `data` binary property.

### Wiring real data

The **Data** parameter accepts n8n expressions, so upstream trigger data fills
your template's `{{field}}` tokens automatically:

```json
{
  "customerName": "{{ $json.customer_name }}",
  "total": "{{ $json.amount }}"
}
```

## Compatibility

- n8n v1.x+ (nodes API v1), tested against n8n 1.9x/2.x.
- Paperwright API base URL is fixed to `https://api.paperwright.dev`.

## Resources

- [Paperwright](https://paperwright.dev)
- [API docs / OpenAPI spec](https://api.paperwright.dev/openapi/v1.json)
- [INTEGRATION guide](https://github.com/aliaburumman/paperwright-api/blob/main/INTEGRATION.md)
- [n8n community nodes docs](https://docs.n8n.io/integrations/community-nodes/)
- [n8n-node tool docs](https://docs.n8n.io/connect/create-nodes/build-your-node/using-the-n8n-node-tool.md)

## Next steps

- [ ] Deploy the backend auth changes to Render — the node's List/Batch/Usage
      operations need API-key auth live on `api.paperwright.dev`
      ([paperwright-api](https://github.com/aliaburumman/paperwright-api) → `feat/n8n-machine-auth`)
- [ ] Test the node live: `npm run dev` in this folder (needs Docker or Podman),
      then run a real render against `https://api.paperwright.dev` with an API key
- [x] Replace the placeholder icon with the brand mark (`nodes/Paperwright/paperwright.svg`)
- [ ] Publish from GitHub Actions: one-time npm setup is in `.github/workflows/publish.yml`,
      then `npm run release` locally tags a version and CI publishes it with provenance
- [ ] After publishing: install in n8n via Settings → Community Nodes, then
      [submit for n8n verification](https://docs.n8n.io/integrations/community-nodes/building-community-nodes.md)
      to unlock n8n Cloud
- [ ] Docs: add the n8n guide page to
      [paperwright-docs](https://github.com/aliaburumman/paperwright-docs) and
      link the hosted workflow templates (`/n8n/render-on-webhook.json`,
      `/n8n/render-on-schedule.json`)

## License

MIT
