# Hosting

This page documents where everything actually runs, since it's split across two
quite different setups. Compiled 2026-10-18 from this repo's own config plus
DNS/RDAP lookups from outside — if anything here is wrong or incomplete,
please fix it.

## The website (this repo)

This is an Astro static site, deployed to **Cloudflare Workers** (not a
traditional server) via `wrangler deploy` in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Cloudflare is
also the DNS host and CDN in front of it.

- Pushing to `main` deploys production: `www.ukgovcamp.com`, `ukgovcamp.com`,
  and `new.ukgovcamp.com`.
- Pushing to `test` deploys a separate Worker to the staging URL
  `test.ukgovcamp.com`. Keep `test` up to date with `main` (merge/fast-forward
  it) before using it to preview changes, otherwise it'll be showing stale
  content.
- Both environments are defined in [`wrangler.jsonc`](wrangler.jsonc).

## Self-hosted services

Separately from the website, UKGovCamp runs its own infrastructure on
**Hetzner Cloud**, in their Falkenstein, Germany datacenter (network block
`CLOUD-FSN1`). It's a 3-node **k3s** (lightweight Kubernetes) cluster. The
nodes are internally named after UK cities — `leeds`, `london`, `manchester` —
but that's just naming; all three are physically in Germany.

Provisioning and config for this cluster live in sibling repos:

- [`UKGovCamp/ansible`](https://github.com/UKGovCamp/ansible) (private) —
  base server + k3s + app installation playbooks
  (`k3s.yaml`, `mailcow.yaml`, `nextcloud.yaml`, `common.yaml`).
- [`UKGovCamp/k8s-config`](https://github.com/UKGovCamp/k8s-config) (public) —
  ongoing cluster manifests: Traefik (ingress), cert-manager (TLS),
  Longhorn (distributed storage, hence the 3 nodes), external-dns,
  external-secrets, and Authentik.
- [`UKGovCamp/authentik`](https://github.com/UKGovCamp/authentik) (private) —
  Terraform config for Authentik, the SSO provider gating access to the
  Nextcloud and Mailcow admin interfaces.
- [`UKGovCamp/mailcow`](https://github.com/UKGovCamp/mailcow) (private) —
  Terraform config for Mailcow mail aliases.

Services running there:

| Subdomain               | Service                        |
| ------------------------ | ------------------------------- |
| `cloud.ukgovcamp.com`     | Nextcloud                       |
| `mail.ukgovcamp.com`      | Mailcow (self-hosted mail)      |
| `sso.ukgovcamp.com`       | Authentik (SSO)                 |

## Email

This is split across two providers and the exact division of responsibility
wasn't obvious from the outside — if you know the full picture, please
expand this section.

- The domain's MX records point to **Google Workspace**
  (`aspmx.l.google.com` and friends), so that's handling primary inbound
  mail routing for `@ukgovcamp.com` addresses.
- The domain's SPF record also authorises the self-hosted Mailcow server
  (`ip4:142.132.239.44`, i.e. `mail.ukgovcamp.com`) and `engiqueer.net` as
  legitimate senders, alongside Google. So Mailcow is sending real mail for
  the domain too, not just sitting there unused — possibly for specific
  addresses, automated/bulk sending, or as a migration in progress.
