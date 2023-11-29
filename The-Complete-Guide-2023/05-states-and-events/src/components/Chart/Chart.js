import './Chart.css'
import ChartBar from './ChartBar'

const Chart = (props) => {
    const dataPointValues = props.dataPoints.map(x => x.value);
    const totalMax = Math.max(...dataPointValues) // '...' is to pull all the values from the arr and make them standalone

    return (
        <div className='chart'>
            {
                props.dataPoints.map(dataPoint =>
                    <ChartBar
                        key={dataPoint.label} // each char has label so we can use it as a unique identifier here
                        value={dataPoint.value}
                        maxValue={totalMax}
                        label={dataPoint.label}
                    />
                )
            }
        </div>
    )
};

export default Chart;