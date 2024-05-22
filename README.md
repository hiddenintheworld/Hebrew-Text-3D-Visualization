## 3D Hebrew Text Visualization in React with THREE.js

<p align="center">
    <a href="https://twitter.com/hiddeninworld">
        <img src="https://raw.githubusercontent.com/hiddenintheworld/Hebrew-Text-3D-Visualization/main/public/assets/twitter.png" alt="Twitter Follow" width="100"/>
    </a>
    <a href="https://etherscan.io/address/0xbc7b2461bfaa2fb47bd8f632d0c797c3bfd93b93">
        <img src="https://raw.githubusercontent.com/hiddenintheworld/Hebrew-Text-3D-Visualization/main/public/assets/ethereum.png" alt="Etherscan" width="100"/>
    </a>
</p>

This React project uses THREE.js to create a visually engaging 3D visualization of Hebrew text from the book of Genesis, where each character is represented numerically and displayed in unique colors on a customizable 3D grid.

## Features

- **Dynamic Hebrew Text Mapping:** Converts Hebrew letters from Genesis into a numerical index (0 to 21), mapping each to a unique color on a 3D grid.
- **Interactive Camera Controls:** Allows for mouse-controlled rotation and zooming within the 3D scene.
- **Customizable Grid Dimensions:** Users can dynamically adjust grid dimensions (width, height, depth) and spacing via GUI controls.
- **Responsive Design:** Ensures effective visualization across different devices by adjusting to viewport sizes.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v12.0.0 or higher)
- npm (usually comes with Node.js)

## Installation

1. **Clone the Repository:**
   ```sh
   $ git clone https://github.com/your-username/your-project-name.git
   $ cd your-project-name


2. **Install Dependencies:**
   ```sh
   $ npm install
  
3. **Start the Application:**
   ```sh
   $ npm run dev
   
## Usage

Interact with the 3D scene through:

- **Rotation:** Click and drag with the mouse.
- **Zoom:** Scroll up or down.

Modify the grid dimensions and spacing using the GUI controls displayed on the screen. These changes update the visualization dynamically.

**Note:** High values for grid dimensions can lead to performance issues due to increased rendering loads. Modify these values cautiously.

## Data Processing

The Hebrew text from the book of Genesis has been preprocessed into a numerical index for each letter, ranging from 0 to 21. This indexing corresponds to the position of the letter in the Hebrew alphabet. The processed data is stored in the file `genesis_processed_data.txt`.

## Disclaimer

This project uses the 'Stam Ashkenaz CLM Medium' font created by Yoram Gnat, distributed under the GNU General Public License version 2. This font's use does not cause the resulting document to be covered by the GNU GPL unless other conditions are met. For further information, visit [GNU General Public License](http://www.gnu.org/licenses/gpl.html).

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with your enhancements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to Yoram Gnat and the FontForge team for the 'Stam Ashkenaz CLM' font.
- Thanks to facetype.js developed by gero3 which can be accessed on the web through http://gero3.github.io/facetype.js/ for conversion of .ttf to .typeface.json
- Appreciation to the THREE.js community for providing the tools necessary to create engaging 3D web visualizations.


You can test it out on [this live demo](https://hebrew-text-3d-visualization.onrender.com/).

