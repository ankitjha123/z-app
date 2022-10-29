import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { GET_GRAPH_SAGA } from "../../store/graph-saga/graph-saga-types";
import { RootState } from "../../store/store";
import { Spin } from "antd";



export interface AppGraphProps {
    appDates: Record<"startDate" | "endDate", moment.Moment>
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: 'Chart.js Bar Chart',
        },
    },
};
  
export function AppGraph({ appDates } : AppGraphProps) {
    const dispatch = useDispatch();
    const graphdata = useSelector((state: RootState) => state.graphData)
    
    let xAxisLabels = (graphdata.data && Object.entries(graphdata.data?.dateCount).length > 0) ? Object.entries(graphdata.data.dateCount).map((elem) => elem[0]) : []
    let yAxisValues = (graphdata.data && Object.entries(graphdata.data?.dateCount).length > 0 )? Object.entries(graphdata.data.dateCount).map((elem) => elem[1]) : []
    
    const data = {
        labels: xAxisLabels,
        datasets: [
            {
                label: 'Interceptions',
                data: yAxisValues,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    React.useEffect(() => {
        dispatch({
            type: GET_GRAPH_SAGA,
            payload: {
                ...appDates
            }
        })
    }, [appDates])

    if(graphdata.graphError) return <div>Something went wrong</div>
    if(graphdata.loading) return <Spin/>
    return (
        <>
            {graphdata.data && Object.values(graphdata.data.dateCount).length > 0 && <Bar options={options} data={data} />}
        </>
    )
}