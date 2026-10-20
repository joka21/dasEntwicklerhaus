#!/bin/sh
# Startet die Website im Container. Vorher werden die Datenbank-Migrationen
# eingespielt (idempotent); abschalten mit DB_MIGRATIONEN_BEIM_START=0.
set -e
if [ "${DB_MIGRATIONEN_BEIM_START:-1}" != "0" ]; then
  node tools/migrieren.mjs
fi
exec node server.js
