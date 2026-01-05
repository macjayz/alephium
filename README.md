# Alephium DEX Analytics & Discovery Layer

## Demo
view demo screenshots here:
https://github.com/macjayz/alephium/tree/master/demo

## Overview
With Alephium entering Phase 2 and preparing for a native DEX launch, there is a clear need for foundational analytics and discovery infrastructure to support users, builders, and liquidity providers from day one.
This project proposes building a DEX-focused analytics and discovery layer for Alephium — providing transparency, discoverability, and actionable on-chain insights as the ecosystem scales.

Problem
	•	Alephium currently lacks a unified analytics layer for tokens, pools, and wallet activity.
	•	As DEX activity increases, users and developers will struggle with visibility, trust, and discovery without proper tooling.
	•	Early-stage ecosystems without analytics infrastructure face slower adoption and higher friction for new builders.

Proposed Solution
A lightweight, high-performance platform that indexes Alephium DEX data and surfaces key insights through a public dashboard and developer-friendly APIs.
	•	Token and pair discovery
	•	Liquidity and volume tracking
	•	Wallet behavior analysis (accumulation vs distribution)
	•	Pool-level analytics
MVP Scope (Phase 1 – 4 to 6 weeks)
	•	Real-time indexing of DEX pools and swap activity
	•	Token and trading pair discovery pages
	•	Liquidity, volume, and price charts
	•	Basic wallet activity insights
Phase 2 Expansion
	•	Alerts for new pairs, liquidity spikes, and abnormal activity
	•	Advanced wallet analytics and labeling
	•	Public APIs for developers and ecosystem projects
	•	Ecosystem-level dashboards and aggregate metrics
Technical Approach (High-Level)
	•	Custom on-chain indexer consuming Alephium node/RPC data and DEX events
	•	Structured data storage optimized for time-series and aggregation queries
	•	Backend API layer exposing analytics endpoints
	•	Lightweight frontend dashboard focused on clarity and performance
	•	Modular architecture extensible to staking, perpetuals, and future DeFi primitives
Why This Matters Now
	•	Directly aligned with Alephium’s Phase 2 and DEX launch
	•	Designed as a core ecosystem primitive rather than a standalone app
	•	Improves developer onboarding, user confidence, and ecosystem visibility
Long-Term Vision
The platform is designed to evolve into Alephium’s primary analytics, discovery, and monitoring layer, supporting future DeFi primitives such as staking and perpetuals. A public roadmap and iterative delivery model will ensure long-term alignment with Alephium’s ecosystem growth.

Request

	•	Introduction to the Alephium core team for technical alignment
	•	Feedback on ecosystem fit
	•	Discussion around grant support for MVP development


## Installation
Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

