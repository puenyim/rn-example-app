# RN Example App

A modern React Native application built with Expo, demonstrating best practices in state management, navigation, localization, and UI design.

## 🚀 Features

- **Customer Directory**: Browse a list of customers with infinite scrolling pagination.
- **Search & Filter**: Real-time search by name/email and filtering by gender using category chips.
- **Detailed Profiles**: Comprehensive customer details including contact info, address, and secure banking information.
- **Secure Data**: Toggle visibility for sensitive bank details (Credit Card, IBAN) with masking.
- **Multi-language Support**: Full support for English and Thai, with a seamless language toggle.
- **Custom Theme**: A beautiful Teal-based design system (`#09AEAE`) with support for varying opacities.
- **Modern Architecture**: Clean separation of concerns using custom hooks and Redux Toolkit.

## 🛠️ Tech Stack

- **Core**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Navigation**: [React Navigation 7](https://reactnavigation.org/)
- **API Client**: [Axios](https://axios-http.com/)
- **Localization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- **Styling**: Vanilla StyleSheet with a centralized design system.

## 📦 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo Go app on your mobile device (to test on physical hardware)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the Expo development server:

```bash
npm start
```

- Press **`a`** for Android emulator.
- Press **`i`** for iOS simulator.
- Scan the QR code with **Expo Go** to run on a physical device.

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components
├── config/         # Environment variables and app config
├── hooks/          # Custom React hooks (business logic extraction)
├── i18n/           # Translation files and i18next setup
├── navigation/     # Navigation configuration and types
├── screens/        # Screen components and their logic hooks
├── services/       # API services and data fetching
├── store/          # Redux store, slices, and thunks
├── theme/          # Design system tokens (colors, spacing, typography)
├── types/          # TypeScript definitions
└── utils/          # Helper functions and formatters
```

## 🌍 Localization

The app supports English (`en`) and Thai (`th`). Translations are managed in `src/i18n/locales/`. You can toggle the language directly from the header on the Home screen.

## 🎨 Theme

The application uses a centralized theme located in `src/theme/index.ts`.
- **Primary Color**: `#09AEAE` (Teal)
- **Primary 70%**: `rgba(9, 174, 174, 0.7)`

To use colors in your components:
```typescript
import { colors } from '@/theme';

// Example
const styles = StyleSheet.create({
  text: { color: colors.primary }
});
```

---
Built with ❤️ for a premium mobile experience.
