import CharBar from './ChartBar'
import './Chart.css'

const Chart = props => {
    return <div className='chart'>
        {props.dataPoints.map(dataPoint =>
            <ChartBar
                key={dataPoint.label} // each char has label so we can use it as a unique identifier here
                value={dataPoint.value}
                maxValue={null}
                label={dataPoint.label}
            />)}
    </div>
};

export default Chart;