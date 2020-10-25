import { Excel } from 'components/excel/Excel';
import { Header } from 'components/header/Header';
import { Toolbar } from 'components/toolbar/Toolbar';
import { Formula } from 'components/formula/Formula';
import { Table } from 'components/table/Table';
import { Store } from 'core/store/createStore';
import { rootReducer } from 'store/rootReducer';

import './scss/index.scss';
import { Emitter } from 'core/Emitter';
import { RootState } from './core/store';
import { Storage } from './core/utils';

export type ComponentType = any; // typeof ExcelComponent & { className: string };

export type ExcelOptions = {
  components: Array<ComponentType>;
  store: Store;
  name?: string;
  listeners?: Array<string>;
  emitter?: Emitter;
};

const storage = new Storage();

const savedData = storage.getData('excel-state');

const store = new Store(rootReducer, savedData);

store.subscribe((state: RootState) => {
  console.log('App State: ', state);
  storage.setData('excel-state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
