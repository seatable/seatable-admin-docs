# Custom SSL Setup

Standardmäßig hat SeaTable einen öffentlichen Endpunkt in Form einer öffentlichen URL, die auf eine öffentliche IP verweist. In diesem Fall kümmert sich Caddy um die SSL-Terminierung und holt automatisch ein Let's Encrypt Zertifikat und bindet dieses ein. Nun gibt es zwei typische Abweichungen von diesem Vorgehen:

- eigene Zertifikate sollen verwendet werden (egal ob öffentlich erreichbar oder nicht)
- weder lets encrypt noch eigene Zertifikate sind möglich, z.B. weil das system nicht öffentlich erreichbar

Diese beiden Fälle müssen erklärt werden.

## nur als notiz für mich

Zentrales Ziel:

- eine URL verweist auf eine öffentlich erreichbare IP
- eingehender Traffic läuft immer über HTTPS
- die komponenten hinter caddy können untereinander ohne https kommunizieren
- die container brauchen keine ssl terminierung, darum kümmert sich zentral caddy.

We use caddy because SSL termination with caddy is easy. Our goal ist that the complete seatable server only requires one public url that points to caddy and caddy is responible for:

- SSL Termination
- Proxing all traffic to the right components.
