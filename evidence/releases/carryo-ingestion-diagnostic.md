# Carryo hosted-image ingestion diagnostic

Target: JSsAJ97BPwi5er5B. Current revision: 3. Hosted images: 0; maximum: 10; remaining: 10. Account publishing enabled; updatesPerLink: null (unlimited). No website-specific override returned.

No mutation or import retry was performed during this diagnostic.

## Invocation reviewed

Tool: carryo_website_edit_images

```json
{"linkId":"JSsAJ97BPwi5er5B","assets":[{"path":"assets/charlotte.png","contentType":"image/png","sourceUrl":"https://raw.githubusercontent.com/jaredlock1-ux/Charlottes-Basketball-World/main/charlotte.png"},{"path":"assets/rebound.png","contentType":"image/png","sourceUrl":"https://raw.githubusercontent.com/jaredlock1-ux/Charlottes-Basketball-World/main/rebound.png"},{"path":"assets/contest.png","contentType":"image/png","sourceUrl":"https://raw.githubusercontent.com/jaredlock1-ux/Charlottes-Basketball-World/main/contest.png"}]}
```

This conforms to the exposed schema: relative paths, one HTTPS sourceUrl per asset, optional contentType image/png. imageFiles is optional and unnecessary for sourceUrl imports. No expectedVersionNumber, team identifier, authentication header, or other invocation prerequisite is exposed for this tool. No dry-run/validate-only or ingestion-log tool is available.

Prior result: error_code INVALID_ARGUMENT; exact message: The operation was aborted. No request ID, upstream HTTP status, validator detail, failed asset name, or timeout duration was returned. No version/asset mutation resulted.

## Public source observations

All three exact raw URLs load as images in the available browser with unchanged final URL and successful natural image dimensions:
- charlotte.png: 1024 x 1536
- rebound.png: 1536 x 1024
- contest.png: 1536 x 1024

This establishes browser accessibility and decodability, not Carryo-server accessibility. No login page or HTML error response was shown. Intermediate redirects, exact HTTP status/content headers and remote file hashes were not exposed by the inspected browser interface. The independent web fetch tool returned Cache miss for all three URLs; that is not an upstream GitHub HTTP error and does not establish inaccessibility.

Approved local files have PNG signature 89-50-4E-47-0D-0A-1A-0A. Local sizes: Charlotte 1,873,359 bytes; rebound 2,174,243 bytes; contest 2,014,948 bytes. These are local reference sizes, not independently measured remote Content-Length values. The exposed Carryo interface documents no byte/dimension/PNG-subtype limit. Hidden validation cannot be ruled out.

## Attachment route is a separate interface mismatch

The host exposes imageFiles as local-path strings, while Carryo requires file_id/download_url attachment records and matching assets.fileId. Local-path attempts returned: asset assets/charlotte.png fileId must match a file_id in imageFiles; pass the attachment again if unavailable. No host-issued file ID was made available. A filesystem path cannot substitute for a verified host file ID. This does not explain the independent sourceUrl abort.

## Conclusion and escalation

No safe invocation/configuration correction was identified. Reported entitlement/capacity and schema compliance do not explain the failure. Public images decode in the browser. The remaining failure boundary is Carryo ingestion or connector execution, including server fetch access/timeout or undocumented validation; the exact cause cannot be determined from the generic abort response. It is not proven to be a Carryo backend bug.

Ask Carryo to trace the prior website_edit_images request for this linkId and the exact sources above, identifying which URL and processing stage aborted; upstream DNS/TLS/HTTP/redirect outcomes and content headers; timeout/cancellation origin (connector versus backend); byte/dimension/format validation; and storage/version transaction results. Request a correlation ID and specific error instead of the generic INVALID_ARGUMENT wrapper. For attachments, separately confirm this host's local-path adaptation into file_id/download_url records.

Do not retry or change the page until a specific diagnosis or supported correction is supplied.
