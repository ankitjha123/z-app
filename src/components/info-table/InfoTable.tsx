import React from 'react';
import { Radio, Spin, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GET_INFO_SAGA } from '../../store/info-saga/info-types';
import { DataType, SeverityType } from '../common-types/common-types';
import { RootState } from '../../store/store';
import { TableIState } from '../../store/info-saga/info-reducer';

export interface InfoTableProps {
    appDates: Record<"startDate" | "endDate", moment.Moment>
}

export function InfoTable({appDates} : InfoTableProps) {
    const dispatch = useDispatch()
    const data = useSelector((data: RootState) => data.info);
    const [severity, setSeverity] = React.useState<SeverityType>('')
    const [pagination, setPagination] = React.useState({
        page: 1,
        pageSize: 5
    })
    

    React.useEffect(() => {
        dispatch({
            type: GET_INFO_SAGA,
            payload: {
                page: pagination.page,
                count: pagination.pageSize,
                startDate: appDates.startDate.format('YYYY-MM-D'),
                endDate: appDates.endDate.format('YYYY-MM-D'),
                filterBySeverity: severity
            }
        })
    },[pagination, appDates, severity])

    const columns = React.useMemo(() => [
        {
            key: 'id',
            title: "Type",
            dataIndex: 'type'
        },
        {
            title: "Date",
            dataIndex: 'timestamp'
        },
        {
            key: 'id',
            title: "Severity",
            dataIndex: 'severity',
        },{
            key: 'id',
            title: "Attacker Id",
            dataIndex: "attacker.id"
        },{
            key: 'id',
            title: "Attacker Ip",
            dataIndex: "attacker.ip"
        },{
            key: 'id',
            title: "Attacker Name",
            dataIndex: "attacker.name"
        },{
            key: 'id',
            title: "Attacker Port",
            dataIndex: "attacker.port"
        },{
            key: 'id',
            title: "Decoy Id",
            dataIndex: "decoy.id",
            sorter: (a: DataType, b: DataType) => { 
                return a["decoy.id"]-b["decoy.id"]
            },
        },{
            key: 'id',
            title: "Decoy Name",
            dataIndex: "decoy.name"
        },{
            key: 'id',
            title: "Decoy Group",
            dataIndex: "decoy.group"
        },{
            key: 'id',
            title: "Decoy Ip",
            dataIndex: "decoy.ip"
        },{
            key: 'id',
            title: "Decoy Port",
            dataIndex: "decoy.port"
        },{
            key: 'id',
            title: "Decoy Type",
            dataIndex: "decoy.type"
        }
    ], [])
    

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPagination({
          page: page,
          pageSize: pageSize
        })
    };


    const filterBySeverityComponent = <Radio.Group onChange={(e) => setSeverity(e.target.value)} value={severity}>
        <Radio.Button value={'low'}>LOW</Radio.Button>
        <Radio.Button value={'medium'}>MEDIUM</Radio.Button>
        <Radio.Button value={'high'}>HIGH</Radio.Button>
    </Radio.Group>
    

    if(data.infoError)  return <div>Something went wrong</div>;
    return (
        <>
            <div>Filter By Severity<br/> {filterBySeverityComponent}</div>
            <Table
                showHeader={true}
                bordered={false}
                columns={columns}
                loading={data.loading}
                dataSource={data ? data?.data?.data as DataType[] : []}
                tableLayout='fixed'
                className={'info-table'}
                pagination={{ onChange: handlePaginationChange, position: ['bottomCenter'], size: 'small', pageSize: pagination.pageSize, defaultCurrent: 1, total: data && data?.data?.total }}
                > 
            </Table>
        </>
    )
}