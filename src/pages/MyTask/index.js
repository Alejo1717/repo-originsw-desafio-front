import React from "react";
import Select from "react-select";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { autocompleteList } from "../../services/twelvedata.service";
import { createAction, deleteAction, updateAction } from "../../stores/modules/action.reducer";
import { logout } from "../../stores/modules/auth.reducer";
import { createUserAction, deleteUserAction, findUserAction } from "../../services/action.service";
import { deleteUser } from "../../stores/modules/user.reducer";

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: '1.6rem'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontSize: '1.6rem'
    }),
    input: (provided, state) => ({
        ...provided,
        fontSize: '1.6rem'
    }),
    placeholder: (provided, state) => ({
        ...provided,
        fontSize: '1.6rem'
    }),
}

const MisAcciones = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { action } = useSelector((state) => state.action)
    const [actions, setActions] = React.useState([]);
    const [selectedAction, setSelectedAction] = React.useState()


    React.useEffect(() => {
        const loadListAction = async () => {
            const res = await autocompleteList();
            const resUserActions = await findUserAction(user.id);
            if (resUserActions) {
                dispatch(createAction(resUserActions.actions))
            }
            setActions(res);
        }
        loadListAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAddAction = async () => {
        if (selectedAction !== undefined) {
            if (action.indexOf(selectedAction.value) !== -1) {
            } else {
                const params = {
                    symbol: selectedAction.value.symbol,
                    name: selectedAction.value.name,
                    currency: selectedAction.value.currency,
                    exchange: selectedAction.value.exchange,
                    mic_code: selectedAction.value.mic_code,
                    country: selectedAction.value.country,
                    type: selectedAction.value.type,
                    userId: user.id
                }
                console.log('params', params)
                const resUserActions = await createUserAction(params);
                var aux = [...action, resUserActions];
                dispatch(updateAction(aux))

            }

        }
    }
    const onDeleteAction = async (act) => {
        if (act !== undefined) {
            if (action.indexOf(act) !== -1) {
                const params = {
                    userId: user.id,
                    symbol: act.symbol,
                    name: act.name,
                    currency: act.currency,
                    exchange: act.exchange,
                    mic_code: act.mic_code,
                    country: act.country,
                    type: act.type,
                }
                await deleteUserAction(params);
                var aux = [...action.filter(item => item !== act)];
                dispatch(updateAction(aux));
            } else {
                console.log('Error: Esta acción No sé encuentra en tu lista')

            }

        }
        console.log('Press btn', selectedAction.value)
    }
    const onActionDetails = (act) => {
        console.log(act)
        navigate({
            pathname: `/my-actions/action-details`,
            search: `?${createSearchParams(act).toString()}`,
        })
    }

    const handleLogout = async () => {
        await localStorage.clear();
        dispatch(deleteUser());
        dispatch(deleteAction())
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
            <div style={{ display: "flex", alignItems: 'center', marginTop: '4.0rem' }}>
                <h5> Símbolo</h5>
                <div style={{ width: 15, height: 15, }}></div>
                <div className="select-container">
                    <Select
                        value={selectedAction}
                        options={actions.map((op) => ({ value: op, label: op.symbol }))}
                        onChange={(value) => setSelectedAction(value)}
                        styles={customStyles}
                    />
                </div>
                <div style={{ width: 15, height: 15 }}></div>
                <div>
                    <button
                        className="button"
                        onClick={() => onAddAction()}
                    >
                        Agregar Acción
                    </button>
                </div>
            </div>
            <div style={{ marginTop: '4.0rem' }}>
                <table >
                    <thead>
                        <tr>
                            <th>Símbolo</th>
                            <th>Nombre</th>
                            <th>Moneda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            action.length !== 0 ?
                                <>
                                    {
                                        action.map((act, index) =>
                                            <tr key={index}>
                                                <td>
                                                    <span
                                                        className="link"
                                                        onClick={() => onActionDetails(act)}
                                                    >
                                                        {act.symbol}
                                                    </span>
                                                </td>
                                                <td>{act.name}</td>
                                                <td>{act.currency}</td>
                                                <td>
                                                    <span
                                                        className="link"
                                                        onClick={() => onDeleteAction(act)}
                                                    >
                                                        Eliminar
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </> :
                                <>
                                    <tr>
                                        <td colSpan="3">
                                            No se agregaron acciones
                                        </td>

                                    </tr>
                                </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MisAcciones;