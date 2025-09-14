# OmniFocus Sort Subfolders Plugin

A plugin for OmniFocus that sorts folders and projects alphabetically.

## Features

- Sort subfolders alphabetically (case-insensitive)
- Works on both macOS and iPad
- Smart validation and error handling
- User-friendly feedback

## Installation

### macOS
1. Download `releases/v1.0/SortSubfolders.omnifocusjs`
2. Double-click the `.omnifocusjs` bundle to install

### iPad
1. Download the plugin bundle and save to Files app
2. Open with OmniFocus to install

## Usage

1. Select a folder containing subfolders in OmniFocus
2. Run "Sort Subfolders Alphabetically" from the Automation menu
3. Subfolders will be sorted alphabetically

## Repository Structure

```
Omnifocus Scripts/
├── README.md
├── CHANGELOG.md
├── LICENSE
├── releases/
│   └── v1.0/
│       └── SortSubfolders.omnifocusjs/    # Ready-to-install plugin
│           ├── manifest.json
│           └── Resources/
│               └── SortSubfolders.js
└── src/
    └── SortSubfolders.omnifocusjs/        # Development version
        ├── manifest.json
        └── Resources/
            └── SortSubfolders.js
```

## Development

- The `src/SortSubfolders.omnifocusjs/` contains the development version
- Stable releases are copied to `releases/` and tagged
- To test changes: modify files in `src/` then copy the bundle to OmniFocus
- Submit issues and pull requests via GitHub

## License

MIT License - see LICENSE file for details

## Author

Created by [bugdevil](https://github.com/bugdevil)
