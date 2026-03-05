---
title: Dependency Graph
description: Example showing ticket dependency relationships.
---

# Dependency Graph Example

This example shows how tickets can declare dependencies using the `{ dependsOnId, type }` structure:

```json
{
  "dependencies": [
    {
      "dependsOnId": "ticket-uuid-here",
      "type": "blocks"
    },
    {
      "dependsOnId": "another-ticket-uuid",
      "type": "requires"
    }
  ]
}
```

- **blocks** -- this ticket cannot start until the dependency is done
- **requires** -- this ticket needs the output from the dependency

See the full example in the [specforge-schema repository](https://github.com/solutionsforge/specforge-schema/tree/main/versions/v1.0/examples).
