# React Zoom Gallery

React Zoom Gallery is a React component for 3D environment simulation using images and animated transitions.

## Installation

Use npm to install the react zoom gallery component

```bash
npm install react-zoom-gallery --save
```

For full experience remember to add animate.css to the head of your html file

```html
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
</head>
```

## [Demo] (https://react-gallery-zoom.herokuapp.com/)

You can clone this demo from github

```bash
git clone https://github.com/joshbeme/react-zoom-gallery.git
```

## Usage

To use this component there are two important props one named "image" and a child prop that is an array of objects. The image prop takes an image source file (eg. png, jpg, svg, ...) The child prop takes an array of objects, the objects have to have three different methods. The first method being the "x" position, the second is the "y" position, and the third method "nest" which is the next image correlating to the x and y position. The "x" and "y" method should be a number between 0-100 positioned relative to the top left origin. Inside of the "nest" method insert the <Frame/> component to either give more environmental options or display final image. <Frame/> component needs to have a nested array, if final image place empty array.

```javascript
import Frame from 'react-zoom-gallery';

const Gallery =()=> {
    const Link = [
        {
            x: 0-100, 
            y:0-100, 
            nest: <Frame image={'./assets/anotherImage.jpg'}>{[/*Place Empty array for leaves of tree*/]}</Frame>  
        },
        {
            x: 0-100, 
            y:0-100, 
            nest: <Frame image={'./assets/anotherImage.jpg'}>{[/*Place Empty array for leaves of tree*/]}</Frame>  
        },
            {ect...}
        ]

    return(
        //Source file
        <Frame image={'./assets/initialImage.jpg'}>
            {/* Place anchor position and link to correlating image */}
            {Link}
        </Frame>
    )
}
export default Gallery
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)