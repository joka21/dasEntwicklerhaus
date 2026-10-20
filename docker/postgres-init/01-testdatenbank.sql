-- Läuft nur beim ersten Start des Containers (leeres Volume).
-- Eigene Datenbank für die Tests, damit sie die Entwicklungsdaten nicht berühren.
create database entwicklerhaus_test owner entwicklerhaus;
