# Orange Money Analyzer

A fully client-side web tool for analyzing Orange Money PDF statements.
All processing happens locally in the browser. No data is ever uploaded to a server.

---

## Overview

Orange Money Analyzer converts a standard Orange Money PDF statement into an
interactive dashboard with key performance indicators, descriptive statistics,
twelve charts, five summary tables, and automatic insights.

The project is built with plain HTML, CSS, and JavaScript. It uses Chart.js for
visualization and PDF.js for in-browser PDF parsing. It requires no build step,
no backend, and no user account.

---

## Key Principles

- Privacy by design: no file, no record, and no result leaves the browser.
- Zero installation: open the HTML file and it works.
- Zero tracking: no analytics, no cookies, no telemetry.
- Offline capable: once loaded, it works without an internet connection.

---

## Features

### Input
- Drag-and-drop or file selector for PDF statements.
- Built-in demonstration dataset with fictional data for testing.
- Reset button to clear all loaded data.

### Parsing
- Regex-based extraction of date, time, sign, amount, and label from each
  transaction line.
- Automatic categorization into ten predefined categories.
- Automatic identification of counterparties (merchants, beneficiaries,
  utility providers).

### Key Performance Indicators
- Total income and total expenses.
- Net balance.
- Number of transactions.
- Average and maximum expense.

### Descriptive Statistics
- Median.
- First quartile (P25).
- Third quartile (P75).
- Interquartile range.
- 90th percentile.
- Standard deviation.
- Mode.
- Number of distinct merchants.
- Total number of expenses.

### Charts
1. Spending breakdown by category (doughnut).
2. Income versus expenses per month (bar).
3. Cumulative balance over time (line).
4. Cumulative spending versus cumulative income (line).
5. Category evolution per month, stacked (bar).
6. Daily spending (bar).
7. Spending by week of month (bar).
8. Transactions by hour of day (bar).
9. Amount distribution histogram (bar).
10. Top 8 recipients and merchants (horizontal bar).
11. Monthly savings rate (bar).
12. Average ticket by category (horizontal bar).

### Tables
- Top 5 highest-spending days.
- Monthly comparison (income, expenses, net, operations, average).
- Top 10 largest expenses.
- Detected recurring payments (three or more operations to the same recipient).
- Full transaction list with CSV export.

### Filters
- Free-text search.
- Category filter.
- Operation type filter (all, expenses only, income only).
- Month filter.

### Automatic Insights
Natural-language summaries covering top spending category, top spending month,
most frequent counterparty, largest expense, median, daily average, overall
savings rate, spending concentration, and busiest hour.

### Additional
- Bilingual interface (French and English).
- CSV export with UTF-8 BOM.
- Responsive layout for mobile, tablet, and desktop.

---

## Architecture

Files:

- index.html - Page structure, four navigable sections, footer.
- style.css - Theme, layout, responsive rules, components.
- script.js - PDF parsing, categorization, statistics, chart rendering.

Dependencies (loaded from CDN):

- Chart.js 4.4.1
- PDF.js 3.11.174

---

## Usage

1. Download the three files: index.html, style.css, script.js.
2. Place them in the same folder.
3. Open index.html in any modern browser.
4. Drag and drop an Orange Money PDF statement, or click the demonstration
   button to load fictional sample data.
5. Explore the dashboard, apply filters, and export results as CSV.

No server, no build step, no configuration required.

---

## Pages

- Home - Upload area and full analytical dashboard.
- About - Project overview and main features.
- Contact - Contact addresses and privacy note.
- Disclaimer - Legal notice covering independence, liability, privacy, and
  intellectual property.

---

## Countries Where Orange Money Is Available

Botswana, Burkina Faso, Cameroon, Central African Republic, Cote d'Ivoire,
Democratic Republic of the Congo, Egypt, Guinea, Guinea-Bissau, Liberia,
Madagascar, Mali, Mauritius, Niger, Senegal, Sierra Leone, Tunisia.

This list is provided for informational purposes and may change.

---

## Legal Notice

Orange Money Analyzer is an independent tool. It is not developed, published,
affiliated with, endorsed by, or sponsored by Orange, Orange Money, or any of
their subsidiaries or partners. All trademarks, logos, product names, service
names, and external links mentioned on this site belong to their respective
legitimate owners. Their mention is purely descriptive and does not imply any
affiliation, partnership, or endorsement.

The user is solely responsible for the data imported into this tool. The
publisher cannot be held liable for any error, omission, inaccuracy, data loss,
or direct or indirect consequence resulting from the use of this site. This
tool does not constitute financial, tax, or legal advice.

No file, no record, and no result is transmitted to any server. All processing
is performed locally in the browser.

---

## License

This project is distributed under a proprietary commercial license.
See the LICENSE file for the full terms.

Copyright (c) Orange Money Analyzer. All rights reserved.

---

## Contact

- General inquiries: contact@orange-money-analyzer.example
- Bug reports: bugs@orange-money-analyzer.example
- Feature suggestions: ideas@orange-money-analyzer.example

Do not send PDF statements by email. All analysis is performed locally in the
browser.

ORANGE MONEY ANALYZER - COMMERCIAL LICENSE
Version 1.0
Copyright (c) 2025 Orange Money Analyzer. All rights reserved.

================================================================================
PREAMBLE
================================================================================

This Commercial License ("License") governs the use of the software product
known as Orange Money Analyzer (the "Software"), including its source code,
documentation, design assets, and any related materials distributed with it.

By downloading, installing, copying, accessing, or using the Software, you
("Licensee") agree to be bound by the terms of this License. If you do not
agree to these terms, you must not use the Software.

================================================================================
1. DEFINITIONS
================================================================================

