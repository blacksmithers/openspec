---
title: Minimal Example
description: The smallest valid SpecForge spec file.
---

# Minimal Example

The smallest valid SpecForge spec contains only the required fields:

```json
{
  "specforgeVersion": "1.0",
  "project": {
    "id": "00000000-0000-0000-0000-000000000001",
    "name": "My Project"
  }
}
```

This validates against the schema and can be extended incrementally with specifications, epics, and tickets.
