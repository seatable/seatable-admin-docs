# Tutorial: Erste Schritte mit SeaTable

[TODO]
Was machen wir im Tutorial? Base zur Verwaltung von Ausgaben.

## Voraussetzungen

Folgende Voraussetzungen sind notwendig, damit Sie dieses Tutorial absolvieren können:

1. Account auf [cloud.seatable.io](https://cloud.seatable.io)

   Bitte erstellen Sie sich einen Account auf [cloud.seatable.io](https://seatable.io/registrierung/), falls Sie dies noch nicht getan haben.
   Ein kostenloser Account ist für dieses Tutorial vollkommen ausreichend.
2. Account in unserem [Community-Forum](https://forum.seatable.io)

   Das Community-Forum ist der Ort für Neuigkeiten rund um SeaTable und erlaubt es Ihnen, Beiträge zu erstellen, falls Sie Fragen oder Probleme mit SeaTable haben.

   Kleiner Bonus: Nach erfolgreichem Abschluss des Quiz am Ende des Tutorials wird Ihrem Foren-Account automatisch das entsprechende Badge zugewiesen.

## Wieviel Zeit muss ich einplanen?

[TODO]

## Ablauf

1. Folgen Sie dem Tutorial und lernen sie Schritt für Schritt die wichtigsten Features von SeaTable kennen.
2. Absolven Sie das Quiz, um ihr Wissen zu überprüfen. Das Quiz besteht aus einer Mischung aus Multiple Choice-Fragen und Fragen zur Base, welche Sie im Laufe des Tutorials aufbauen werden.

## Schritt 1: Anlegen einer neuen Base

1. Legen Sie eine neue Base in SeaTable mit dem Namen `Expense Tracking` an.
2. Öffnen Sie die Base. Jede Base beinhaltet standardmäßig eine Tabelle mit dem Namen `Table 1`, die eine Spalte mit drei Zeilen besitzt.
   Löschen Sie die drei Zeilen.
3. Ändern Sie den Namen der Tabelle von `Table 1` auf `Expenses`.
4. Ändern Sie den Namen der 1. Spalte von `Name` auf `Reason`.
5. Fügen Sie drei weitere Spalten hinzu:
   - `Date` (Typ: `Datum`, Format: `International`, Minutengenau: `Ja`)
   - `Amount` (Typ: `Zahl`, Format: `Euro`)
   - `Category` (Typ: `Einfachauswahl`)
6. Bearbeiten Sie die Optionen der Spalte `Category` und fügen Sie die folgenden vier Optionen hinzu:
   - `Clothing`
   - `Groceries`
   - `Leisure`
   - `Travel`

## Schritt 2: Erstellen eines Formulars

In diesem Schritt werden Sie ein Webformular anlegen, dass es Ihnen erlauben wird, Daten direkt in Ihre Base zu schreiben.
Zudem können Sie das Formular per Link an andere Personen freigeben, die dann ebenfalls Datensätze in Ihrer Base erzeugen können.

1. Erstellen Sie ein neues Webformular mit dem Namen `Expense Tracking`.
2. Ziehen Sie alle vier Tabellenfelder (`Reason`, `Date`, `Amount` und `Category`) per Drag-and-Drop in das Formular.
3. Öffnen Sie das Webformular in einem neuen Tab und fügen Sie eine beliebige Anzahl an Datensätzen hinzu.

## Schritt 3: Import von Daten

SeaTable erlaubt es, Daten in verschiedenen Dateiformaten in ihre Base zu importieren. In diesem Beispiel werden wir eine CSV-Datei importieren.

1. Löschen Sie alle Zeilen in der Tabelle `Expenses`.
2. Laden Sie folgende CSV-Datei herunter: [TODO]
3. Importieren Sie die CSV-Datei in die Tabelle `Expenses`. Die Tabelle sollte nun 50 Einträge haben.

## Schritt 4: Tabellen verknüpfen

Mehrere Tabellen können in SeaTable durch sogenannte Link- oder Link-Formel-Spalten verknüpft werden.
Im Folgenden werden wir eine zweite Tabelle hinzufügen und die beiden Tabellen miteinander verknüpfen, um dieses mächtige Feature zu demonstrieren.

1. Erstellen Sie eine zweite Tabelle mit dem Namen `Categories` in der gleichen Base.
2. Die Tabelle `Categories` benötigt nur eine Spalte: `Name`. Hier müssen Sie also nichts tun.
3. Fügen Sie manuell vier Einträge in die Tabelle `Categories` ein: `Clothing`, `Groceries`, `Leisure` und `Travel`.
4. Wechseln Sie zurück in die Tabelle `Expenses` und fügen Sie eine weitere Spalte mit dem Namen `Category-Link` und dem Typ `Verknüpfung zu anderen Einträgen` ein.
   Die Spalte sollte auf die Tabelle `Categories` verweisen.

Um die Datensätze in beiden Tabellen nun miteinander zu verknüpfen, haben Sie zwei Möglichkeiten:

1. Sie können einem Eintrag in der Tabelle `Expenses` manuell eine Zeile aus der Tabelle `Categories` zuweisen,
   in dem Sie innerhalb der Zelle auf das `+`-Symbol klicken und die passende Kategorie auswählen. Dies wird bei größeren Datenmengen schnell mühsam und fehleranfällig.
2. Verwenden Sie eine sogenannte Datenverarbeitung, um das Zuweisen zu automatisieren.
 
   Legen Sie dazu eine neue Datenverarbeitungsoperation mit dem Namen `Assign Category` an und wählen Sie als Operationstyp "Vergleichen und verknüpfen" aus.
   Zudem müssen Sie folgende Einstellungen setzen, damit SeaTable weiß, wie Sie Ihre Daten verknüpfen wollen:
   - Tabelle: `Expenses`
   - Andere Tabelle: `Categories`
   - Wenn Spalte: `Category`
   - Spalte: `Name`
   
   Klicken Sie auf `Ausführen`, um die Operation auszuführen.

   Anschließend können Sie die Spalte `Category` in der Tabelle `Expenses` löschen.

## Schritt 5: Formel-Spalten

Analog zu Excel erlaubt SeaTable es, Formeln zu verwenden. Für verknüpfte Tabellen gibt es zudem den Spaltentyp `Formel für Verknüpfungen`,
mit dem Sie Formeln auf Verknüpfungsspalten anwenden können.

Wir werden dieses Feature nutzen, um die Gesamtausgaben pro Kategorie zu berechnen.

1. Legen Sie dazu eine neue Spalte `Sum` des Typs `Formel für Verknüpfungen` in der Tabelle `Categories` an.
   Wählen Sie dabei die Formel `lookup`, die Verknüpfungsspalte `Expenses`, die zusammenzufassende Spalte `Amount` und die Auswertungsmethode `Summe` aus.
2. Ändern Sie nun das Format der Spalte `Sum` auf `Euro`, um die Summe ebenfalls in Euro zu formatieren.

## Schritt 6: Gruppieren

SeaTable bietet umfangreiche Möglichkeiten zum Filtern, Sortieren und Gruppieren Ihrer Daten.
In diesem Schritt werden Sie einen Einblick in die Gruppierfunktion bekommen.

1. Wechseln Sie zurück zur Tabelle `Expenses` und gruppieren Sie die Einträge nach Jahr und Kategorie.
2. Fügen Sie dazu zwei Gruppen hinzu:
   1. Gruppieren nach `Date`, `Nach Jahr` (aufsteigend)
   2. Gruppieren nach `Category-Link` (aufsteigend)

## Schritt 7: Ansichten

Um jederzeit schnell auf die tabellarische Ansicht aller Einträge zurückwechseln zu können, ermöglicht SeaTable es, mehrere Ansichten zu definieren, in denen festgelegt ist, wie Daten dargestellt werden sollen.

1. Heben Sie die Gruppierungen aus dem vorherigen Schritt wieder auf.
2. Erstellen Sie nun eine neue Ansicht mit dem Namen `Clothing Expenses`, die die Ausgaben für Kleidung pro Jahr darstellen soll.
3. Legen Sie einen neuen Filter an: `Category-Link` ist gleich `Clothing`, um nur die Einträge aus dieser Kategorie anzuzeigen.
4. Gruppieren Sie die gefilterten Datensätze nun noch nach Jahr (`Date` nach Jahr (aufsteigend)).
5. Über das Ansichts-Dropdown können Sie nun jederzeit zwischen den beiden Ansichten wechseln.

## Schritt 8: Quiz

Sie haben es fast geschafft! Wir sind am Ende des Tutorials angelangt.

Sie können nun mit dem Quiz starten, um ihr Wissen über SeaTable zu überprüfen.

Bei einigen Fragen werden Sie die im Laufe des Tutorials erstellte Base benötigen.

[TODO] Link einfügen

# Quiz

## Multiple-Choice-Fragen

- Welche Nutzungsmöglichkeiten erlaubt SeaTable?
  - Nutzung der Cloud-Plattform auf `cloud.seatable.io`
  - Nutzung einer eigenen Instanz für Ihr Unternehmen, welche von der SeaTable GmbH administriert wird
  - Nutzung einer eigenen Instanz (auf eigener Hardware oder in der Cloud)

- Wieviele verschiedene Spaltentypen erlaubt SeaTable in der Version 5.0?
  - weniger als 15
  - zwischen 20 und 30
  - mehr als 40

- Welche Formeltypen stehen beim Spaltentyp `Formel für Verknüpfungen` zur Verfügung?
  - `lookup`
  - `random_sample`
  - `countlinks`
  - `match`

- Welche Dateiformate können Sie in SeaTable importieren?
  - XLSX (Microsoft Excel)
  - CSV
  - TXT

## Fragen zum Use-Case

1) Wie hoch sind die Gesamtausgaben in der Kategorie `Travel`? Lösung: `2958,64`

2) Wie viele Posten gibt es in der Kategorie `Clothing` im Jahr 2021? Lösung: `7`

3) Wie hoch sind die Ausgaben in der Kategorie `Clothing` im Jahr 2022? Lösung: `1776,53`
