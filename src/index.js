// Default create-react-app imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Import the react editor TinyMCE component.
import { Editor } from '@tinymce/tinymce-react';

// Load wiris formula render script.
const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
document.head.appendChild(jsDemoImagesTransform);

// This needs to be included before the '@wiris/mathtype-tinymce5' is loaded synchronously
window.tinymce = require('tinymce');  // Expose the TinyMCE to the window.

// Load wiris plugin synchronously.
require('@wiris/mathtype-tinymce5');

// Set the initial editor content
const content = '<p class="text"> Double click on the following formula to edit it.</p><p style="text-align:center;"><math><mi>z</mi><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>&PlusMinus;</mo><msqrt><msup><mi>b</mi><mn>3</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math></p>';

// Init the editor and define its options
const options = {
    height: 500,
    menubar: false,

    // Add wiris plugin
    external_plugins: {
        'tiny_mce_wiris' : `${window.location.href}/node_modules/@wiris/mathtype-tinymce5/plugin.min.js`
    },
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount '
    ],
    toolbar: [
        ' bold italic |' +
        'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry '
    ],
    htmlAllowedTags:  ['.*'],
    htmlAllowedAttrs: ['.*'],
};

/* Create a component to be rendered later.
This is important to remove complexity from the reactDom.render
and to be able to add other functionality. */
class EditorTiny extends React.Component {
    render() {
        return (
            <Editor init ={ options } initialValue = { content } />
        );
    }
}

ReactDOM.render(<EditorTiny />, document.getElementById('root'));
