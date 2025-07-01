# Environment Setup

## Base Path Configuration

This project uses the `NEXT_PUBLIC_BASE_PATH` environment variable to configure the base path for the Next.js application.

### Setup

1. Create a `.env.local` file in the root directory
2. Add the following variable:

```bash
# Set your desired base path (e.g., "/my-app" for /my-app/* routes)
# Leave empty or unset for no base path (default behavior)
NEXT_PUBLIC_BASE_PATH=
```

### Examples

- **No base path (default)**: `NEXT_PUBLIC_BASE_PATH=` or don't set the variable
- **With base path**: `NEXT_PUBLIC_BASE_PATH=/my-app`

### Output Configuration

The project is configured with `output: "standalone"` for optimized production builds.

### Docker Deployment

When deploying with Docker, make sure to set the environment variable in your deployment configuration. 