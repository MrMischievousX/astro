/**
 * Color constants used throughout the app.
 * All colors are centralized here for consistency and easy maintenance.
 */

// Brand Colors
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  // Primary Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // White variants
  whiteTransparent: '#FFFFFFD9', // 85% opacity
  
  // Background Colors
  primaryBackground: '#493653',
  overlayBackground: '#00000080', // rgba(0, 0, 0, 0.5)
  modalBackground: '#1A1A2E',
  inputBackground: '#05030D79',
  
  // Border Colors
  borderLight: '#FFFFFF1A', // rgba(255, 255, 255, 0.1)
  borderMedium: '#FFFFFF33', // rgba(255, 255, 255, 0.2)
  
  // Shadow Colors
  shadowPrimary: '#00002D17', // rgba(0, 0, 45, 0.09)
  
  // Gradient Colors
  gradientStart: '#AB5E9826', // rgba(171, 94, 152, 0.15)
  gradientEnd: '#45263D26', // rgba(69, 38, 61, 0.15)
  
  // Interactive Colors
  buttonBackground: '#FFFFFF0D', // rgba(255, 255, 255, 0.05)
  buttonBackgroundSelected: '#493653',
  buttonBackgroundCancel: '#FFFFFF1A', // rgba(255, 255, 255, 0.1)
  
  // Theme-based colors (existing)
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
