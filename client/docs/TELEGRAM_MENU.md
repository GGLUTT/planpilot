# Telegram Mini App Menu Implementation

This document explains how the Telegram Mini App menu is implemented in PlanPilot and how to use it.

## Overview

PlanPilot uses Telegram's native `MainButton` as the entry point to the menu system. When clicked, a custom menu dialog appears with navigation options. This follows Telegram's Mini App UX guidelines and provides a consistent experience.

## Components

### 1. TelegramContext

The `TelegramContext` provides access to Telegram WebApp functionalities including:

- `showMainButton` - Shows the main button with specified text and callback
- `hideMainButton` - Hides the main button
- `setMainButtonParams` - Updates main button parameters (text, color, etc.)

### 2. TelegramMenu

The `TelegramMenu` component:
- Shows the main button that displays the current page name
- Opens a bottom sheet menu when clicked
- Provides navigation to different app sections
- Automatically updates main button text based on current route

### 3. useTelegramBackButton Hook

This hook handles the Telegram Back Button functionality:
- Shows back button on subpages and hides it on the homepage
- Navigates to previous page when the back button is clicked

## Usage

### Adding Menu to a Page

All navigation is now centralized through the `TelegramMenu` component which is rendered in the `App` component. You don't need to add any navigation code to individual pages.

### Custom Actions

If you need the main button to perform a custom action on a specific page:

```tsx
import { useTelegram } from '../context/TelegramContext';
import { useEffect } from 'react';

const MyCustomPage = () => {
  const { setMainButtonParams } = useTelegram();
  
  useEffect(() => {
    // Change main button text and action
    setMainButtonParams({
      text: 'Save Changes',
      isVisible: true,
      isActive: true
    });
    
    // Add your custom click handler
    if (webApp && webApp.MainButton) {
      webApp.MainButton.onClick(handleSave);
    }
    
    return () => {
      // Clean up when component unmounts
      if (webApp && webApp.MainButton) {
        webApp.MainButton.offClick(handleSave);
      }
    };
  }, []);
  
  const handleSave = () => {
    // Your custom save logic
    console.log('Saving changes...');
  };
  
  return (
    <div>
      {/* Page content */}
    </div>
  );
};
```

### Using Back Button

To use the back button in your component:

```tsx
import { useTelegramBackButton } from '../hooks/useTelegramBackButton';

const DetailPage = () => {
  // Show back button on this page
  useTelegramBackButton();
  
  return (
    <div>
      {/* Page content */}
    </div>
  );
};
```

## Styling

The menu follows Telegram's design language:
- The main button uses Telegram's theme colors
- The menu appears as a bottom sheet with smooth animation
- Selected items are highlighted

## Testing

When testing locally, the menu will still function, but you'll see console logs instead of actual Telegram API calls.

## Troubleshooting

If the menu doesn't appear:
1. Make sure the Telegram WebApp is properly initialized
2. Check that the main button is visible in the UI
3. Verify that click handlers are properly attached

For more details on Telegram Mini App development, refer to the [official Telegram documentation](https://core.telegram.org/bots/webapps). 