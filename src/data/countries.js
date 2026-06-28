/**
 * countries.js — country facts for Elsewhere destination panels.
 *
 * ── Why not restcountries.com/v3.1? ──────────────────────────────────────────
 * The original REST Countries v3.1 REST endpoint was deprecated; its successor
 * (v5) now requires a paid account and an `Authorization: Bearer` API key. To
 * keep Elsewhere keyless and free, we read the SAME underlying REST Countries
 * dataset from its open-source GitHub mirror (all ~250 countries in one JSON),
 * and source flag artwork from the keyless flagcdn.com CDN by ISO country code.
 *
 * The public contract is unchanged: `fetchCountry(name)` resolves to
 *   { name, capital, population, languages, currencies, flags }  — or null.
 *
 * ── Caching strategy ─────────────────────────────────────────────────────────
 *   1. `datasetPromise` — the whole country list is fetched over the network at
 *      most ONCE. Every lookup awaits this single shared promise, so concurrent
 *      callers never trigger duplicate downloads (network-level de-duplication).
 *      If the fetch fails it is reset to null so a later call can retry.
 *   2. `resolved` — a Map of per-country normalized results keyed by lowercased
 *      name. Once a country is normalized it is served from memory, skipping the
 *      lookup/normalize work entirely.
 */

// Open-source REST Countries dataset (keyless). One file, all countries.
const DATASET_URL =
  'https://raw.githubusercontent.com/apilayer/restcountries/master/src/main/resources/countriesV2.json'

// Keyless flag CDN — flags are addressed by lowercased ISO 3166-1 alpha-2 code.
const flagPng = (code) => `https://flagcdn.com/w320/${code.toLowerCase()}.png`
const flagSvg = (code) => `https://flagcdn.com/${code.toLowerCase()}.svg`

// Permanent cache of successful, normalized lookups (key -> result object).
const resolved = new Map()

// Single shared promise for the full dataset (network-level de-duplication).
let datasetPromise = null

/**
 * Load the full country dataset exactly once. Concurrent callers share the same
 * in-flight promise; on failure the promise is cleared so the next call retries.
 * @returns {Promise<Array|null>}
 */
function loadDataset() {
  if (datasetPromise) return datasetPromise

  datasetPromise = (async () => {
    try {
      const res = await fetch(DATASET_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) throw new Error('empty dataset')
      return data
    } catch (err) {
      // Reset so a future call can retry instead of caching the failure.
      datasetPromise = null
      console.warn('[Elsewhere] country dataset load failed:', err?.message || err)
      return null
    }
  })()

  return datasetPromise
}

/**
 * Find a country record by name within the dataset. Matches the common name,
 * alternate spellings and native name, all case-insensitively.
 */
function findRecord(dataset, key) {
  return (
    dataset.find((c) => typeof c?.name === 'string' && c.name.toLowerCase() === key) ??
    dataset.find(
      (c) =>
        Array.isArray(c?.altSpellings) &&
        c.altSpellings.some((s) => typeof s === 'string' && s.toLowerCase() === key)
    ) ??
    dataset.find(
      (c) => typeof c?.nativeName === 'string' && c.nativeName.toLowerCase() === key
    ) ??
    // Last resort: partial match on the common name (e.g. "korea" -> first hit).
    dataset.find((c) => typeof c?.name === 'string' && c.name.toLowerCase().includes(key))
  )
}

/**
 * Reduce a raw dataset record to the fields Elsewhere needs. Defends against
 * missing/renamed fields so a partial record can never throw.
 */
function normalizeCountry(raw) {
  if (!raw || typeof raw !== 'object') return null

  const name = typeof raw.name === 'string' ? raw.name : raw.name?.common ?? null

  // V2 `capital` is a plain string; guard anyway.
  const capital = Array.isArray(raw.capital) ? raw.capital[0] ?? null : raw.capital ?? null

  const population = typeof raw.population === 'number' ? raw.population : null

  // V2 `languages` is an array of { name, nativeName, ... } — return names.
  const languages = Array.isArray(raw.languages)
    ? raw.languages.map((l) => l?.name ?? l?.nativeName).filter(Boolean)
    : []

  // V2 `currencies` is an array of { code, name, symbol }.
  const currencies = Array.isArray(raw.currencies)
    ? raw.currencies.map((c) => ({
        code: c?.code ?? '',
        name: c?.name ?? c?.code ?? '',
        symbol: c?.symbol ?? '',
      }))
    : []

  // Flags: the dataset's own flag URLs point at a defunct domain, so build them
  // from the keyless flagcdn CDN using the ISO alpha-2 code.
  const code = typeof raw.alpha2Code === 'string' ? raw.alpha2Code : null
  const flags = code
    ? { png: flagPng(code), svg: flagSvg(code), alt: `Flag of ${name ?? code}` }
    : { png: null, svg: null, alt: name ? `Flag of ${name}` : '' }

  return { name, capital, population, languages, currencies, flags }
}

/**
 * Fetch normalized facts for a country by name.
 *
 * @param {string} countryName - e.g. "Japan", "New Zealand".
 * @returns {Promise<{name, capital, population, languages, currencies, flags}|null>}
 *          Resolves to the normalized object, or null on any failure
 *          (bad input, network error, country not found, malformed data).
 */
export async function fetchCountry(countryName) {
  // Guard invalid input before touching the network.
  if (!countryName || typeof countryName !== 'string') return null
  const key = countryName.trim().toLowerCase()
  if (!key) return null

  // 1. Already normalized once — serve instantly from memory.
  if (resolved.has(key)) return resolved.get(key)

  // 2. Ensure the dataset is loaded (shared, de-duplicated network call).
  const dataset = await loadDataset()
  if (!dataset) return null // network/parse failure — not cached, so retryable.

  // 3. Locate and normalize the matching country.
  try {
    const record = findRecord(dataset, key)
    const normalized = normalizeCountry(record)
    // Cache ONLY successful results so a miss can be retried later.
    if (normalized) resolved.set(key, normalized)
    return normalized
  } catch (err) {
    console.warn(
      `[Elsewhere] fetchCountry("${countryName}") failed:`,
      err?.message || err
    )
    return null
  }
}

export default fetchCountry
