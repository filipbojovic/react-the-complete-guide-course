import React from 'react';
import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
    console.log('DemoOutput RUNNING!');
    return (
        <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>
    )
};

export default React.memo(DemoOutput); // tells React to look at the props the components gets and only if the props changed compared to the previous state, then the component should be re-evaluated.
// This optimization has some trade ofs:
// React has to save the old state
// Always has to do calculations such as comparing states
// It is good to use it when the component tree is huge, so we avoid re-evaluation of a lot of nested components.
