// Nachgestellter Supabase-Storage für den Probelauf: liefert Dateien aus einem
// Ordner unter /storage/v1/object/authenticated/<bucket>/<pfad>. Erlaubt nur GET
// mit dem erwarteten Schlüssel und protokolliert jede Anfrage – so lässt sich
// prüfen, dass der Export nichts anderes als GET sendet.
//
//   node speicher-nachbau.mjs <ordner> <port> <schluessel>
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

const [ordner, port, schluessel] = process.argv.slice(2)
const PREFIX = '/storage/v1/object/authenticated/'

createServer(async (req, res) => {
  console.log(`${req.method} ${decodeURIComponent(req.url ?? '')}`)
  if (req.method !== 'GET') return res.writeHead(405).end('nur GET')
  if (req.headers.authorization !== `Bearer ${schluessel}`) return res.writeHead(401).end()
  if (!req.url?.startsWith(PREFIX)) return res.writeHead(404).end()
  const relativ = decodeURIComponent(req.url.slice(PREFIX.length))
  const datei = path.resolve(ordner, relativ)
  if (!datei.startsWith(path.resolve(ordner) + path.sep)) return res.writeHead(400).end()
  try {
    res.writeHead(200, { 'Content-Type': 'text/html' }).end(await readFile(datei))
  } catch {
    res.writeHead(404).end()
  }
}).listen(Number(port), '127.0.0.1')
