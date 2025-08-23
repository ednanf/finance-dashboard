# Git Commit Instructions

1. **First line:** A concise, high-level summary of the change (max 50 characters, imperative mood, no period)
2. **Blank line**
3. **Bullet points:** List each topic, area, or file changed as a separate bullet point. Each bullet should be a single, clear sentence or phrase describing what was changed and why. This helps VS Code and reviewers quickly see the scope and intent of the commit.

**Format:**

```
<Short summary of the change>

- <Topic/area changed #1: what and why>
- <Topic/area changed #2: what and why>
- ...
```

**Example:**

```
Add user authentication middleware

- Add JWT-based middleware to backend for secure API access
- Update user model to support token storage and validation
- Add login and logout endpoints to authentication controller
- Update API documentation to reflect new auth requirements
```
