# Impact Checklist: managing access codes

Deep assessment and the team comparison view need an access code. Codes are checked only on the server (`netlify/functions/impact-access.js`) and never appear in the page source.

## Where codes live

One Netlify environment variable, `IMPACT_ACCESS_CODES`, holding a JSON list. One entry per client:

```json
[
  {"code": "KX7-2Q9", "client": "Muster AG", "expires": "2026-12-31"},
  {"code": "P4M-8WD", "client": "Beispiel GmbH", "expires": "2027-01-15"}
]
```

- `code`: what you give the client. Upper/lower case does not matter, and spaces around it are ignored. Use 6+ characters that are hard to guess, e.g. `KX7-2Q9`. Avoid 0/O and 1/I.
- `client`: for your own reference only. It is never shown to anyone.
- `expires`: `YYYY-MM-DD`. The code works **through the end of that day** (Swiss time). Set it to **90 days after you issue the code**.

## Add a code

1. Netlify → Site configuration → Environment variables → `IMPACT_ACCESS_CODES` → Edit.
2. Add a new entry to the list (mind the commas between entries).
3. Save, then **trigger a new deploy** (Deploys → Trigger deploy). Functions only pick up env var changes on the next deploy.
4. Test the code once on the live page (Checklist → Deep assessment → Unlock).

Tip: paste the JSON into any JSON validator before saving. If the value is not valid JSON, every code stops working and the page shows "The code could not be checked right now".

## Rotate a code

Replace the old `code` value in that client's entry with a new one, give it a new `expires` date, save and redeploy. The old code stops working after the deploy.

## Expire a code early

Either delete the entry, or set `expires` to yesterday's date. Save and redeploy.

Clients with an expired code see: "This access code has expired. Please contact facilit8 for a new one."

## Housekeeping

Once a quarter, remove entries whose `expires` date has passed, so the list stays short.

## Deploy previews

Deploy previews use the env var values for the "Deploy Previews" context. For testing, add one valid test code and one already-expired code there, e.g.:

```json
[
  {"code": "TEST-VALID", "client": "Preview test", "expires": "2099-12-31"},
  {"code": "TEST-EXPIRED", "client": "Preview test", "expires": "2020-01-01"}
]
```

Do not use these test codes in production.

## Rate limiting

After 10 wrong attempts in 15 minutes from the same connection, further attempts are refused for the rest of the window ("Too many attempts"). This needs the env var `RATE_LIMIT_SALT` (any long random string) to be set.

## Other env vars used by the Impact Checklist

| Variable | Purpose |
|---|---|
| `IMPACT_ACCESS_CODES` | Access codes (above) |
| `HUBSPOT_IMPACT_FORM_ID` | GUID of the HubSpot form "Impact Checklist result" |
| `IMPACT_STATS_PASSWORD` | Password for the counter view at `/api/impact/count` (open it in a browser; any username, this password) |
| `RATE_LIMIT_SALT` | Secret used to hash IP addresses for rate limiting. Required by all four Impact functions |

The HubSpot form must contain these fields, or HubSpot rejects the submission: `email`, `firstname`, `lastname`, `company`, `impact_checklist_summary` (multi-line text) and `impact_insights_opt_in` (single checkbox, yes/no).
