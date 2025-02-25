# REST API Aufgabenverwaltung

In Vorbereitung auf das Vorstellungsgespräch habe ich eine REST API für eine Aufgabenverwaltung erstellt.

## Beschreibung

Die REST API ermöglicht es, Aufgaben zu erstellen, zu bearbeiten und zu löschen.

Als Techstack habe ich mich für node.js entschieden. Ab der Version 22.5.0 enthält diese
eine native SQLite-Unterstützung, die ich für das Projekt verwendet habe. Die SQLite-Tabelle
wird als Memory-Tabelle erstellt.

## Installation

Für die Installation wird node.js mindestens in der Version 22.5.0 benötigt. Für die Entwicklung
wurde node.js in der Version 22.14.0 verwendet und getestet.

Als REST-Framework habe ich Express verwendet. Es steht als Abhängigkeit in der package.json. Diese können mit
dem Node Package Manager installiert werden:
```
npm install
```

## Starten

Nach der Installation kann der REST-Server mit folgendem Befehl gestartet werden:
```
npm start
```
Anschließend kann der Server über http://localhost:3000 erreicht werden.

## Verwendung

Die REST API kann über cURL oder einem REST-Client wie Postman verwendet werden.

### GET /state

Liefert, ob der Server läuft.

### GET /tasks

Liefert eine Liste aller Aufgaben.

### POST /tasks

Erstellt eine neue Aufgabe. Der Payload muss ein JSON-Objekt mit diesen Feldern enthalten:
```
{
    "title": "Titel der Aufgabe (verpflichtend)",
    "description": "Beschreibung der Aufgabe",
    "completed": true oder false
}
```

### GET /tasks/:id

Liefert die Aufgabe mit der ID :id.

### PUT /tasks/:id

Aktualisiert die Aufgabe mit der ID :id. Der Payload ist identisch zum POST-Request.

### DELETE /tasks/:id

Löscht die Aufgabe mit der ID :id.


## Beispiele

#### Erstellt eine neue Aufgabe
```
curl --location 'localhost:3000/tasks' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Tierarzt Besuch",
    "description": "Katze zur Impfung bringen - 12. Juni 2025 um 17 Uhr",
    "completed": false
}'
```

#### Liefert alle Aufgaben
```
curl --location 'localhost:3000/tasks'
```

#### Liefert die Aufgabe mit der ID 1
```
curl --location 'localhost:3000/tasks/1'
```

#### Aktualisiert die Aufgabe mit der ID 1
```
curl --location --request PUT 'localhost:3000/tasks/1' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Tierarzt Besuch",
    "description": "Katze zur Impfung bringen - 12. Juni 2025 um 13 Uhr",
    "completed": true
}'
```

#### Löscht die Aufgabe mit der ID 1
```
curl --location --request DELETE 'localhost:3000/tasks/1'
```

### Postman

Im Verzeichnis `postman` befindet sich eine Postman-Collection, die die obigen Beispiele enthält.