WebSockets sind eine Technologie, die es ermöglicht, eine bidirektionale, persistente Verbindung zwischen einem Client (z.B. einem Webbrowser) und einem Server aufzubauen. Im Gegensatz zu traditionellen HTTP-Anfragen, bei denen eine Verbindung nach jedem Request geschlossen wird, bleibt eine WebSocket-Verbindung während der gesamten Sitzung offen. Dies ermöglicht eine Echtzeit-Kommunikation, bei der Daten in beide Richtungen – vom Server zum Client und umgekehrt – ohne ständiges Öffnen und Schließen von Verbindungen gesendet werden können.

### Wesentliche Merkmale von WebSockets:
1. **Bidirektionale Kommunikation**: Sobald die Verbindung hergestellt ist, können sowohl der Client als auch der Server Nachrichten in beide Richtungen senden, ohne auf eine Anfrage vom jeweils anderen Teil zu warten.
  
2. **Persistent**: Die Verbindung bleibt bestehen, sodass Daten sofort übertragen werden können, ohne die Verbindung ständig neu aufbauen zu müssen.

3. **Geringe Latenz**: Durch den offenen Kanal zwischen Client und Server ist die Kommunikation schneller, da keine ständigen Verbindungsauf- und -abbauten erforderlich sind.

4. **Echtzeit**: WebSockets ermöglichen Echtzeit-Datenübertragung. Ein typisches Beispiel sind Chat-Anwendungen oder Online-Spiele, bei denen Informationen sofort zwischen den Nutzern ausgetauscht werden müssen.

### Wie funktioniert WebSocket?
1. **Verbindungsaufbau**: Der Client initiiert eine WebSocket-Verbindung, indem er eine spezielle HTTP-Anfrage mit dem Upgrade-Header an den Server sendet. Der Server antwortet mit einer Bestätigung, dass er die Verbindung auf WebSocket umschaltet.
   
2. **Datenübertragung**: Nach dem erfolgreichen Handshake (der sogenannten "Handshake"-Phase) wird die WebSocket-Verbindung zwischen Client und Server etabliert. Ab diesem Punkt können beide Seiten beliebige Nachrichten in Echtzeit austauschen.

3. **Verbindungsbeendigung**: Die Verbindung kann jederzeit von beiden Seiten durch einen speziellen "Close"-Frame geschlossen werden.

### Anwendungsbeispiele:
- **Echtzeit-Chats** (z.B. WhatsApp Web, Slack)
- **Live-Datenfeeds** (z.B. Börsenkurse, Sportergebnisse)
- **Online-Spiele** (z.B. Echtzeit-Multiplayer-Spiele)
- **Push-Nachrichten** (z.B. Benachrichtigungen auf Webseiten)

WebSockets sind besonders nützlich in Szenarien, in denen sofortige Kommunikation und geringe Latenz gefordert sind.