import React from "react";
import moment from "moment";
import Highcharts from "highcharts/highstock";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HighchartsReact from "highcharts-react-official";
import { logout } from "../../stores/modules/auth.reducer";
import { quotation } from "../../services/twelvedata.service";
import { deleteAction } from "../../stores/modules/action.reducer";
import { deleteUser } from "../../stores/modules/user.reducer";

const TaskDetails = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [searchParams] = useSearchParams();
    const [interval, setInterval] = React.useState('1min');
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [params, setParams] = React.useState();
    const [options, setOptions] = React.useState();
    const [radio, setRadio] = React.useState('realtime');

    React.useEffect(() => {
        const initData = async () => {
            const params = {};
            for (let [key, value] of searchParams.entries()) {
                params[key] = value;
            }
            setParams(params)
            if (radio === 'realtime') {
                setInterval(async () => {
                    await onRealTime(params)
                }, inter(interval))
            } else {
                await onHistory()
            }
        }
        initData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radio]);

    const onRealTime = async (params) => {
        const today = moment().format('YYYY-MM-DD HH:MM:ss');
        const quotationData = {
            symbol: params.symbol,
            interval: interval,
            start_date: today,
            end_date: today
        }
        console.log('params', quotationData)
        await loadQuotation(quotationData);
    }

    const onHistory = () => {
        if (interval !== undefined && startDate !== undefined && endDate !== undefined) {
            const qoutationData = {
                symbol: params.symbol,
                interval: interval,
                start_date: moment(startDate).format('YYYY-MM-DD HH:MM:ss'),
                end_date: moment(endDate).format('YYYY-MM-DD HH:MM:ss')
            }
            loadQuotation(qoutationData)
        } else {
            console.log('los datos de entrada no son correctos!')
        }

    }
    const inter = (interval) => {
        switch (interval) {
            case '1min':
                return 60000;
            case '5min':
                return 300000;
            case '15min':
                return 900000;
            default:
                return 300000
        }
       
    }
    const loadQuotation = async (quotationData) => {
        const res = await quotation(quotationData);
        let ejex = [];
        let ejey = [];
        if (res.length !== 0) {
            res.values.map((v) => {
                let d = new Date(v.datetime)
                ejex.push(d.getTime());
                ejey.push(Number(v.close))
                return '';
            })
        } else {
            ejex = [];
            ejey = [];
        };
        setOptions({
            title: {
                text: res.meta ? res.meta.symbol : 'No hay datos para mostrar',
            },
            xAxis: {
                categories: ejex,
                type: 'datetime',
                labels: {
                    enabled: true,
                    format: '{value:%H:%M}',
                },
                title: {
                    text: 'Intervalo',
                },

            },
            yAxis: {
                title: {
                    text: 'Cotización',
                },

            },
            tooltip: {
                dateTimeLabelFormats: {
                    format: 'valuer:%Y-%M-%D %H:%M'
                }
            },
            chart: {
                displayErrors: false
            },
            series: [
                {
                    data: ejey
                }
            ]
        });

    }

    const handleLogout = async() => {
        await localStorage.clear();
        dispatch(deleteUser());
        dispatch(deleteAction());
        dispatch(logout());
        
    }

    return (

        <div className="action-container">
            <div className="header-row">
                <h4>
                    Mis Acciones
                </h4>
                <div className="header-row-logout" >
                    <h4>Usuario: {user ? user.username : ''}</h4>
                    <div style={{ height: 15, width: 15 }}></div>
                    <button className="button" type="button" onClick={handleLogout}>
                        Salir
                    </button>
                </div>
            </div>
            <div className="header-line"> </div>
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <form name="myForm" className="form-date-container">
                    <div style={{ display: 'flex', alignItems: 'center', height: 50 }} >
                        <input
                            id='realtime'
                            type="radio"
                            name="eje"
                            value='realtime'
                            defaultChecked={radio}
                            onChangeCapture={(e) => setRadio(e.target.value)}
                            className="input-radio"
                        />
                        <label for='realtime' style={{ marginLeft: 10 }}>
                            Tiempo Real
                        </label>
                    </div>
                    <div style={{ display: 'block' }}>
                        <div style={{ display: 'flex', alignItems: 'center', height: 70 }}>
                            <input
                                type="radio"
                                name="eje"
                                id="history"
                                value="history"
                                onChangeCapture={(e) => setRadio(e.target.value)}
                                className="input-radio"
                            />
                            <label for='history' style={{ marginLeft: 10 }}>
                                Histórico
                            </label>
                            <input
                                className="input-date "
                                type="datetime-local"
                                placeholder={'Fecha hora desde'}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                defaultValue={interval}
                                disabled={radio === 'realtime'}
                            />
                            <div style={{ width: 20, height: 20 }}></div>
                            <input
                                className="input-date"
                                type="datetime-local"
                                placeholder={'Fecha hora hasta'}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                disabled={radio === 'realtime'}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', height: 70 }}>
                            <label for={"interval"} style={{ paddingLeft: 25 }}>
                                Intervalo
                            </label>
                            <div style={{ width: 22, height: 20 }}></div>
                            <select
                                name="intervalo"
                                id="intervalo"
                                value={interval}
                                onChange={(e) => setInterval(e.target.value)}
                            >
                                <option value="1min">1min</option>
                                <option value="5min">5min</option>
                                <option value="15min">15min</option>
                            </select>
                        </div>
                    </div>
                    <div className="btn-graph-container" >
                        <button className="btn-graph" type="button" onClick={onHistory} disabled={radio === 'realtime'} >Graficar</button>
                    </div>
                </form>

            </div>
            <div style={{ padding: '10%' }}>
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"chart"}
                    options={options}
                />
            </div>
        </div>
    );
}

export default TaskDetails;
