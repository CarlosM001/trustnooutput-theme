# 📋 Product Metafield Template – TRUST.NO.OUTPUT

Kopiere diese Werte für jedes Produkt in Shopify Admin → Products → [Produktname] → Metafields.

---

## 🎨 Standard T-Shirt / Hoodie Werte

### ✅ Produkt: **[PRODUKTNAME]**

#### **custom.subtitle** (Single line text)

```
PREMIUM GLITCH-READY STREETWEAR
```

Alternativen:

- `HEAVYWEIGHT ORGANIC COTTON`
- `280GSM PREMIUM QUALITY`
- `BRUTALIST FASHION STATEMENT`
- `CYBER-PHILOSOPHICAL DESIGN`
- `OVERSIZED UNISEX FIT`

---

#### **custom.material** (Single line text)

```
100% Bio-Baumwolle
```

Alternativen:

- `100% Organic Cotton • 280GSM`
- `Premium Bio-Baumwolle • GOTS-zertifiziert`
- `Heavyweight Cotton Blend`
- `50% Cotton / 50% Polyester`

---

#### **custom.fit** (Single line text)

```
Oversized brutalist cut
```

Alternativen:

- `Oversized / Unisex`
- `Regular fit • True to size`
- `Relaxed boxy silhouette`
- `Slim fit • Streetwear cut`
- `Oversized drop-shoulder design`

---

#### **custom.print** (Single line text)

```
Direct-to-Garment (DTG)
```

Alternativen:

- `Screen Print • Hand-finished`
- `DTG Print • High-resolution`
- `Embroidered • Premium finish`
- `Sublimation Print`

---

#### **custom.fulfillment_info** (Multi-line text)

```
Made-to-order • 7-14 Tage Lieferzeit
```

Alternativen:

```
Made-to-order via Printful
7-10 Werktage Produktion
3-5 Tage Versand innerhalb EU
```

Oder:

```
Print-on-Demand via Gelato
5-7 Tage Lieferzeit (DE/AT/CH)
CO₂-neutraler Versand
```

Oder kurz:

```
7-14 business days • Made to order
```

---

#### **custom.care_instructions** (Multi-line text)

```
Kaltwäsche • Niedriger Trockner • Nicht auf Print bügeln
```

Alternativen (ausführlich):

```
• Maschinenwäsche kalt (30°C)
• Niedriger Trockner oder Lufttrocknung
• Nicht direkt auf Print bügeln
• Auf links waschen empfohlen
```

Oder (Englisch):

```
Machine wash cold • Tumble dry low • Do not iron print
```

Oder (kurz):

```
30°C Maschinenwäsche • Lufttrocknen • Print schonen
```

---

#### **custom.three_d_model_url** (URL)

```
https://your-3d-viewer.com/model
```

**Hinweis:** Dieses Feld ist **optional**. Nur ausfüllen wenn:

- Du einen echten 3D-Viewer-Link hast (z.B. Sketchfab, Vectary)
- Oder leer lassen → Button erscheint nicht

Wenn leer: Viewer-Button wird automatisch ausgeblendet (graceful degradation).

---

## 🧥 Hoodie Variante

#### **custom.subtitle**

```
HEAVYWEIGHT HOODIE • 350GSM
```

#### **custom.material**

```
85% Bio-Baumwolle / 15% Polyester
```

#### **custom.fit**

```
Oversized Hoodie • Drop-shoulder cut
```

#### **custom.print**

```
Screen Print • Front & Back
```

#### **custom.fulfillment_info**

```
Made-to-order • 10-14 Tage Produktion + Versand
```

#### **custom.care_instructions**

```
• 30°C Maschinenwäsche
• Lufttrocknen empfohlen
• Nicht auf Print bügeln
```

---

## 🎨 Premium / Limited Edition Variante

#### **custom.subtitle**

```
LIMITED EDITION • HANDNUMBERED 1/100
```

#### **custom.material**

```
Premium Bio-Baumwolle • 320GSM • GOTS-zertifiziert
```

#### **custom.fit**

```
Boxy oversized fit • Brutalist cut
```

#### **custom.print**

```
High-resolution DTG • UV-beständig
```

