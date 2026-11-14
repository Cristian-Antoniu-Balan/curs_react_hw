import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: {
          value:
            '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif',
        },
        body: {
          value:
            '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif',
        },
      },
      colors: {
        brand: {
          50: { value: '#eef9f8' },
          100: { value: '#d5f0ed' },
          200: { value: '#abe1db' },
          300: { value: '#78cbc4' },
          400: { value: '#45aea8' },
          500: { value: '#2b928d' },
          600: { value: '#217672' },
          700: { value: '#1e5e5c' },
          800: { value: '#1c4c4a' },
          900: { value: '#1a3f3e' },
          950: { value: '#0a2424' },
        },
      },
      shadows: {
        panel: {
          value:
            '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)',
        },
        overlay: {
          value:
            '0 12px 40px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(15, 23, 42, 0.08)',
        },
      },
      radii: {
        panel: { value: '14px' },
        control: { value: '10px' },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: {
            value: { _light: '{colors.brand.600}', _dark: '{colors.brand.400}' },
          },
          contrast: {
            value: { _light: 'white', _dark: '{colors.brand.950}' },
          },
          fg: {
            value: { _light: '{colors.brand.700}', _dark: '{colors.brand.300}' },
          },
          muted: {
            value: { _light: '{colors.brand.100}', _dark: '{colors.brand.900}' },
          },
          subtle: {
            value: { _light: '{colors.brand.50}', _dark: '{colors.brand.950}' },
          },
          emphasized: {
            value: { _light: '{colors.brand.200}', _dark: '{colors.brand.800}' },
          },
          focusRing: {
            value: { _light: '{colors.brand.500}', _dark: '{colors.brand.400}' },
          },
        },
        fg: {
          muted: {
            value: {
              _light: '{colors.gray.700}',
              _dark: '{colors.gray.300}',
            },
          },
          subtle: {
            value: {
              _light: '{colors.gray.600}',
              _dark: '{colors.gray.400}',
            },
          },
        },
        app: {
          canvas: {
            value: {
              _light: '{colors.gray.50}',
              _dark: '{colors.gray.950}',
            },
          },
          header: {
            value: {
              _light: 'rgba(255, 255, 255, 0.88)',
              _dark: 'rgba(17, 24, 39, 0.88)',
            },
          },
          panel: {
            value: {
              _light: 'white',
              _dark: '{colors.gray.900}',
            },
          },
          panelGlass: {
            value: {
              _light: 'rgba(255, 255, 255, 0.52)',
              _dark: 'rgba(17, 24, 39, 0.55)',
            },
          },
          panelBorder: {
            value: {
              _light: 'rgba(255, 255, 255, 0.55)',
              _dark: 'rgba(148, 163, 184, 0.25)',
            },
          },
          navActive: {
            value: {
              _light: '{colors.brand.50}',
              _dark: '{colors.brand.950}',
            },
          },
          overlay: {
            value: {
              _light: 'rgba(15, 23, 42, 0.45)',
              _dark: 'rgba(0, 0, 0, 0.6)',
            },
          },
          canvasWash: {
            value: {
              _light: 'rgba(248, 250, 252, 0.42)',
              _dark: 'rgba(3, 7, 18, 0.5)',
            },
          },
        },
      },
    },
  },
  globalCss: {
    '*::placeholder': {
      opacity: 1,
      color: 'fg.subtle',
    },
  },
})

export const system = createSystem(defaultConfig, config)
