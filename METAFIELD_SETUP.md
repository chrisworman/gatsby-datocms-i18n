## Shopify Storefront API Metafield Setup

By default, shopify entity `metafields` are not exposed to the storefront API.  Since we use `metafields` to express product variant information,
we need the `metafields` exposed in the shopify storefront API.  Here are the steps used to exposes the product metafields to the shopify storefront api.

Step 1
* Enable _"Read and write access"_ for _"Products, variants and collections"_ for the private shopify app used for the pelacase.com website.

Step 2 
* Run the following `curl` commands substituting the `apiKey` and `password` parameters with those for your app:

```
curl 'https://{apiKey}:{password}@pelacase.myshopify.com/admin/api/2020-01/graphql.json' \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "mutation($input: MetafieldStorefrontVisibilityInput!) { metafieldStorefrontVisibilityCreate(input: $input) { metafieldStorefrontVisibility { id } userErrors { field message } } }",
    "variables": {
        "input": {
        "namespace": "demac",
        "key": "handles",
        "ownerType": "PRODUCT"
      }
    }
  }'
  ```

  ```
curl 'https://{apiKey}:{password}@pelacase.myshopify.com/admin/api/2020-01/graphql.json' \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "mutation($input: MetafieldStorefrontVisibilityInput!) { metafieldStorefrontVisibilityCreate(input: $input) { metafieldStorefrontVisibility { id } userErrors { field message } } }",
    "variables": {
        "input": {
        "namespace": "demac",
        "key": "colour",
        "ownerType": "PRODUCT"
      }
    }
  ```

## References
* https://shopify.dev/tutorials/retrieve-metafields-with-storefront-api