#### **custom.fulfillment_info**

```
Made-to-order in Deutschland
12-16 Tage Produktion (handgefertigt)
Express-Versand verfügbar
```

#### **custom.care_instructions**

```
• Kaltwäsche (max. 30°C)
• Auf links waschen
• Lufttrocknen (nicht Trockner)
• Print nicht bügeln oder bleichen
```

---

## 📦 So füllst du die Metafields aus

### Methode 1: **Shopify Admin (empfohlen)**

1. Gehe zu **Products** → Wähle Produkt
2. Scrolle nach unten zu **Metafields**
3. Fülle die 7 Felder aus (copy-paste aus dieser Vorlage)
4. Klicke **Save**

### Methode 2: **Bulk Import (für viele Produkte)**

Erstelle eine CSV mit folgenden Spalten:

```csv
Handle,Metafield: subtitle,Metafield: material,Metafield: fit,Metafield: print,Metafield: fulfillment_info,Metafield: care_instructions,Metafield: three_d_model_url
magie,"PREMIUM GLITCH-READY STREETWEAR","100% Bio-Baumwolle","Oversized brutalist cut","Direct-to-Garment (DTG)","Made-to-order • 7-14 Tage Lieferzeit","Kaltwäsche • Niedriger Trockner • Nicht auf Print bügeln",""
```

Import via **Products** → **Import**.

---

## ✅ Checkliste pro Produkt

- [ ] `custom.subtitle` ausgefüllt (erscheint unter Produkttitel)
- [ ] `custom.material` ausgefüllt (Trust Cluster + Spec Sheet)
- [ ] `custom.fit` ausgefüllt (Trust Cluster + Spec Sheet)
- [ ] `custom.print` ausgefüllt (Trust Cluster + Spec Sheet)
- [ ] `custom.fulfillment_info` ausgefüllt (Trust Cluster – Delivery)
- [ ] `custom.care_instructions` ausgefüllt (Trust Cluster + Spec Sheet – Care)
- [ ] `custom.three_d_model_url` ausgefüllt (optional – wenn 3D-Modell vorhanden)
- [ ] Produkt gespeichert
- [ ] Im Theme Editor preview überprüft

---

## 🎯 Quick Copy-Paste Block

**Standard T-Shirt (Deutsch):**

```
Subtitle: PREMIUM GLITCH-READY STREETWEAR
Material: 100% Bio-Baumwolle
Fit: Oversized brutalist cut
Print: Direct-to-Garment (DTG)
Fulfillment: Made-to-order • 7-14 Tage Lieferzeit
Care: Kaltwäsche • Niedriger Trockner • Nicht auf Print bügeln
3D URL: (leer lassen)
```

**Standard T-Shirt (Englisch):**

```
Subtitle: PREMIUM GLITCH-READY TEE
Material: 100% Organic Cotton
Fit: Oversized / Unisex
Print: Direct-to-Garment (DTG)
Fulfillment: Made-to-order • 7-14 business days
Care: Machine wash cold • Tumble dry low • Do not iron print
3D URL: (leave blank)
```

---

## 💡 Tipps

1. **Konsistenz:** Verwende ähnliche Werte für gleiche Produkttypen
2. **Sprache:** Entscheide dich für DE oder EN (TNO nutzt oft DE/EN Mix)
3. **Länge:** Halte `subtitle` kurz (max. 50 Zeichen), `care_instructions` kann länger sein
4. **3D Model:** Nur ausfüllen wenn echte URL vorhanden, sonst leer lassen
5. **Preview:** Nach jedem Produkt im Theme Editor überprüfen

---

## 🚀 Nächste Schritte

1. ✅ Produkt "Magie" ist fertig (Referenz)
2. ⏳ Fülle restliche 4-5 Produkte aus (diese Vorlage nutzen)
3. ⏳ Überprüfe jedes Produkt im Theme Editor
4. ⏳ Optional: Legacy metafields aufräumen (global.subtitle, specs.fit löschen)

---

**Zeit pro Produkt:** ~5-10 Minuten
**Total für 5 Produkte:** ~30-45 Minuten

Viel Erfolg! 🎨
