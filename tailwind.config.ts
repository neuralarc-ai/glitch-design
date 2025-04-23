
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
				mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				glitch: {
					'neon-pink': '#ff00ff',
					'electric-blue': '#00ffff',
					'acid-green': '#00ff7f',
					'dark': '#121212',
					'darker': '#0a0a0a',
					'outline': '#2a2a2a',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-5px, 5px)' },
					'40%': { transform: 'translate(-5px, -5px)' },
					'60%': { transform: 'translate(5px, 5px)' },
					'80%': { transform: 'translate(5px, -5px)' },
				},
				'scanline': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' },
				},
				'text-glitch': {
					'0%, 100%': { 
						clipPath: 'inset(0 0 0 0)',
						transform: 'translate(0)',
					},
					'10%': {
						clipPath: 'inset(15% 0 15% 0)', 
						transform: 'translateX(-2px)',
					},
					'20%': {
						clipPath: 'inset(45% 0 40% 0)',
						transform: 'translateX(2px)',
					},
					'30%': {
						clipPath: 'inset(62% 0 62% 0)',
						transform: 'translateX(-1px)',
					},
					'40%': {
						clipPath: 'inset(20% 0 32% 0)',
						transform: 'translateX(1px)',
					},
					'50%': {
						clipPath: 'inset(54% 0 76% 0)',
						transform: 'translateX(1px)',
					},
					'60%': {
						clipPath: 'inset(33% 0 33% 0)',
						transform: 'translate(-1px)',
					},
					'70%': {
						clipPath: 'inset(10% 0 90% 0)',
						transform: 'translateX(3px)',
					},
					'80%': {
						clipPath: 'inset(85% 0 15% 0)',
						transform: 'translateX(-3px)',
					},
					'90%': {
						clipPath: 'inset(70% 0 20% 0)',
						transform: 'translateX(2px)',
					}
				},
				'glitch-flash': {
					'0%, 100%': { opacity: '1' },
					'30%, 40%': { opacity: '0.3' },
					'42%, 44%': { opacity: '0.8' },
					'46%, 48%': { opacity: '0.2' },
					'50%, 52%': { opacity: '0.9' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch': 'glitch 1s ease-in-out infinite alternate',
				'scanline': 'scanline 3s linear infinite',
				'text-glitch': 'text-glitch 3.5s infinite linear alternate-reverse',
				'glitch-flash': 'glitch-flash 3s infinite',
				'float': 'float 6s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
