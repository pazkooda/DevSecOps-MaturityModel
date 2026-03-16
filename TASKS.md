# Multi-Domain Support — Task Tracker

## Tasks

- [x] **Task 1**: Create domain registry (`src/assets/YAML/domains.yaml`)
- [x] **Task 2**: Move Security YAML into `security/` subfolder, update refs
- [x] **Task 3**: Create Architecture sample data (`src/assets/YAML/architecture/`)
- [x] **Task 4**: Create `DomainService` (`src/app/service/domain.service.ts`)
- [x] **Task 5**: Modify `LoaderService` to accept dynamic meta file path
- [x] **Task 6**: Add domain tab selector to toolbar UI
- [x] **Task 7**: Verify — `npm run build` succeeds, app loads both domains

## Acceptance Criteria

1. ✅ App builds without errors (`ng build`)
2. ✅ Security domain loads by default — all existing functionality intact
3. ✅ Architecture domain loads when selected — shows Resilience > Availability activities
4. ✅ Domain selection persists in localStorage across page reloads
5. ✅ Switching domains clears and reloads the DataStore
6. ✅ No new npm packages added

## Test Results

- `ng build`: ✅ passes (pre-existing CSS budget warnings only)
- `ng test`: 55/55 SUCCESS (pre-existing Karma "full page reload" warning from circular-heatmap spec)

## Files Changed

### New files
- `src/assets/YAML/domains.yaml` — domain registry
- `src/app/service/domain.service.ts` — domain switching logic
- `src/assets/YAML/architecture/meta.yaml` — Architecture domain config
- `src/assets/YAML/architecture/model.yaml` — minimal Resilience model (2 activities)
- `src/assets/YAML/architecture/team-progress.yaml` — empty progress

### Moved files (Security subfolder)
- `src/assets/YAML/meta.yaml` → `src/assets/YAML/security/meta.yaml`
- `src/assets/YAML/team-progress.yaml` → `src/assets/YAML/security/team-progress.yaml`
- `src/assets/YAML/default/` → `src/assets/YAML/security/default/`
- `src/assets/YAML/custom/` → `src/assets/YAML/security/custom/`

### Modified files
- `src/app/service/loader/data-loader.service.ts` — dynamic `metaFile` path, `setMetaFile()`, `forceReload()` clears cache
- `src/app/app.component.ts` — injects DomainService, domain tab switching
- `src/app/app.component.html` — domain tab toggle buttons in toolbar
- `src/app/app.component.css` — domain-tabs styling
- `src/app/app.component.spec.ts` — mock providers for DomainService/LoaderService

## Progress Log

| Time | Task | Status | Notes |
|------|------|--------|-------|
| 11:40 | Task 1 | Done | domains.yaml with security + architecture |
| 11:40 | Task 2 | Done | git mv to security/ subfolder |
| 11:41 | Task 3 | Done | Minimal architecture model: Resilience > Availability, 2 activities |
| 11:42 | Task 4 | Done | DomainService with localStorage persistence |
| 11:43 | Task 5 | Done | LoaderService.setMetaFile() + forceReload() clears cache |
| 11:44 | Task 6 | Done | mat-button-toggle-group in toolbar, hidden when single domain |
| 11:46 | Task 7 | Done | Build ✅, Tests 55/55 ✅ |
