# RN Example App

A modern React Native application built with Expo, demonstrating best practices in state management, navigation, localization, and UI design.

## 🛠️ Tech Stack

- **Core**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Navigation**: [React Navigation 7](https://reactnavigation.org/)
- **API Client**: [Axios](https://axios-http.com/)
- **Localization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)

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



---