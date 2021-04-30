import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
    const globalSagasForks = [
    ].map((saga) => fork(saga));

    yield all([...globalSagasForks]);
}
