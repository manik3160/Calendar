# Obsidian Wall Calendar - Interactive Edition

[![GitHub stars](https://img.shields.io/github/stars/manik3160/Calendar?style=social)](https://github.com/manik3160/Calendar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A high-fidelity, interactive React wall calendar component inspired by the **Obsidian Lens** design system. This project combines seasonal procedural art, persistent user notes, and Indian holiday data into a premium, responsive glassmorphic interface.

---

## 📽️ Video Demonstration

> [!IMPORTANT]
> **View the functional walkthrough here**: [INSERT_VIDEO_LINK_HERE (Loom/YouTube)]

---

## 🖼️ Preview

<img width="1293" height="800" alt="image" src="https://github.com/user-attachments/assets/f36f243c-fa2d-4fab-99cd-d98db576b47a" />


---

## ✨ Features

- **🌓 Dynamic Theming**: Toggle between "Ivory Light" and "Obsidian Dark" modes with a single tap.
- **🎨 Seasonal Art**: Procedural SVG backgrounds that adapt to each month's unique aesthetic (e.g., "The Frost Cycle" for Jan, "The Ruby Harvest" for Sept).
- **📅 Interactive Grid**: 
  - **Range Selection**: Seamlessly select date ranges with intelligent start/end logic.
  - **Today Quick-Jump**: Instantly return to the current date from anywhere in the calendar.
- **📝 Persistent Notes**: 
  - Date-specific and range-specific note-taking.
  - State persistent via `localStorage`.
  - Save via UI button or **Enter** key.
- **🇮🇳 Holiday Data**: Built-in support for Indian national holidays with interactive descriptive popovers.
- **📱 Responsive Layout**:
  - **Desktop**: Iconic side-by-side segmentation of art, notes, and grid.
  - **Mobile**: Gracefully stacked vertical layout with optimized touch targets.

---

## 🛠️ Technical Implementation

### **Design Philosophy**
The component was built to feel **premium and tactile**. We prioritized micro-animations, glassmorphism, and modern typography (Playfair Display & Crimson Pro) to evoke a "wall-mount" physical calendar feel.

### **Tech Stack**
- **Next.js 15 (App Router)**: Orchestrates the application structure and font optimization.
- **Framer Motion**: Handles the fluid "page-flip" month transitions and interactive scale effects.
- **Tailwind CSS**: A comprehensive utility-first design system using custom CSS variables for theme parity.
- **Lucide React**: Clean, consistent iconography for navigation and sharing.
- **Date-fns**: Robust date manipulation and formatting logic.

---

## 🚀 Getting Started

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manik3160/Calendar.git
   cd Calendar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **View in browser**:
   Open [http://localhost:3000](http://localhost:3000) to interact with the calendar.

---

## 📬 Contact & Repo

- **Repository**: [https://github.com/manik3160/Calendar.git](https://github.com/manik3160/Calendar.git)
- **Author**: Manik

---

> [!TIP]
> Use keyboard arrows (**Left/Right/Up/Down**) to navigate the calendar grid when focused! Press **'T'** to jump to today instantly.
