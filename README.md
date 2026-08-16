# Nursing Home Quality Lookup — CMS Star Ratings

Search U.S. nursing homes by name or state and get their official CMS
5-star ratings — overall, health inspection, staffing, and quality
measures — plus ownership type, staffing hours, and any fines or
penalties on record.

Built for families researching care for a loved one, elder law
attorneys, and anyone doing due diligence on a facility before move-in.

## Input

```json
{
  "name": "",
  "state": "CA",
  "minRating": 4,
  "maxResults": 25
}
```

| Field | Type | Description |
|---|---|---|
| `name` | string (optional) | Full or partial facility name to search for. |
| `state` | string (optional) | Two-letter US state code to limit to facilities located there. |
| `minRating` | number (optional) | Only return facilities with at least this CMS overall rating (1-5 stars). |
| `maxResults` | number | Max facilities to return. Default `25`, max `100`. |

## Output

One record per facility:

```json
{
  "facilityId": "015009",
  "name": "BURNS NURSING HOME, INC.",
  "address": "701 MONROE STREET NW",
  "city": "RUSSELLVILLE",
  "state": "AL",
  "zipCode": "35653",
  "county": "Franklin",
  "phone": "2563324110",
  "ownershipType": "For profit - Corporation",
  "numberOfCertifiedBeds": 57,
  "averageResidentsPerDay": 51.6,
  "overallRating": 2,
  "healthInspectionRating": 2,
  "staffingRating": 4,
  "qualityMeasureRating": 4,
  "abuseIcon": false,
  "totalNurseStaffingHoursPerResidentPerDay": 4.05544,
  "numberOfFines": 0,
  "totalFinesAmountUsd": 0,
  "numberOfPenalties": 0,
  "latitude": 34.5149,
  "longitude": -87.736
}
```

`abuseIcon: true` flags a facility CMS has cited for abuse, neglect, or
exploitation — check `overallRating` and `healthInspectionRating`
alongside it, not in isolation.

A search with no matches returns no items but is still billed once for
the search.

## How it works

Direct calls to the official [CMS Provider Data
API](https://data.cms.gov/provider-data/) (`data.cms.gov`), querying
the Nursing Home Provider Information dataset — no proxy, no key, no
scraping. Public U.S. government data, refreshed monthly by CMS.

## Pricing note

Billed per **search**, not per facility returned — one charge whether
the search returns 0 facilities or 100.

## Related products

- [Hospital Quality Lookup](https://github.com/timmKal01/hospital-quality-lookup) — the acute-care hospital equivalent, same CMS rating system
