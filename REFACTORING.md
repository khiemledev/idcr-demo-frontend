# ID Card Reader - Refactored Structure

This document explains the refactored structure of the ID Card Reader application.

## Overview

The application has been refactored from a single large component into a modular, maintainable structure with:

- **Separated i18n (internationalization)** using React Context
- **Component-based architecture** with reusable components
- **Type-safe translations** with TypeScript
- **Organized file structure** for better maintainability

## File Structure

```
├── app/
│   └── page.tsx                    # Main page component (simplified)
├── components/
│   └── id-card-reader/
│       ├── index.ts                # Component exports
│       ├── IDCardReader.tsx        # Main orchestrator component
│       ├── Header.tsx              # Header with language selector
│       ├── Footer.tsx              # Footer component
│       ├── UploadSection.tsx       # File upload section
│       ├── DemoSection.tsx         # Demo images selection
│       ├── ImagePreview.tsx        # Image preview and processing
│       ├── ResultsCard.tsx         # Extracted results display
│       ├── StatusCard.tsx          # Status messages
│       └── HowToUseCard.tsx        # Usage instructions
├── lib/
│   ├── contexts/
│   │   └── I18nContext.tsx         # i18n context provider
│   ├── i18n/
│   │   ├── index.ts                # i18n exports and types
│   │   ├── en.ts                   # English translations
│   │   └── vi.ts                   # Vietnamese translations
│   ├── data/
│   │   └── demoImages.ts           # Demo images configuration
│   └── types.ts                    # Shared TypeScript interfaces
```

## Key Features

### 1. Internationalization (i18n)

- **Context-based**: Uses React Context for global language state
- **Type-safe**: All translation keys are typed with TypeScript
- **Modular**: Translations are separated into language-specific files
- **Easy to extend**: Adding new languages is straightforward

#### Usage:
```tsx
import { useI18n } from "@/lib/contexts/I18nContext"

function MyComponent() {
  const { t, language, setLanguage } = useI18n()
  
  return <div>{t("someKey")}</div>
}
```

### 2. Component Architecture

Each component is:
- **Focused**: Single responsibility principle
- **Reusable**: Can be used in different contexts
- **Type-safe**: Proper TypeScript interfaces
- **Self-contained**: Manages its own state when appropriate

### 3. Type Safety

- **TranslationKey**: Type-safe translation keys
- **ExtractedInfo**: Interface for extracted data
- **DemoImage**: Interface for demo images
- **DetectionBox**: Interface for detection boxes

## Benefits of Refactoring

1. **Maintainability**: Easier to find and modify specific functionality
2. **Reusability**: Components can be reused in other parts of the app
3. **Testability**: Smaller components are easier to test
4. **Scalability**: Easy to add new features or languages
5. **Type Safety**: Better TypeScript support with proper interfaces
6. **Separation of Concerns**: Clear separation between UI, logic, and data

## Adding New Languages

1. Create a new translation file in `lib/i18n/` (e.g., `fr.ts`)
2. Add the language to the `Language` type in `lib/i18n/index.ts`
3. Export the translations in `lib/i18n/index.ts`
4. Add the language option to the language selector in `Header.tsx`

## Adding New Components

1. Create the component in `components/id-card-reader/`
2. Export it in `components/id-card-reader/index.ts`
3. Import and use it in the main `IDCardReader.tsx` component

## State Management

The main state is managed in the `IDCardReader` component and passed down to child components as props. This keeps the state centralized and makes it easy to track data flow.

## API Integration

The API integration remains in the main component, making it easy to modify or replace the backend integration without affecting the UI components. 