# Project Images

This directory contains project screenshots and placeholder images for the portfolio website.

## Current Images

### Placeholder Images (SVG)
- `ati-portal.svg` - ATI Government Portal placeholder
- `dashboard.svg` - Government Dashboard Analytics placeholder
- `citizen-services.svg` - Citizen Services Platform placeholder
- `management-system.svg` - Internal Management System placeholder
- `forms-builder.svg` - Digital Forms Builder placeholder
- `portfolio.svg` - Portfolio Website placeholder

### Actual Project Images
- `agrotins.png` - Agrotins project screenshot
- `docegabi.png` - Doce Gabi project screenshot
- `naissaecristovao.png` - Wedding website screenshot
- `quartzo-preview.png` - Quartzo project preview

## Image Guidelines

- **Size**: 800x500px (16:10 aspect ratio) recommended
- **Format**: SVG for placeholders, JPG/PNG/WebP for actual images
- **Quality**: High quality but optimized for web (< 500KB recommended)
- **Content**: Show the main interface/dashboard of each project
- **Alt Text**: Automatically generated from project title

## Optimization Features

- **Lazy Loading**: All images load only when needed
- **Error Handling**: Automatic fallback to placeholders on load failure
- **Responsive**: Images adapt to different screen sizes
- **Performance**: Optimized loading with fade-in effects

## Adding New Images

1. Add your image file to this directory
2. Update the project data in `src/utils/constants.js`
3. Use the same filename in the `image` property
4. The system will automatically handle optimization and loading

## Placeholder System

SVG placeholders are automatically generated and used when:
- Actual project images are not available
- Images fail to load
- During development phase

Replace placeholder SVG files with actual project screenshots when available.
