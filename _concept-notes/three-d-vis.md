---
layout:     concept-note
title:      3D Visualisation Concept Note
date:       2015-02-16
summary:    Technical notes for the 3D visulisation project
project:    threedvis

---

3D visualisation of NWP high-res and ensemble data

An Informatics Lab’s Project Concept Note
Feb 2015



Users of this project

1. General Public Deterministic. An easy-to-use and pretty-to-look-at browser application showing high-res data from UKV (Deterministic-Global is a plus).

2. Forecasters UKV. Built on (1). Added functionality (e.g. additional variables). Fast response needed.

3. General Public Non-deterministic: Built on (1). A browser application allowing public to see alternative forecasts if/when forecast uncertainty is high.

4. Risk-management / Decision-making. Built on (3) but incorporating non-Met Office data (e.g. location of infrastructure) and further data manipulation options (including data download)




Project skeleton and sketch

1. DATA pushed (datapoint, wholesale catalogue, beta-services) or pulled (moose@jasmin) from Met Office and other sources

2. INTERFACE_Data2DataBase: Data converted to relevant format/structure/etc using IRIS
[ NOTE: We will also ingest non-Met Office data. This interface needs to be able to cope with it ]

3. DATA ANALYSIS AND STORAGE: JASMIN/EC2/Other as cloud development platform. DataBase in platform likely based on THREDDS/OPeNDAP. Analysis in platform (if needed python most likely)

4. INTERFACE_ DataBase2Client: Relevant APIs to clients

5. CLIENT APPLICATION: Browser application fulfilling the user needs (see above)

6. INTERFACE_ Client2Human: storytelling, paper prototyping and sketching to design easy-to-use applications for relevant users



Project delivery approach
Three concurrent sub-projects. Top priority are user interface (6) and client functionality (4+5)

Sub-project 1 covers: 1+2+3
Sub-project 2 covers: 4+5
Sub-project 3 covers: 6
