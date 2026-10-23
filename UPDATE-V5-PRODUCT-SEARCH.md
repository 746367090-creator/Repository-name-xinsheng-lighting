# XINSHERN V5 Product Search

## Added

- Public product finder at `/search`
- Search by product name, model, category, description, features, applications and specifications
- Product images and direct links to product detail pages
- Inquiry call-to-action when no exact product is found
- `Product Search` item in desktop and mobile navigation
- `/search` in the sitemap for search-engine discovery
- Search keyword analytics at `/admin/searches`

## Database update

Run `supabase/update-v5.sql` once in the Supabase SQL Editor. It creates the `search_queries` table and the required row-level security policies.

## Verification

1. Open `/search` and search for a published product or model.
2. Search for a phrase that has no result and check the inquiry button.
3. Open `/admin/searches` and confirm that the keyword and result count were recorded.
