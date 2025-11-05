# AMRS HIE Registry Manager

The **AMRS HIE Registry Manager** is an OpenMRS 3.x microfrontend module for managing **Health Information Exchange (HIE)** registries — specifically, the **Facility Registry** and **Health Worker Registry**. It integrates seamlessly into the AMRS O3 environment, providing a unified interface for managing registry data within OpenMRS.

---

## 🚀 Running Locally

### Prerequisites

* Node.js ≥ 18
* Yarn ≥ 1.22
* OpenMRS 3.x or AMRS backend instance

### Setup

```bash
yarn install
yarn start
```

Once running, log in to OpenMRS and navigate to:

```
/openmrs/spa/hie/facilities
/openmrs/spa/hie/health-workers
```

---

## 🧩 Features

* Manage Facility and Health Worker registries
* Integrated OpenMRS navigation and breadcrumbs
* Uses OpenMRS 3.x extension slots (`hie-registry-dashboard-slot`)
* Built with React, TypeScript, and Carbon Design

---

## 📁 Structure

```
src/
 ├── hie/
 │    ├── facility-registry/
 │    ├── health-worker-registry/
 │    ├── hie-resource/
 │    └── nav-link-menu/
 ├── index.ts
 ├── routes.json
 └── translations/
```

---

## 🧱 Integration

Registers breadcrumbs, a navigation menu, and the main dashboard slot:

```ts
registerExtensionSlot('hie-registry-dashboard-slot', {
  displayName: 'HIE Registry Dashboard Slot',
  description: 'Main area for HIE registries',
});

attach('nav-app-menu-slot', 'hie-nav-menu');
```

---

## 🧪 Build & Deploy

```bash
yarn build
```

Include the built assets in your OpenMRS distribution configuration.

---

**Maintained by:** AMPATH / AMRS Kenya
**Based on:** OpenMRS 3.x Microfrontend Framework
