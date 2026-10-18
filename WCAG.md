# WCAG 2.2 compliance

Status of this site's accessibility, as of the audit below. Not a formal
conformance statement — this is a quick manual/code review, not a full audit
against every WCAG 2.2 success criterion, and nothing here has been verified
with real assistive technology or disabled users. Treat it as a starting point,
and please correct or extend it as issues are found or fixed.

## Last reviewed: 2026-10-18

Reviewed via source inspection, built HTML output, and before/after visual
comparison (not an automated scanner like axe or Lighthouse, and not tested with
a screen reader).

### Fixed

| Issue                                                                                                                                                                                    | Criterion           | Fix                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every content page had two `<h1>`s: the site logo in the header, and the page's own content heading                                                                                      | 1.3.1, 2.4.6        | Page content headings demoted to `<h2>` (visual size preserved); the logo is now the one `<h1>` per page, consistent with how the homepage and blog posts already worked                                                               |
| No way to skip the header navigation                                                                                                                                                     | 2.4.1 Bypass Blocks | Added a skip-to-main-content link, hidden until keyboard-focused                                                                                                                                                                       |
| Body/content links (in paragraphs, FAQ answers, etc.) had no defined colour — `--link-color` and related CSS variables were referenced but never set, so links only showed via underline | 1.4.1 Use of Color  | Defined the link colour variables using the site's existing accent blue, with overrides for sections that have their own coloured background (header accent banner, footer, "Trees for Life" section) so links stay readable there too |

See commit `76fa013` for the actual change.

### Open / not yet checked

- **Target size (2.5.8, new in WCAG 2.2)** — nav and footer links have no
  explicit padding, so their clickable area may be under the 24×24px minimum.
  Flagged but not measured in a real browser; worth checking with devtools.
- **No automated or assistive-technology testing has been done.** This review
  was manual code/visual inspection only. Running an automated scanner
  (axe-core, Lighthouse) and a real screen reader pass (VoiceOver/ NVDA) would
  likely surface more than what's listed here.
- **Anything added to the site since 2026-10-18** hasn't been reviewed.

### Already in good shape (as observed during this review)

- `lang="en"` set correctly.
- Content images have descriptive alt text.
- Viewport meta tag doesn't block pinch-zoom.
- Semantic landmarks (`header`/`nav`/`main`/`footer`) present.
- All colour pairs that are defined (body text, footer, accent banner, logo)
  comfortably pass contrast — 7.4:1 to 19.4:1, well above the 4.5:1 AA minimum.
- No forms or embedded audio/video to worry about captions/labels for.