1.1 "Software" means the Orange Money Analyzer application, including all
    source files (index.html, style.css, script.js), documentation, and any
    accompanying assets.

1.2 "Licensor" means the copyright holder of the Software.

1.3 "Licensee" means any individual or legal entity exercising rights under
    this License.

1.4 "Commercial Use" means any use of the Software intended for or directed
    toward commercial advantage or monetary compensation, including but not
    limited to:
    (a) integration into a paid product or service;
    (b) deployment on a commercial website or application;
    (c) use in a business process to generate revenue;
    (d) offering the Software, or a derivative, as a paid or freemium service;
    (e) internal business use by a for-profit organization.

1.5 "Personal Use" means use of the Software by a natural person exclusively
    for private, non-commercial, non-revenue-generating purposes.

1.6 "Derivative Work" means any work based on or derived from the Software,
    including modifications, adaptations, translations, or integrations.

================================================================================
2. GRANT OF LICENSE
================================================================================

2.1 Personal Use License.
    Subject to the terms of this License, the Licensor grants the Licensee a
    worldwide, non-exclusive, non-transferable, royalty-free license to use,
    copy, and modify the Software for Personal Use only.

2.2 Commercial Use License.
    Commercial Use of the Software requires a separate, paid commercial
    license agreement with the Licensor. Commercial Use without such an
    agreement is strictly prohibited.

    To obtain a commercial license, contact:
    contact@orange-money-analyzer.example

2.3 Scope.
    This License does not grant any rights to use the Licensor's trademarks,
    trade names, service marks, or product names, except as required for
    reasonable and customary use in describing the origin of the Software.

================================================================================
3. RESTRICTIONS
================================================================================

The Licensee shall not, and shall not permit any third party to:

3.1 Use the Software for Commercial Use without obtaining a valid commercial
    license from the Licensor.

3.2 Sublicense, sell, rent, lease, distribute, or otherwise transfer the
    Software or any Derivative Work to any third party for commercial purposes.

3.3 Remove, obscure, or alter any copyright notice, trademark, or other
    proprietary rights notice contained in or on the Software.

3.4 Use the Software in any way that infringes the intellectual property
    rights of the Licensor or any third party.

3.5 Use the Software to develop a competing product or service without prior
    written consent from the Licensor.

3.6 Reverse engineer, decompile, or disassemble the Software, except to the
    extent expressly permitted by applicable law.

3.7 Use the Software in any manner that violates applicable laws or
    regulations.

================================================================================
4. OWNERSHIP
================================================================================

4.1 The Software is licensed, not sold. The Licensor retains all right, title,
    and interest in and to the Software, including all intellectual property
    rights.

4.2 All trademarks, logos, product names, and service names referenced within
    the Software belong to their respective legitimate owners. Their mention
    is purely descriptive and does not imply any affiliation, partnership, or
    endorsement.

4.3 Orange Money Analyzer is an independent tool. It is not developed,
    published, affiliated with, endorsed by, or sponsored by Orange, Orange
    Money, or any of their subsidiaries or partners.

================================================================================
5. CONTRIBUTIONS
================================================================================

5.1 Any contribution submitted by the Licensee to the Licensor for inclusion
    in the Software shall be subject to the terms of this License, unless a
    separate written agreement is executed.

5.2 By submitting a contribution, the Licensee grants the Licensor a
    perpetual, worldwide, non-exclusive, royalty-free, irrevocable license to
    use, reproduce, modify, distribute, and sublicense the contribution.

================================================================================
6. NO WARRANTY
================================================================================

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

THE LICENSOR DOES NOT WARRANT THAT THE SOFTWARE WILL BE ERROR-FREE,
UNINTERRUPTED, OR FREE OF HARMFUL COMPONENTS, OR THAT ANY DEFECTS WILL BE
CORRECTED.

================================================================================
7. LIMITATION OF LIABILITY
================================================================================

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE
LICENSOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
OR CONSEQUENTIAL DAMAGES (INCLUDING BUT NOT LIMITED TO PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR PROFITS, OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

THE LICENSOR ASSUMES NO RESPONSIBILITY FOR ANY FINANCIAL, TAX, OR LEGAL
DECISIONS MADE BY THE LICENSEE BASED ON THE OUTPUT OF THE SOFTWARE.

================================================================================
8. DATA AND PRIVACY
================================================================================

8.1 The Software processes all data locally in the user's browser. No file,
    record, or result is transmitted to any server operated by the Licensor
    or any third party.

8.2 The Licensee is solely responsible for the data imported into the
    Software and for compliance with any applicable data protection laws.

================================================================================
9. TERM AND TERMINATION
================================================================================

9.1 This License is effective from the moment the Licensee first uses the
    Software and remains in force until terminated.

9.2 The Licensor may terminate this License immediately upon any breach of
    its terms. Upon termination, the Licensee must cease all use of the
    Software and destroy all copies in their possession.

9.3 Sections 3, 4, 6, 7, 8, 10, 11, and 12 shall survive termination.

================================================================================
10. GOVERNING LAW
================================================================================

This License shall be governed by and construed in accordance with the laws
of the jurisdiction in which the Licensor is established, without regard to
its conflict of law provisions.

================================================================================
11. ENTIRE AGREEMENT
================================================================================

This License constitutes the entire agreement between the parties with
respect to the Software and supersedes all prior or contemporaneous
understandings and agreements, whether written or oral.

================================================================================
12. CONTACT
================================================================================

For commercial licensing inquiries:

    contact@orange-money-analyzer.example

For bug reports and general questions:

    bugs@orange-money-analyzer.example

================================================================================
END OF LICENSE
================================================================================
