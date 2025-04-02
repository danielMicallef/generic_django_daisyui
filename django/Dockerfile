FROM python:3.13 AS base

# disable bytecode generation
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/usr/src/app/.venv/bin:$PATH"
ENV PYTHONPATH="/usr/src/app/src"
ENV DJANGO_SETTINGS_MODULE=config.settings
WORKDIR /usr/src/app

FROM base AS build
RUN pip install --upgrade pip && pip install uv
COPY .python-version pyproject.toml uv.lock ./
RUN uv sync --no-dev

FROM node:23 AS static_base
WORKDIR /usr/src/app
COPY package.json postcss.config.js tailwind.config.js vite.config.js ./
COPY src ./src
RUN npm install
RUN npm run build


FROM base as production
COPY --from=build /usr/src/app/.venv .venv
COPY --from=static_base /usr/src/app/src/static/dist ./src/staticfiles
COPY src ./src
COPY gunicorn-cfg.py .
RUN python src/manage.py collectstatic --noinput
CMD ["sh", "-c", "python src/manage.py migrate && gunicorn --config gunicorn-cfg.py src.config.wsgi"]
