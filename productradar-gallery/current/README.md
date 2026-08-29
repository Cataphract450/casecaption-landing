# Product Radar: актуальная галерея CaseCaption

Пять последовательных вертикальных слайдов `1080×1920`:

1. готовые договор, счёт, акт и ZIP;
2. готовый сценарий и три источника: письмо, DOCX и PDF;
3. проверка `24` значений (`23` вместе, НДС — отдельно);
4. подтверждение полного просмотра каждого из трёх документов и граница «не
   замена 1С, CRM или ЭДО»;
5. фиксированный платный пилот.

Кадры взяты из полного демо реального интерфейса на `2:11`:
`landing/assets/casecaption-demo-complete-flow-2026-08.mp4`. Визуальные экраны не
генерировались и не дорисовывались. Использованы кадры готового сценария, трёх
источников, проверки значений, выпущенного комплекта и нижней части акта. В самом
демо договор, счёт и акт открыты и прокручены полностью.

## Рендер и автоматическая проверка

Из корня проекта:

```powershell
node landing/productradar-gallery/current/render.mjs
```

Скрипт одновременно проверяет:

- ровно пять слайдов;
- размер каждого слайда `1080×1920`;
- отсутствие горизонтального и вертикального переполнения;
- загрузку всех изображений;
- отсутствие ошибок страницы и консоли.

Финальные PNG и готовый архив для загрузки находятся в
`landing/assets/productradar-current/`.

После успешного рендера архив собирается только из пяти финальных PNG:

```powershell
Compress-Archive -Force -LiteralPath `
  landing/assets/productradar-current/01-result.png, `
  landing/assets/productradar-current/02-sources.png, `
  landing/assets/productradar-current/03-review.png, `
  landing/assets/productradar-current/04-package.png, `
  landing/assets/productradar-current/05-pilot.png `
  -DestinationPath landing/assets/productradar-current/productradar-current-upload.zip
```
