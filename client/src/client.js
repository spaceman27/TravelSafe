import React from 'react'
import ReactDOM from 'react-dom'

import styles from './global.styles.css';
import router from './router.js'


const mountNode = document.querySelector('#app')
if (mountNode) {
  ReactDOM.render(router, mountNode);
} else {
  const hljs = require('highlight.js');

  const codes = document.querySelectorAll('pre code');
  for (var i = 0; i < codes.length; i++) {
    const block = codes[i]
    hljs.highlightBlock(block);
  }
}
