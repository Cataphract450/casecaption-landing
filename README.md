# CaseCaption Landing

Статический лендинг для Product Radar, холодных сообщений и первых пилотов.

## Готовность перед публикацией

1. CTA уже ведут в Telegram: `https://t.me/Igorigoryyy`.
2. Демо-видео уже встроено в блок `#demo`: `assets/casecaption-demo-workspace.mp4`.
3. Публичный URL: `http://casecaption.185.199.108.153.nip.io/`.
4. Если появятся более свежие скриншоты, заменить файлы в `landing/assets/`:
   - `casecaption-questionnaire-desktop.png`
   - `casecaption-document-detail-desktop.png`
   - `casecaption-workflow-desktop.png`

## Локальный просмотр

Из корня проекта:

```powershell
python -m http.server 4177 -d landing
```

Открыть:

```text
http://127.0.0.1:4177
```

## Быстрая публикация

Текущий публичный вариант опубликован отдельным репозиторием `Cataphract450/casecaption-landing`, чтобы не открывать основной private-репозиторий проекта.

### GitHub Pages

1. Закоммитить `landing/` и `.github/workflows/deploy-landing-pages.yml` в ветку `main`.
2. Запушить `main` в GitHub.
3. В GitHub открыть `Settings -> Pages`.
4. В поле `Source` выбрать `GitHub Actions`.
5. Открыть вкладку `Actions` и дождаться workflow `Deploy landing to GitHub Pages`.
6. После успешного деплоя GitHub покажет публичный URL вида `https://<account>.github.io/<repo>/`.

Если Pages уже включен через другой источник, переключить его на `GitHub Actions`, иначе новый workflow не станет источником публикации.

### Cloudflare Pages

1. Создать проект Pages из GitHub-репозитория.
2. Build command оставить пустым.
3. Output directory указать `landing`.
4. После деплоя заменить ссылку в Product Radar и outreach-сообщениях.

## Проверка перед Product Radar

- CTA ведет на реальный Telegram: `@Igorigoryyy`.
- Публичный URL: `http://casecaption.185.199.108.153.nip.io/`.
- Демо-видео открывается без авторизации в блоке `#demo`.
- На мобильном первый экран читается без горизонтального скролла.
- Скриншоты показывают реальный продукт, а не устаревший прототип.
- В тексте нет обещаний "заменяем 1С", "любой формат", "полный документооборот".
