const BASE_URL = 'https://data.cms.gov/provider-data/api/1/datastore/query/4pq5-n9py/0';

function toNumber(value) {
    return value !== '' && value != null ? Number(value) : null;
}

export async function fetchFacilities({ name, state, minRating, maxResults }) {
    const conditions = [];
    if (name) conditions.push({ property: 'provider_name', value: `%${name}%`, operator: 'like' });
    if (state) conditions.push({ property: 'state', value: state.toUpperCase(), operator: '=' });
    if (minRating) conditions.push({ property: 'overall_rating', value: String(minRating), operator: '>=' });

    const url = new URL(BASE_URL);
    conditions.forEach((c, idx) => {
        url.searchParams.set(`conditions[${idx}][property]`, c.property);
        url.searchParams.set(`conditions[${idx}][value]`, c.value);
        url.searchParams.set(`conditions[${idx}][operator]`, c.operator);
    });
    url.searchParams.set('limit', String(maxResults));

    const res = await fetch(url, { headers: { Connection: 'close' } });
    if (!res.ok) {
        throw new Error(`CMS API request failed: ${res.status} ${res.statusText}`);
    }
    const body = await res.json();

    return (body.results ?? []).map((f) => ({
        facilityId: f.cms_certification_number_ccn,
        name: f.provider_name,
        address: f.provider_address,
        city: f.citytown,
        state: f.state,
        zipCode: f.zip_code,
        county: f.countyparish,
        phone: f.telephone_number,
        ownershipType: f.ownership_type,
        numberOfCertifiedBeds: toNumber(f.number_of_certified_beds),
        averageResidentsPerDay: toNumber(f.average_number_of_residents_per_day),
        overallRating: toNumber(f.overall_rating),
        healthInspectionRating: toNumber(f.health_inspection_rating),
        staffingRating: toNumber(f.staffing_rating),
        qualityMeasureRating: toNumber(f.qm_rating),
        abuseIcon: f.abuse_icon === 'Y',
        totalNurseStaffingHoursPerResidentPerDay: toNumber(f.reported_total_nurse_staffing_hours_per_resident_per_day),
        numberOfFines: toNumber(f.number_of_fines),
        totalFinesAmountUsd: toNumber(f.total_amount_of_fines_in_dollars),
        numberOfPenalties: toNumber(f.total_number_of_penalties),
        latitude: toNumber(f.latitude),
        longitude: toNumber(f.longitude),
    }));
}
