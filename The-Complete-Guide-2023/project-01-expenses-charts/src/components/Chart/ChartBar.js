import './ChartBar.css'

{/* chart-bar__fill - to remember by how much this chart will be flled;
for style in chart-bar__fill div double brackets are used because style is
expecting a js object
*/ }
const ChartBar = props => {
    let barFillHeight = '0%';

    if (props.maxValue > 0) {
        barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
    }

    return (
        <div className='chart-bar'>
            <div className='chart-bar__inner'>
                <div className='chart-bar__fill' style={{height: barFillHeight}}></div>
            </div>
            <div className='chart-bar__label'>{props.label}</div>
        </div>
    );
};

export default ChartBar;